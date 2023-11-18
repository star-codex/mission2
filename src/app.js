require('dotenv').config();

// sets up the main Express application and listens on port

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// Add middleware for handling form data
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Delegate the handling of requests to modular routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// ROUTE FOR CONNECTION TO FRONTEND

// handles the image upload request
// calls the imageController.handleImageUpload function to analyze the image using the Custom Vision service
app.post('/upload', upload.single('image'), (req, res) => {
	// req.file contains information about the uploaded file
	const imagePath = req.file.path;
	// Continue processing the uploaded image
});
