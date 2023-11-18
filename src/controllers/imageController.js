// contains the functions that handle the logic for specific routes
const customVisionService = require('../services/customVisionService');

// processing the image upload
// calling the Custom Vision service through the customVisionService.js file
// returning the results
async function handleImageUpload(req, res) {
	const imagePath = req.file.path;

	try {
		// Call the Custom Vision service to analyze the image
		const results = await customVisionService.analyzeImage(imagePath);

		// Extract tags from the response
		const detectedTags = results.predictions.map((prediction) => {
			return {
				tagName: prediction.tagName,
				probability: prediction.probability,
			};
		});

		// Filter tags with a probability threshold (adjust as needed)
		const threshold = 0.5;
		const filteredTags = detectedTags.filter(
			(tag) => tag.probability >= threshold
		);

		// Get the most probable tag (first one in the array after filtering)
		const mostProbableTag =
			filteredTags.length > 0 ? filteredTags[0].tagName : 'Unknown';

		// Process the results and send a response
		res.json({ detectedTags, mostProbableTag });
	} catch (error) {
		// Handle errors and send an appropriate response
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

module.exports = {
	handleImageUpload,
};
