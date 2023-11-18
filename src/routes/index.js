// central hub for all routes

const express = require('express');
const router = express.Router();

// Import route
const imageRoutes = require('./imageRoutes');

// Use the routes defined in imageRoutes.js
router.use('/images', imageRoutes);

module.exports = router;
