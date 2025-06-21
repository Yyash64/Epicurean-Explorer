import React, { useState, useEffect } from "react";
import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import apiUrl from "../../config";

const Ingredients = () => {
  const [RecipeTitle, setRecipeTitle] = useState("");
  const [RecipeImage, setRecipeImage] = useState("");
  const [listIngerdients, setListIngredients] = useState([]);
  const [instructionList, setInstructionList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [recId, setRecId] = useState("");
  const [selectedIngredientModel, setSelectedIngredientModel] = useState("");
  const [ingredientImageModel, setIngredientImageModel] = useState("");
  const [hoveredIngredient, setHoveredIngredient] = useState(null);
  // const spoonApi = "d7baecb9110a45e7a69c76f0248bf65f";
  // c6a858ecb82b42b28b2c4ec5c20336a9 new
  // d7baecb9110a45e7a69c76f0248bf65f new2
  // a2f913e99f2a435aab0335f64ab17aa8 new3
  // e5e6ef5e0f4943d19c0064fd19634583 old
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedIngredient) setIngredientToCart();
    getIngredients();
  }, [selectedIngredient]);
  useEffect(() => {
    getDescription();
  }, [RecipeTitle]);

  const scrollToInstructions = () => {
    const instructionsSection = document.getElementById("instructionsSection");
    instructionsSection.scrollIntoView({ behavior: "smooth" });
  };
  const ImageIngredient = async (ingredientName) => {
    console.log(ingredientName);
    let res = await fetch(
      `https://api.spoonacular.com/food/ingredients/search?query=${ingredientName}&apiKey=${spoonApi}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res = await res.json();
    if (res.results.length > 0) {
      const baseImgUrl = "https://spoonacular.com/cdn/ingredients_100x100/";
      setIngredientImageModel(baseImgUrl + res.results[0].image);
    }
  };

  const { id } = useParams();

  const getDescription = async () => {
    if (!RecipeTitle) return;
    let des = await fetch("http://127.0.0.1:8000/api/v1/llmmodel/description", {
      method: "post",
      body: JSON.stringify({ recipename: RecipeTitle, recipeid: recId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    des = await des.json();
    setDescription(des.description);
  };

  const setIngredientToCart = async () => {
    let res = await fetch("http://127.0.0.1:8000/api/v1/cart", {
      method: "post",
      body: JSON.stringify({
        recipename: RecipeTitle,
        ingredient: selectedIngredient,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    res = await res.json();
  };

  const getIngredients = async () => {
    let ingIns = await fetch(
      `http://127.0.0.1:8000/api/v1/ingAndIns?recipeid=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    ingIns = await ingIns.json();
    console.log(ingIns);
    if (ingIns.status == "success") {
      setRecipeTitle(ingIns.data.mealName);
      setRecipeImage(ingIns.data.thumbnail);
      setRecId(ingIns.data.recipeId);
      setListIngredients(ingIns.data.ingredients);
      setInstructionList(ingIns.data.instructions);
      // getDescription();
    } else {
      console.log("Sdsds");
      // utils/api.js
      try {
        let ingIns = await fetch(
          "http://127.0.0.1:8000/api/v1/dishes/by-recipe-id",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipeId: id }),
          }
        );
        ingIns = await ingIns.json();
        console.log(ingIns);
        if (ingIns.status === "success") {
          setRecipeTitle(ingIns.data.mealName);
          setRecipeImage(ingIns.data.thumbnail);
          setRecId(ingIns.data.recipeId);
          setListIngredients(ingIns.data.ingredients);
          setInstructionList(ingIns.data.instructions);
        } else {
          alert("no recipe of the day found");
          throw new Error("Failed to fetch dish by recipeId");
        }
      } catch (error) {
        console.error("Swertys", error.message);
      }
    }
  };

  const handleFavourite = async () => {
    let favouriteRes = await fetch("http://127.0.0.1:8000/api/v1/fav", {
      method: "post",
      body: JSON.stringify({ recipeid: recId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    console.log(favouriteRes);
    favouriteRes = await favouriteRes.json();
    console.log(favouriteRes);
  };

  return (
    <div className={styles.galileoDesign}>
      {RecipeTitle ? (
        <main className={styles.depth0Frame0}>
          <section className={styles.frameSave}>
            <div className={styles.grilledSalmonWithAvocadoSa}>
              <div className={styles.grilledSalmonWithAvocadoSaInner}>
                <div className={styles.depth6Frame0Parent}>
                  <img
                    className={styles.depth6Frame05}
                    loading="lazy"
                    alt=""
                    src={RecipeImage}
                  />
                  <div className={styles.frameGrilling}>
                    <div className={styles.depth7Frame03}>
                      <div className={styles.depth8Frame02}>
                        <div className={styles.depth9Frame0}>
                          <div
                            className={styles.depth10Frame0}
                            style={{ width: "100%" }}
                          >
                            <h1
                              className={styles.grilledSalmonWith}
                              style={{ width: "100%", fontSize: "2.65rem" }}
                            >
                              {RecipeTitle}
                            </h1>
                          </div>
                        </div>
                        <div className={styles.depth9Frame1}>
                          <div className={styles.depth10Frame01}>
                            <div
                              className={styles.thisGrilledSalmon}
                              style={{ marginTop: "-40px", width: "100%" }}
                            >
                              {description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.frameSeasoning}
                      style={{ marginTop: "-16px" }}
                    >
                      <button className={styles.depth8Frame03}>
                        <div className={styles.depth9Frame01}>
                          <div className={styles.depth10Frame02}>
                            <b
                              className={styles.save}
                              onClick={() => handleFavourite()}
                            >
                              Favourite
                            </b>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.depth4Frame1Parent}>
                <div className={styles.depth4Frame12}>
                  <button
                    className={styles.depth8Frame03}
                    onClick={scrollToInstructions}
                  >
                    <div className={styles.depth6Frame06}>
                      <div className={styles.depth7Frame04}>
                        <b className={styles.jumpToRecipe}>Jump to Recipe</b>
                      </div>
                    </div>
                  </button>
                </div>
                <div
                  className={styles.depth4Frame2}
                  style={{ marginBottom: "16px", fontSize: "1.75rem" }}
                >
                  <div className={styles.depth5Frame03}>
                    <div className={styles.depth6Frame07}>
                      <b className={styles.ingredients}>Ingredients</b>
                    </div>
                  </div>
                </div>
                {listIngerdients.map((ing, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.depth5Frame5}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedIngredient(ing.ingredient);
                      }}
                      // onMouseEnter={() => {
                      //   setSelectedIngredientModel(ing.ingredient);
                      //   setHoveredIngredient(ing.ingredient);
                      //   ImageIngredient(ing.ingredient);
                      // }}
                      // onMouseLeave={() => setHoveredIngredient(null)}
                    >
                      <div className={styles.depth6Frame013}>
                        <div className={styles.depth7Frame015}>
                          <div className={styles.depth7Frame025}>
                            <img
                              className={styles.createSalsaIcon}
                              alt=""
                              src="../../../images/plus.svg"
                            />
                            <div className={styles.depth8Frame018} />
                          </div>
                        </div>
                      </div>
                      <div className={styles.depth6Frame15}>
                        <div
                          className={styles.depth7Frame016}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          <div>
                            {ing.ingredient} ({ing.quantity})
                          </div>
                          {hoveredIngredient === ing.ingredient && (
                            <img
                              src={ingredientImageModel}
                              alt="Ingredient"
                              style={{
                                position: "absolute",
                                height: "150px",
                                width: "auto",
                                left: "250px",
                                top: "-40px",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  className={styles.recipejumpframe}
                  style={{ fontSize: "1.75rem" }}
                >
                  <div
                    className={styles.depth4Frame4}
                    id="instructionsSection"
                    style={{ marginTop: "30px" }}
                  >
                    <div className={styles.depth5Frame05}>
                      <div className={styles.depth6Frame015}>
                        <b className={styles.instructions}>Instructions</b>
                      </div>
                    </div>
                  </div>
                </div>
                {instructionList.map((ins, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.instruction}
                      style={{ backgroundColor: "white" }}
                    >
                      <p className={styles.instructionText}>{ins}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Ingredients;
