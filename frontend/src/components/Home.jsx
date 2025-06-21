import React, { useEffect, useState } from "react";
import "../css/Home.css";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { TbCameraShare } from "react-icons/tb";
import { IoCloseCircleOutline } from "react-icons/io5";
import RecipeName from "./RecipeName";
import Loader from "./Loader";
import apiUrl from "../config";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate("");
  const [searchRecipe, setSearchRecipe] = useState("");
  const [description, setDescription] = useState("");
  const [dayRecipe, setDayRecipe] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    getTopRecipes();
  }, []);
  useEffect(() => {
    if (dayRecipe) getDescription();
  }, [dayRecipe]);

  const handleSearchRecipe = async () => {
    if (searchRecipe && selectedImage) {
      alert("Please select only one search.");
    } else if (searchRecipe) {
      let recipe = await fetch(`/api/search.php?s=${searchRecipe}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      recipe = await recipe.json();
      console.log(recipe);
      if (recipe) navigate(`/recipe/${recipe.meals[0].idMeal}`);
    } else if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      let response = await fetch("http://127.0.0.1:8000/api/v1/dlmodel", {
        method: "POST",
        body: formData,
      });
      response = await response.json();
      console.log(response);
      if (response.status === "success") {
        let recipeName = response.data;
        toast.success(`The uploaded image is of ${recipeName}`);
        try {
          const response = await fetch("http://127.0.0.1:8000/api/v1/dishes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: recipeName }),
          });
          const data = await response.json();
          console.log(data);
          if (data.status === "success") {
            navigate(`/recipeIns/${data.dish.recipeId}`);
          } else {
            toast.error(`No dish named ${recipeName} found in the database`);
          }
        } catch (error) {
          console.error("Error:", error.message);
        }
      } else {
        alert("Failed to upload image.");
      }
    } else {
      alert("Please search atleast one thing.");
    }
  };

  const getTopRecipes = async () => {
    let recipe = await fetch("/api/random.php", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${apiUrl}`,
      },
    });
    recipe = await recipe.json();
    console.log(recipe.meals[0]);
    setDayRecipe(recipe.meals[0]);
  };

  const handleFavourite = async () => {
    console.log("dssd", dayRecipe.idMeal);
    let favouriteRes = await fetch("http://127.0.0.1:8000/api/v1/fav", {
      method: "post",
      body: JSON.stringify({ recipeid: dayRecipe.idMeal }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    console.log(favouriteRes);
    favouriteRes = await favouriteRes.json();
    console.log(favouriteRes);
  };
  const getDescription = async () => {
    let des = await fetch("http://127.0.0.1:8000/api/v1/llmmodel/description", {
      method: "post",
      body: JSON.stringify({ recipename: dayRecipe.strMeal }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    des = await des.json();
    setDescription(des.description);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedImage(file);
    console.log(selectedImage);
  };
  const handleImageRemove = () => {
    setSelectedImage(null);
  };
  return (
    <div>
      {dayRecipe ? (
        <div className="page-container">
          <div className="intro-container">
            <h1 className="intro">
              Explore more than <br></br>{" "}
              <span className="quantity">1000s</span> of recipes
            </h1>
            <p className="intro-des">
              <i>
                "Dive into the sea of numerous delicious recipes , get a cloth
                ready to <br></br>wipe out the water dropping from your mouth"
              </i>
            </p>
            <div className="searching">
              <div className="search-div">
                <input
                  type="text"
                  placeholder="What are you looking for..."
                  className="search-field"
                  value={searchRecipe}
                  onChange={(e) => setSearchRecipe(e.target.value)}
                />
                <FaSearch
                  className="search-icon"
                  style={{
                    fontSize: "28px",
                    marginLeft: "12px",
                    cursor: "pointer",
                  }}
                  onClick={handleSearchRecipe}
                />
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload" className="camera-icon-label">
                  <TbCameraShare
                    className="camera-icon"
                    style={{
                      fontSize: "28px",
                      marginLeft: "13px",
                      cursor: "pointer",
                    }}
                  />
                </label>
              </div>
              {selectedImage && (
                <div className="selected-image-div">
                  <div className="uploaded-image-container">
                    <IoCloseCircleOutline
                      onClick={handleImageRemove}
                      style={{
                        fontSize: "28px",
                        margin: "0px 10px 0px 10px",
                        cursor: "pointer",
                        marginTop: "5px",
                        color: "black",
                      }}
                    />
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Uploaded"
                      className="uploaded-image"
                    />
                    <p className="selected-image-name">{selectedImage.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="adopt-div-r">
            <div>
              <h3 className="adopt-head">Just Snap it! , Search it!</h3>
              <p className="adopt-content">
                <i>
                  Your yummy!! dish that you are curious about is just click
                  away,capture it and just upload it here & take up your weapons
                  to start making it
                </i>
              </p>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <button
                className="adopt-btn"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                Upload
              </button>
            </div>
          </div>
          <div className="giveaway-div" style={{ paddingBottom: "20px" }}>
            <div className="giveaway-div-in">
              <h3 className="adopt-head">
                Tired of the same meal on repeat?,<br></br> Try something
                Different!
              </h3>
              <p className="giveaway-content">
                <i>
                  Are you also bored of eating the same taste everyday? , give a
                  tinch of new taste to yourself and your loved ones by
                  exploring various cuisines of different continents
                </i>
              </p>
              <Link to="/recipe">
                <button className="giveaway-btn">Search</button>
              </Link>
            </div>
          </div>
          <div
            className="top-recipes"
            id="top-recipes-section"
            style={{
              paddingTop: "80px",
              width: "100%",
              paddingBottom: "80px",
              backgroundColor: "white",
            }}
          >
            <h1
              style={{
                width: "auto",
                textAlign: "left",
                paddingLeft: "10.5%",
                backgroundColor: "white",
              }}
            >
              Let's See what's in the menu today😋
            </h1>
            <RecipeName
              id={dayRecipe.idMeal}
              title={dayRecipe.strMeal}
              image={dayRecipe.strMealThumb}
              description={description}
              handleFavourite={handleFavourite}
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
