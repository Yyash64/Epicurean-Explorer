import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import "../css/SubRegion.css";
import Loader from "./Loader";

const SubRegion = () => {
  const [recipes, setRecipes] = useState([]);
  const { category } = useParams();
  useEffect(() => {
    recipeBySubRegion();
  }, []);
  const recipeBySubRegion = async () => {
    let res = await fetch(`/api/filter.php?c=${category}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    setRecipes(res.meals);
  };
  return (
    <div style={{backgroundColor: "white",}}>
      {recipes?.length>0 ? (
        <>
          <h1 style={{ marginLeft: "5%" }}>
            <u>{`Let's Choose a ${category} Recipe to Make`}</u>
          </h1>
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

export default SubRegion;
