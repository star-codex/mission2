// contains specific endpoints related to image handling
// each endpoint is associated with a function in imageController

const express = require('express');
const router = express.Router();

// Import controller
const imageController = require('../controllers/imageController');

// Define a basic GET route
router.get('/status', (req, res) => {
    res.status(200).json({ message: 'Server is up and running!' });
});

// Define image-related endpoints
router.post('/upload', imageController.handleImageUpload);

// Add more routes as needed

module.exports = router;
