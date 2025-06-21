const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  ingredient: String,
  quantity: String,
});

const dishSchema = new mongoose.Schema({
  area: String,
  category: String,
  ingredients: [ingredientSchema],
  instructions: [String],
  mealName: String,
  recipeId: String,
  thumbnail: String,
});

const Dishes = mongoose.model('Dishes', dishSchema);

module.exports=Dishes
