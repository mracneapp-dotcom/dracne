// constants/routinesData.js

export const SKIN_TYPES = {
    oily: 'oily',
    dry: 'dry',
    combination: 'combination',
    normal: 'normal',
    sensitive: 'sensitive',
  };
  
  export const ROUTINE_LEVELS = {
    basic: 'basic',
    moderate: 'moderate',
    comprehensive: 'comprehensive',
  };
  
  export const ROUTINES_DATA = {
    oily: {
      name: 'Oily Skin',
      description: 'Oil control + lightweight hydration',
      emoji: '💧',
      basic: {
        title: 'Basic Foundation',
        description: 'Essential oil control & protection',
        steps: {
          am: [
            'Gentle Low-pH Cleanser',
            'Lightweight Gel-Cream',
            'Stand-alone Sunscreen'
          ],
          pm: [
            'Gentle Cleanser',
            'Lightweight Gel-Cream'
          ]
        },
        keyBenefits: ['Controls excess oil', 'Maintains hydration', 'Daily sun protection']
      },
      moderate: {
        title: 'Moderate Care',
        description: 'Builds on basic + pore refinement',
        steps: {
          am: [
            'Gentle Cleanser',
            'Lightweight Gel-Cream',
            'Sunscreen'
          ],
          pm: [
            'Gentle Cleanser',
            'Pore Care 2-4×/week (BHA/Mandelic)',
            'Lightweight Gel-Cream'
          ]
        },
        keyBenefits: ['Refines pores', 'Prevents congestion', 'Balanced complexion']
      },
      comprehensive: {
        title: 'Comprehensive',
        description: 'Complete anti-aging + treatment',
        steps: {
          am: [
            'Gentle Cleanser',
            'Antioxidant Serum (Vit C)',
            'Lightweight Gel-Cream',
            'Sunscreen'
          ],
          pm: [
            'Gentle Cleanser',
            'Pore Care (BHA/Mandelic)',
            'Retinoid 2-3×/week',
            'Lightweight Gel-Cream'
          ]
        },
        keyBenefits: ['Maximum results', 'Anti-aging actives', 'Professional-grade care']
      }
    },
    
    dry: {
      name: 'Dry Skin',
      description: 'Intense hydration + barrier repair',
      emoji: '🌵',
      basic: {
        title: 'Basic Foundation',
        description: 'Essential moisture & protection',
        steps: {
          am: [
            'Gentle Cream Cleanser',
            'Rich Moisturizer',
            'Hydrating Sunscreen'
          ],
          pm: [
            'Gentle Cream Cleanser',
            'Rich Moisturizer'
          ]
        },
        keyBenefits: ['Deep hydration', 'Barrier protection', 'Soothes tightness']
      },
      moderate: {
        title: 'Moderate Care',
        description: 'Builds on basic + extra hydration',
        steps: {
          am: [
            'Gentle Cream Cleanser',
            'Hydrating Essence/Toner',
            'Rich Moisturizer',
            'Hydrating Sunscreen'
          ],
          pm: [
            'Gentle Cleanser',
            'Hydrating Essence',
            'Rich Moisturizer'
          ]
        },
        keyBenefits: ['Enhanced hydration', 'Plumps skin', 'All-day comfort']
      },
      comprehensive: {
        title: 'Comprehensive',
        description: 'Maximum nourishment + treatment',
        steps: {
          am: [
            'Gentle Cream Cleanser',
            'Hydrating Essence',
            'Antioxidant Serum (gentle)',
            'Rich Moisturizer',
            'Hydrating Sunscreen'
          ],
          pm: [
            'Gentle Cleanser',
            'Hydrating Essence',
            'Buffered Retinoid or Peptide Serum',
            'Rich Moisturizer'
          ]
        },
        keyBenefits: ['Complete nourishment', 'Anti-aging benefits', 'Luxurious care']
      }
    },
    
    combination: {
      name: 'Combination Skin',
      description: 'Balanced care for mixed zones',
      emoji: '⚖️',
      basic: {
        title: 'Basic Foundation',
        description: 'Zone-specific care essentials',
        steps: {
          am: [
            'Gentle Gel Cleanser',
            'Lightweight Moisturizer (zone care)',
            'Sunscreen'
          ],
          pm: [
            'Gentle Gel Cleanser',
            'Zone-specific Moisturizing'
          ]
        },
        keyBenefits: ['Balances oil & dry areas', 'Customized hydration', 'Even complexion']
      },
      moderate: {
        title: 'Moderate Care',
        description: 'Targeted treatment by zone',
        steps: {
          am: [
            'Gentle Gel Cleanser',
            'Lightweight Moisturizer',
            'Sunscreen'
          ],
          pm: [
            'Gentle Cleanser',
            'BHA/Mandelic on T-zone',
            'Hydrating Essence on cheeks',
            'Zone-specific Moisturizing'
          ]
        },
        keyBenefits: ['Refines T-zone', 'Hydrates cheeks', 'Harmonized skin']
      },
      comprehensive: {
        title: 'Comprehensive',
        description: 'Advanced multi-zone treatment',
        steps: {
          am: [
            'Gentle Gel Cleanser',
            'Niacinamide Serum',
            'Lightweight Moisturizer',
            'Sunscreen'
          ],
          pm: [
            'Gentle Cleanser',
            'Targeted Actives (zone-specific)',
            'Buffered Retinoid',
            'Zone-specific Moisturizing'
          ]
        },
        keyBenefits: ['Optimized for each zone', 'Advanced actives', 'Professional results']
      }
    },
    
    normal: {
      name: 'Normal Skin',
      description: 'Maintenance & enhancement',
      emoji: '✨',
      basic: {
        title: 'Basic Foundation',
        description: 'Simple, effective essentials',
        steps: {
          am: [
            'Gentle Cleanser',
            'Light/Medium Moisturizer',
            'Sunscreen'
          ],
          pm: [
            'Gentle Cleanser',
            'Light/Medium Moisturizer'
          ]
        },
        keyBenefits: ['Maintains balance', 'Simple routine', 'Healthy glow']
      },
      moderate: {
        title: 'Moderate Care',
        description: 'Builds on basic + antioxidants',
        steps: {
          am: [
            'Gentle Cleanser',
            'Antioxidant Serum',
            'Light/Medium Moisturizer',
            'Sunscreen'
          ],
          pm: [
            'Gentle Cleanser',
            'Light/Medium Moisturizer'
          ]
        },
        keyBenefits: ['Enhanced protection', 'Brightening boost', 'Preventive care']
      },
      comprehensive: {
        title: 'Comprehensive',
        description: 'Complete optimization routine',
        steps: {
          am: [
            'Gentle Cleanser',
            'Antioxidant Serum',
            'Light/Medium Moisturizer',
            'Sunscreen'
          ],
          pm: [
            'Gentle Cleanser',
            'Retinoid or Peptide Serum',
            'Light/Medium Moisturizer',
            'Weekly Gentle Exfoliation'
          ]
        },
        keyBenefits: ['Maximum enhancement', 'Anti-aging actives', 'Radiant complexion']
      }
    },
    
    sensitive: {
      name: 'Sensitive Skin',
      description: 'Gentle, soothing, barrier-focused',
      emoji: '🌸',
      basic: {
        title: 'Basic Foundation',
        description: 'Ultra-gentle barrier support',
        steps: {
          am: [
            'Ultra-Gentle Cream Cleanser',
            'Barrier Repair Moisturizer',
            'Mineral Sunscreen'
          ],
          pm: [
            'Ultra-Gentle Cleanser',
            'Barrier Repair Moisturizer'
          ]
        },
        keyBenefits: ['Calms irritation', 'Strengthens barrier', 'Reduces redness']
      },
      moderate: {
        title: 'Moderate Care',
        description: 'Builds on basic + soothing serums',
        steps: {
          am: [
            'Ultra-Gentle Cleanser',
            'Soothing Serum (centella/panthenol)',
            'Barrier Repair Moisturizer',
            'Mineral Sunscreen'
          ],
          pm: [
            'Ultra-Gentle Cleanser',
            'Soothing Serum',
            'Barrier Moisturizer'
          ]
        },
        keyBenefits: ['Enhanced soothing', 'Improved resilience', 'Comfort all day']
      },
      comprehensive: {
        title: 'Comprehensive',
        description: 'Maximum barrier support + care',
        steps: {
          am: [
            'Ultra-Gentle Cleanser',
            'Soothing Serum',
            'Barrier Repair Moisturizer',
            'Mineral Sunscreen'
          ],
          pm: [
            'Ultra-Gentle Cleanser',
            'Soothing Serum',
            'Night Barrier Boost Cream',
            'Weekly Calming Mask'
          ]
        },
        keyBenefits: ['Ultimate comfort', 'Resilient skin', 'Long-term health']
      }
    }
  };
  
  // Helper function to get routines for a specific skin type
  export const getRoutinesForSkinType = (skinType) => {
    return ROUTINES_DATA[skinType] || ROUTINES_DATA.normal;
  };
  
  // Helper function to get a specific routine level
  export const getSpecificRoutine = (skinType, level) => {
    const skinTypeData = ROUTINES_DATA[skinType] || ROUTINES_DATA.normal;
    return skinTypeData[level];
  };