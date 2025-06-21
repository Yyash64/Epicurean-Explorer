import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RecipeCard from "./RecipeCard";
import Loader from "./Loader";

const FavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-bottom: 30px;
  text-align: center;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ProductName = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;

const Favorites = () => {
  const [fav, setFav] = useState([]);
  const [description, setDescription] = useState("");
  useEffect(() => {
    getFavCards();
  }, []);
  const getFavCards = async () => {
    let res = await fetch("http://127.0.0.1:8000/api/v1/fav", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    res = await res.json();
    setFav(res.recipeDetails);
  };

  const handleDeleteFav = async (id) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/fav", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          recipeid: id,
        }),
      });

      const data = await res.json();

      if (data.status == "Success") {
        const updatedFav = fav.filter((f) => f.recipeId !== id);
        console.log(updatedFav)
        setFav(updatedFav);
      } else {
        console.error(data.message || "Failed to remove favorite");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <FavoritesContainer
      style={{
        minHeight: "100vh",
        backgroundColor: "white",
        height: "fit-content",
      }}
    >
      {fav.length > 0 ? (
        <>
          <Title>Favourites</Title>
          <Description>
            Your chosen collection is here to make you smile—it's like it was
            made just for you!
          </Description>
          <ProductsContainer>
            {fav.map((favourite) => (
              <Product key={favourite.Recipe_title}>
                <RecipeCard
                  title={favourite.Recipe_title}
                  image={favourite.img_url}
                  id={favourite.recipeId}
                />
                <button
                  onClick={() => handleDeleteFav(favourite.recipeId)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove from Favorites
                </button>
              </Product>
            ))}
          </ProductsContainer>
        </>
      ) : (
        <Description>
          No favorites yet. Start adding recipes you love! 💖
        </Description>
      )}
    </FavoritesContainer>
  );
};

export default Favorites;
