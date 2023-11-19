// contains specific endpoints related to image handling
// each endpoint is associated with a function in imageController

const express = require('express');
const router = express.Router();

// Function to set up image routes with customVisionService
module.exports = function (customVisionService) {
	// Import controller
	const imageController = require('../controllers/imageController');

	// Define a basic GET route
	router.get('/status', (req, res) => {
		res.status(200).json({ message: 'Server is up and running!' });
	});

	// Define image-related endpoints
	router.post('/upload', async (req, res) => {
		const imagePath = req.file.path;

		try {
			// Call the Custom Vision service to analyze the image
			const results = await customVisionService.analyzeImage(imagePath);

			// Extract tags from the response
			const detectedTags = results.map((prediction) => ({
				tagName: prediction.tagName,
				probability: prediction.probability,
			}));

			// Process the results and send a response
			res.json({ detectedTags });
		} catch (error) {
			// Handle errors and send an appropriate response
			console.error('Error processing uploaded image:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});

	// Add more routes as needed

	return router;
};
