// src/services/customVisionService.js
const {
	PredictionAPIClient,
} = require('@azure/cognitiveservices-customvision-prediction');
const { CognitiveServicesCredentials } = require('@azure/ms-rest-azure-js');

// Read the subscription key from your environment variables
const subscriptionKey = process.env.CUSTOM_VISION_API_KEY;
const endpoint = process.env.CUSTOM_VISION_ENDPOINT;

// Project & iteration details
const projectId = 'd8f7a9c4-56bb-47a8-a5c0-e54aacf609b4';
const publishedIterationName = 'Iteration 1';

// Check if the subscription key and endpoint is defined
if (!subscriptionKey || !endpoint || !projectId || !publishedIterationName) {
	throw new Error(
		'Subscription key, endpoint, projectId, or iterationName is not defined. Make sure to set the CUSTOM_VISION_API_KEY, CUSTOM_VISION_ENDPOINT, and update projectId and iterationName in your code.'
	);
}

// Create the credentials instance
const credentials = new CognitiveServicesCredentials(subscriptionKey);
// Create the Prediction API client
const client = new PredictionAPIClient(credentials, endpoint);

async function analyzeImage(imagePath) {
	try {
		// Call Custom Vision service
		const results = await client.classifyImageUrl(
			projectId,
			publishedIterationName,
			{ url: imagePath, visualFeatures: ['Tags'], details: [] }
		);

		// Extract tag probabilities
		const tagProbabilities = results.predictions.map((prediction) => ({
			tagName: prediction.tagName,
			probability: prediction.probability,
		}));

		// Process the results and return them
		return tagProbabilities;
	} catch (error) {
		// Handle errors
		console.error('Error analyzing image:', error);
		throw error;
	}
}

module.exports = {
	analyzeImage,
};
