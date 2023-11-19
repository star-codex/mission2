// central hub for all routes

const express = require('express');
const router = express.Router();
const path = require('path');

// Serve static files from the 'public' folder
router.use(express.static('/home/virgo/code/mission2/public'));

// Set up a wildcard route to serve index.html for all routes
router.get('/', (req, res) => {
	res.sendFile('/home/virgo/code/mission2/public/index.html');
});

// Function to set up routes with customVisionService
module.exports = function (customVisionService) {
	// Import route
	const imageRoutes = require('./imageRoutes')(customVisionService);

	// Use the routes defined in imageRoutes.js
	router.use('/images', imageRoutes);

	return router;
};