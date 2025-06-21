import React, { useEffect, useState } from "react";
import "../css/recipeProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import apiUrl from "../config";

const RecipeProfile = () => {
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState("");
  const [RecipeTitle, setRecipeTitle] = useState("");
  const [RecipeImage, setRecipeImage] = useState("");
  const [nutrition, setNutrition] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getRecipe();
    if(!nutrition) getNutrition();
  }, [id]);

  const getNutrition = async () => {
    if (!id) return;
    let nutrition = await fetch("http://127.0.0.1:8000/api/v1/llmmodel/", {
      method: "post",
      body: JSON.stringify({ recipeid: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    nutrition = await nutrition.json();
    if (nutrition.status === "success") {
      console.log("Sdsdsd")
      setNutrition(nutrition.nutrition);
    }
  };

  const getRecipe = async () => {
    console.log(id);
    let res = await fetch(`/api/lookup.php?i=${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    console.log(res);
    setRecipe(res.meals[0]);
    // console.log(res.payload.calories)
    // console.log(res.payload.img_url)
    // console.log(res.payload.Recipe_title)
    // console.log(res.payload["Energy (kcal)"])
    // console.log(res.payload["Protein (g)"])
    // console.log(res.payload["Total lipid (fat) (g)"])
    // console.log(res.payload["Carbohydrate, by difference (g)"])
    if (res.meals.length > 0) {
      setRecipeTitle(res.meals[0].strMeal);
      setRecipeImage(res.meals[0].strMealThumb);
      // setCalories(res.meals[0].Calories);
      // setEnergy(res.payload["Energy (kcal)"]);
      // setProtein(res.payload["Protein (g)"]);
      // setFat(res.payload["Total lipid (fat) (g)"]);
      // setCarbs(res.payload["Carbohydrate, by difference (g)"]);
    } else {
      alert("no recipe found");
    }
  };
  const handleClick = () => {
    navigate(`/recipeIns/${id}`);
  };
  const handleSimilarClick = () => {
    navigate(`/similar/${id}`);
  };
  return (
    <div style={{ backgroundColor: "white",minHeight:"80vh" }}>
      {recipe ? (
        <>
          <div className="recipe-profile-container" style={{paddingBottom:"20px"}}>
            <div className="recipe-profile-name">
              <h1 style={{ fontSize: "70px", color: "#31b550" }}>
                {RecipeTitle}
              </h1>
              <div className="recipe-profile-btn-div">
                <button
                  onClick={handleSimilarClick}
                  className="recipe-profile-btn capitalize-first-letter"
                >
                  Similar Recipes
                </button>
                <button
                  onClick={handleClick}
                  className="recipe-profile-btn capitalize-first-letter"
                >
                  Start Making
                </button>
              </div>
            </div>
            <div className="recipe-profile-image-div">
              <img src={RecipeImage} className="recipe-profile-image" />
            </div>
          </div>

          {nutrition !== null && (
            <div className="nutrients-div">
              <div className="nutrient-div" style={{ margin: "0px 10px" }}>
                <h3>
                  Carbs
                  <br />
                  {nutrition.Carbs} 
                </h3>
              </div>
              <div className="nutrient-div" style={{ margin: "0px 10px" }}>
                <h3>
                  Calories
                  <br />
                  {nutrition.Calories} cal
                </h3>
              </div>
              <div className="nutrient-div" style={{ margin: "0px 10px" }}>
                <h3>
                  Protein
                  <br />
                  {nutrition.Protein}
                </h3>
              </div>
              <div className="nutrient-div" style={{ margin: "0px 10px" }}>
                <h3>
                  Fat
                  <br />
                  {nutrition.Fat}
                </h3>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default RecipeProfile;
