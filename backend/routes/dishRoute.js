const express = require('express');
const router = express.Router();
const { getDishByName, getDishByRecipeId } = require('../controller/dishController');

// Existing route
router.route('/').post(getDishByName);

// New route to get by recipeId
router.route('/by-recipe-id').post(getDishByRecipeId);

module.exports = router;
