const Dish = require("../models/dishModel"); // assuming dishModel.js defines the schema

// Controller to fetch a dish by its name
const getDishByName = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Dish name is required" });
  }

  try {
    const dish = await Dish.findOne({ mealName: name });
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    return res.status(200).json({ status: "success", dish });
  } catch (error) {
    console.error("Error fetching dish:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getDishByRecipeId = async (req, res) => {
  const { recipeId } = req.body;
  if (!recipeId) {
    return res.status(400).json({ message: "Recipe ID is required" });
  }

  try {
    const dish = await Dish.findOne({ recipeId });

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    return res.status(200).json({ status: "success", data:dish });
  } catch (error) {
    console.error("Error fetching dish by recipeId:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDishByName,
  getDishByRecipeId,
};
