const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const Anthropic = require("@anthropic-ai/sdk");

initializeApp();
setGlobalOptions({ maxInstances: 10, region: "us-central1" });

const ANTHROPIC_API_KEY = defineSecret("ANTHROPIC_API_KEY");

exports.generateSkinRoutine = onCall(
  {
    secrets: [ANTHROPIC_API_KEY],
    invoker: "public",
  },
  async (request) => {
    const db = getFirestore();

    // Use uid if authenticated, otherwise use deviceId
    const uid = request.auth?.uid || null;
    const deviceId = request.data?.deviceId || null;
    const forceRefresh = request.data?.forceRefresh || false;

    // Must have either uid or deviceId
    if (!uid && !deviceId) {
      throw new HttpsError(
        "invalid-argument",
        "Must provide either authentication or deviceId."
      );
    }

    // Determine storage key
    const storageKey = uid
      ? `users/${uid}`
      : `devices/${deviceId}`;

    // Check if routine already exists
    const docRef = db.doc(storageKey);
    const docSnap = await docRef.get();
    const existingData = docSnap.data();

    if (existingData?.aiRoutine && !forceRefresh) {
      return {
        success: true,
        cached: true,
        routine: existingData.aiRoutine
      };
    }

    // Build skin profile
    const profile = request.data?.skinProfile || {};
    const {
      acneHistory = "none",
      skinType = "normal",
      skinConcerns = [],
      sensitivities = [],
      allergies = [],
      products = [],
      routineLevel = "moderate",
    } = profile;

    // Build Claude prompt
    const prompt = `You are an expert dermatologist and cosmetic chemist specializing in evidence-based skincare routines.

PATIENT SKIN PROFILE:
- Skin history: ${acneHistory}
- Skin type: ${skinType}
- Main concerns: ${skinConcerns.join(', ') || 'general maintenance'}
- Sensitivities: ${sensitivities.join(', ') || 'none known'}
- Allergies: ${allergies.join(', ') || 'none known'}
- Product categories owned: ${products.join(', ') || 'starting fresh'}
- Specific brands mentioned: ${profile.brandNotes || 'none specified'}
- Experience level: ${routineLevel}

SCIENCE-BASED ORDERING RULES (apply strictly):
1. Cleanse first, always. Oil cleanser before water cleanser if PM.
2. Thinnest to thickest texture always.
3. Vitamin C (L-ascorbic acid): apply on damp skin, wait 60 seconds before next step. Never layer directly with niacinamide in same step.
4. BHA (salicylic acid): wait 15 minutes after application before continuing.
5. Niacinamide: apply after toner, before heavier serums.
6. Hyaluronic acid: always apply on damp skin for best absorption.
7. Retinoids: always last active before moisturizer. Sandwich with moisturizer if skin is sensitive (moisturizer, then retinoid, then moisturizer).
8. SPF: always the absolute last step in AM. Never skip.
9. Actives go BEFORE moisturizer, not after.
10. Eye cream: thinner formulas before actives, richer formulas after.
11. Never combine: BHA + retinoids same night. Vitamin C + retinoids same session. Strong AHA + BHA same session.
12. If user has sensitivities listed, avoid those ingredient families entirely.
13. If user has allergies listed, flag and exclude those ingredients.

PERSONALIZATION RULES:
- If brand notes are provided, incorporate those specific brands into the product names.
- If product categories are listed, prioritize those in the routine.
- If starting fresh, recommend specific product types that match their skin profile.
- Tailor every benefit description to THIS patient's specific concerns.
- Never use generic benefits. Always reference their actual skin issues.

WAIT TIME RULES (waitSeconds):
- Vitamin C standalone: 60 seconds
- BHA/AHA exfoliants: 900 seconds (15 minutes)
- Retinoids: 300 seconds (5 minutes)
- All other steps: 0 seconds
- Moisturizer after retinoid in sandwich: 0 seconds

Respond ONLY with a JSON object. No markdown, no explanation.
Exact structure required:
{
  "am": [
    {
      "step": 1,
      "product": "Specific product name using their brands if provided",
      "benefit": "Personalized benefit referencing their specific skin concern",
      "waitSeconds": 0,
      "scienceNote": "Optional: one sentence science tip for this step"
    }
  ],
  "pm": [
    {
      "step": 1,
      "product": "Specific product name",
      "benefit": "Personalized benefit",
      "waitSeconds": 0,
      "scienceNote": "Optional science tip"
    }
  ],
  "weeklyNotes": "2-3 sentences of weekly advice specific to their profile",
  "keyIngredients": ["ingredient1", "ingredient2", "ingredient3"],
  "conflictWarnings": ["Warning about any ingredient conflicts for their profile"]
}

Rules:
- Maximum 7 steps AM, 9 steps PM
- AM must end with SPF
- PM must address their top concern directly
- No em dashes in any text
- Every benefit must mention something specific to their skin history or concerns
- conflictWarnings array can be empty [] if no conflicts`;

    // Call Claude API
    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY.value() });
    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    // Parse response
    const responseText = message.content[0].text;
    const cleanJson = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const routine = JSON.parse(cleanJson);

    // Save to Firestore
    const aiRoutine = {
      ...routine,
      generatedAt: new Date().toISOString(),
      skinProfile: profile,
      version: 1,
    };

    await docRef.set(
      { aiRoutine },
      { merge: true }
    );

    return { success: true, cached: false, routine: aiRoutine };
  }
);
