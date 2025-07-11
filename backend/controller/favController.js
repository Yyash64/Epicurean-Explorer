const AppError = require("../utils/apperror");
const axios = require("axios");
const catchasync = require("../utils/catchasync");

const getbyID = async (id) => {
  let config = {
    method: "GET",
    url: `http://127.0.0.1:8000/api/v1/ingAndIns?recipeid=${id}`,
    headers: {
      "content-type": "application/json",
    },
  };

  const recipeinfo = await axios(config);

  return recipeinfo.data;
};

exports.getfavrecipe = catchasync(async (req, res, next) => {
  const userid = req.user.id;
  if (!userid) {
    return next(new AppError("You're not logged In, Please Login"));
  }
  //console.log(userid)
  const favArray = req.user.favrecipes;
  if (!favArray) {
    return next(
      new AppError(
        "Currently you have no favourite recipes \nStart Adding Recipes to your Favuorites"
      )
    );
  }

  // Use Promise.all to await all asynchronous calls
  const favRecipeDetails = await Promise.all(
    favArray.map(async (recipeId) => {
      return await getbyID(recipeId);
    })
  );

  const formattedFavRecipeDetails = favRecipeDetails.map((recipe, index) => {
    return {
      recipeId: favArray[index], // from the original favArray
      Recipe_title: recipe.data.mealName,
      img_url: recipe.data.thumbnail,
    };
  });
  

  console.log(formattedFavRecipeDetails);

  res.status(201).json({
    status: "Success",
    recipeDetails: formattedFavRecipeDetails,
  });
});

exports.addtofav = catchasync(async (req, res, next) => {
  const user = req.user;
  const recipeid = req.body.recipeid;

  console.log(user.favrecipes);
  if (!user) {
    return next(new AppError("You're not logged In, Please Login", 404));
  }

  if (user.favrecipes.includes(recipeid)) {
    return res.status(400).json({ message: "Recipe already in favorites." });
  }

  user.favrecipes.push(recipeid);

  await user.save({ validateBeforeSave: false });
  console.log(user.favrecipes);

  res.status(201).json({
    status: "Success",
    recipeIds: {
      recipeid,
    },
  });
});

exports.deletefav = catchasync(async (req, res, next) => {
  const user = req.user;
  const recipetobeDeleted = req.body.recipeid;

  const favRecipeIndex = user.favrecipes.indexOf(recipetobeDeleted);

  if (favRecipeIndex !== -1) {
    // Recipe found in the favrecipes array, remove it
    user.favrecipes.splice(favRecipeIndex, 1);

    // Save the updated user
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      status: "Success",
      message: "Favorite recipe deleted successfully.",
      user: {
        user,
      },
    });
  } else {
    // Recipe not found in the favrecipes array
    return next(new AppError("Recipe not found in the fav list", 404));
  }
});
