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
    const prompt = `You are an expert dermatologist and cosmetic chemist.
Create a personalized skincare routine based on this patient profile:

SKIN HISTORY: ${acneHistory}
SKIN TYPE: ${skinType}
MAIN CONCERNS: ${skinConcerns.join(", ") || "general maintenance"}
SENSITIVITIES: ${sensitivities.join(", ") || "none known"}
ALLERGIES: ${allergies.join(", ") || "none known"}
PRODUCTS OWNED: ${products.join(", ") || "starting fresh"}
EXPERIENCE LEVEL: ${routineLevel}

Create a complete AM and PM skincare routine.
Respond ONLY with a JSON object, no markdown, no explanation, exactly this structure:
{
  "am": [
    {
      "step": 1,
      "product": "Product name",
      "benefit": "One sentence benefit for this skin profile",
      "waitSeconds": 0
    }
  ],
  "pm": [
    {
      "step": 1,
      "product": "Product name",
      "benefit": "One sentence benefit for this skin profile",
      "waitSeconds": 0
    }
  ],
  "weeklyNotes": "2-3 sentences of weekly routine advice for this specific profile",
  "keyIngredients": ["ingredient1", "ingredient2", "ingredient3"]
}

Rules:
- waitSeconds is 0 for most steps, 60 for vitamin C, 900 for BHA, 300 for retinoids
- AM routine must always end with SPF
- PM routine should address their top concern directly
- If they have products listed, incorporate them by category
- Maximum 8 steps for AM, 10 steps for PM
- Keep benefits specific to THEIR concerns, not generic
- No em dashes in any text`;

    // Call Claude API
    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY.value() });
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
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
