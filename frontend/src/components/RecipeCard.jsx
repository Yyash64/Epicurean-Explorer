import React from "react";
import "../css/recipeCard.css";
import { Link } from "react-router-dom";

const RecipeCard = ({ title, image, id }) => {
  return (
    <article className="card__article">
      <img src={image} alt="image" className="card__img" />
      <div className="card__data">
        <h2 className="card__title">{title}</h2>
        <a className="card__button" href={`/recipe/${id}`}>
          Read More
        </a>
      </div>
    </article>
  );
};

export default RecipeCard;
