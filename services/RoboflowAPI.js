// services/RoboflowAPI.js
// OPTIMIZED: Return data URI directly to avoid double conversion

const ROBOFLOW_API_KEY = 'XDkVVhgoKR98eXBeMm15';
const MODEL_ENDPOINT = 'https://detect.roboflow.com/facial-acne-detection-l06mq/1';

export const analyzeImageWithRoboflow = async (imageUri) => {
  try {
    const base64Image = await convertImageToBase64(imageUri);
    
    const response = await fetch(`${MODEL_ENDPOINT}?api_key=${ROBOFLOW_API_KEY}&format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: base64Image,
    });

    if (!response.ok) {
      throw new Error(`Roboflow API error: ${response.status}`);
    }

    const rawResponse = await response.json();
    const predictions = rawResponse.predictions || [];
    const filteredPredictions = predictions.filter(p => p.confidence >= 0.3);
    
    return {
      success: true,
      predictions: filteredPredictions,
      total_found: filteredPredictions.length,
      model_used: 'facial-acne-detection-l06mq/1',
      processing_time: rawResponse.time || 0,
      rawResponse,
    };
    
  } catch (error) {
    console.error('Roboflow API Error:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
};

// OPTIMIZED: Return data URI directly instead of blob for immediate display
export const analyzeImageWithRoboflowVisual = async (imageUri) => {
  try {
    console.log('Starting visual API call...');
    const startTime = Date.now();
    
    const base64Image = await convertImageToBase64(imageUri);
    
    const response = await fetch(`${MODEL_ENDPOINT}?api_key=${ROBOFLOW_API_KEY}&format=image&labels=true&confidence=30&stroke=4`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: base64Image,
    });

    if (!response.ok) {
      throw new Error(`Roboflow Visual API error: ${response.status}`);
    }

    const blob = await response.blob();
    console.log(`Visual API completed in ${Date.now() - startTime}ms, converting to data URI...`);
    
    // OPTIMIZED: Convert to data URI immediately here instead of in component
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(`Total visual processing time: ${Date.now() - startTime}ms`);
        resolve(reader.result); // Return data URI directly
      };
      reader.onerror = () => reject(new Error('Failed to convert image blob'));
      reader.readAsDataURL(blob);
    });
    
  } catch (error) {
    console.error('Roboflow Visual API Error:', error);
    throw error;
  }
};

const convertImageToBase64 = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('Failed to convert image to base64'));
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error(`Image conversion failed: ${error.message}`);
  }
};

export const handleAPIError = (error) => {
  if (error.message.includes('403')) {
    return 'API access denied. Please check your API key.';
  } else if (error.message.includes('429')) {
    return 'Rate limit exceeded. Please try again in a moment.';
  } else if (error.message.includes('network')) {
    return 'Network error. Please check your internet connection.';
  } else {
    return 'Analysis failed. Please try again.';
  }
};