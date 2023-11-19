require('dotenv').config();

// sets up the main Express application and listens on port

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// Add middleware for handling form data
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Delegate the handling of requests to modular routes
const indexRoutes = require('/home/virgo/code/mission2/src/routes/index.js');

// Import customVisionService using a relative path
const customVisionService = require('/home/virgo/code/mission2/src/services/customVisionService.js');

// Pass customVisionService to the route
app.use('/', indexRoutes(customVisionService));

// ROUTE FOR CONNECTION TO FRONTEND

app.post('/upload', upload.single('image'), async (req, res) => {
	// req.file contains information about the uploaded file
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