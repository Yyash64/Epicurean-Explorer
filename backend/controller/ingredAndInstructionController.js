const axios = require("axios");
const catchasync = require("../utils/catchasync");
const AppError = require("../utils/apperror");

const MEALDB_API = "https://www.themealdb.com/api/json/v1/1/lookup.php";

function processMealData(mealData) {
  // Process ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];

    // Check if both ingredient and measure exist and are not empty
    if (ingredient && ingredient.trim() && measure && measure.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        quantity: measure.trim(),
      });
    }
  }

  // Process instructions
  const instructions = mealData.strInstructions
    ? mealData.strInstructions
        .split("\r\n")
        .map((line) => line.trim())
        .filter((line) => line)
    : [];

  return { ingredients, instructions };
}

exports.ingInsReturn = catchasync(async (req, res, next) => {
  try {
    // Get ID from query parameters instead of body
    const { recipeid } = req.query;

    if (!recipeid) {
      return next(new AppError("Please provide a recipe ID", 400));
    }

    // Rest of your code...
    const response = await axios.get(`${MEALDB_API}?i=${recipeid}`);

    if (!response.data.meals || !response.data.meals.length) {
      return res.json({
        status: "fail",
      });
    }

    const mealData = response.data.meals[0];
    const { ingredients, instructions } = processMealData(mealData);

    res.json({
      status: "success",
      data: {
        mealName: mealData.strMeal,
        category: mealData.strCategory,
        area: mealData.strArea,
        ingredients,
        instructions,
        thumbnail: mealData.strMealThumb,
        youtube: mealData.strYoutube,
        recipeId: recipeid,
      },
    });
  } catch (error) {
    console.error("Error fetching meal data:", error);
    return next(new AppError("Failed to fetch recipe data", 500));
  }
});
