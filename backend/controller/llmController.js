const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const AppError = require("../utils/apperror");
const catchasync = require("../utils/catchasync");

// 1. Configuration
const api_key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(api_key);

// Check available models first
// async function listAvailableModels() {
//   try {
//     // Correct method to list models
//     const result = await genAI.listAvailableModels();
//     console.log("Available models:");
//     result.models.forEach((modelInfo) => {
//       console.log("Model Name:", modelInfo.name);
//       console.log(
//         "Supported Generation Methods:",
//         modelInfo.supportedGenerationMethods
//       );
//       console.log("---");
//     });
//   } catch (error) {
//     console.error("Error listing models:", error);
//   }
// }

// // Run this function to see available models before proceeding
// listAvailableModels();

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

// 2. Initialize Model with the correct model name
// Use "gemini-1.5-pro" instead of "gemini-pro" (the model name may have changed)
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", // Update this based on the result from listAvailableModels()
  generationConfig,
});

// 3. Generate Content

exports.generateAIContent = catchasync(async (req, res, next) => {
  const recipeid = req.body.recipeid;
  console.log(recipeid);

  let config = {
    method: "GET",
    url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeid}`,
    headers: {
      "content-type": "application/json",
    },
  };

  let recipeinfo = await axios(config);
  recipeinfo = recipeinfo.data;

  // Get the recipe data (first meal in the array)
  const recipe = recipeinfo.meals[0];
  console.log(recipe);

  // Extract ingredients - TheMealDB provides ingredients as strIngredient1, strIngredient2, etc.
  // and measurements as strMeasure1, strMeasure2, etc.
  const ingredientArray = [];

  // Process up to 20 ingredients (TheMealDB's limit)
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    // Only add ingredients that aren't empty or null
    if (ingredient && ingredient.trim() !== "") {
      ingredientArray.push({
        ingredient: ingredient,
        measure: measure,
      });
    }
  }

  // Format ingredients for the prompt
  const formattedIngredients = ingredientArray
    .map((item) => `* ${item.measure} ${item.ingredient}`)
    .join("\n");

  // Get instructions
  const recipeString = recipe.strInstructions;

  if (!recipeString) {
    return next(
      new AppError("No instructions were found for this recipe", 404)
    );
  }

  // Create prompt with formatted ingredients
  const prompt = `For the following instructions: ${recipeString} and the ingredients along with their quantity:
${formattedIngredients}

just Give the carbs, protein, fats and calories.  
give the output like 
Carbs: 40g
Protein: 60g
Fats: 60g
Calories: 900

and nothing else in the output`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const restext = response.text();
  console.log(restext);

  const nutrition = extractNutritionInfo(restext);

  console.log(nutrition)

  res.status(201).json({
    status: "success",
    nutrition,
  });
});

exports.generateAIDescription = catchasync(async (req, res, next) => {
  const recipename = req.body.recipename;
  if (!recipename) {
    return next(new AppError("No Dish is Available"));
  }
  const prompt = `Give small description about the food ${recipename} in 2 line`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const restext = response.text();

  res.status(200).json({
    status: "success",
    description: restext,
  });
});

function extractNutritionInfo(text) {
  const pattern =
    /(?:\*\*|\b)(Calories|Carbs|Protein|Fat|Fats)(?:\*\*|\b)?[^:]*:\s*~?(\d+)[-–]?(\d+)?\s*(kcal|g)?/gi;
  const matches = [...text.matchAll(pattern)];

  const nutritionInfo = {};

  for (const match of matches) {
    let nutrient = match[1];
    const low = parseInt(match[2], 10);
    const high = match[3] ? parseInt(match[3], 10) : null;
    const average = high ? (low + high) / 2 : low;

    // Normalize "Fats" to "Fat"
    if (nutrient.toLowerCase() === "fats") {
      nutrient = "Fat";
    }

    nutritionInfo[nutrient] = average;
  }

  return nutritionInfo;
}
