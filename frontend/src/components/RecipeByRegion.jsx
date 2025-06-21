import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import RecipeCard from "./RecipeCard";
import "../css/SubRegion.css";

const RecipeByRegion = () => {
  const [recipes, setRecipes] = useState([]);
  const { Region } = useParams();
  useEffect(() => {
    recipeByRegion();
  }, []);
  const recipeByRegion = async () => {
    try {
      let res = await fetch(`/api/filter.php?a=${Region}`, {
        method: "GET",
      });
      res = await res.json();
      setRecipes(res.meals);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      {recipes?.length > 0 ? (
        <>
          <h1
            style={{ marginLeft: "5%" }}
          >{`Explore the spice of ${Region} Continent`}</h1>
          <div className="parentContainer-subregion">
            {recipes.map((recipe, index) => {
              return (
                <RecipeCard
                  className="card-subregion"
                  title={recipe.strMeal}
                  key={index}
                  image={recipe.strMealThumb}
                  id={recipe.idMeal}
                />
              );
            })}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default RecipeByRegion;
