// contains specific endpoints related to image handling
// each endpoint is associated with a function in imageController

const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Define image-related endpoints
router.post('/upload', imageController.handleImageUpload);

// Add more routes as needed

module.exports = router;
