import React, { useEffect, useState } from "react";
import "../css/cart.css";
import Loader from "./Loader";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCartItems();
  }, []);
  const getCartItems = async () => {
    let res = await fetch("http://127.0.0.1:8000/api/v1/cart", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    res = await res.json();
    console.log(res);
    console.log(res.cart.cartItem);
    setCartItems(res.cart.cartItem);
  };
  const handleDeleteRecipe = async (recipeIndex) => {
    const recipe = cartItems[recipeIndex];

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/cart/delrecipe", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          recipename: recipe.recipename,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Remove the entire recipe from the cart
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(recipeIndex, 1);
        setCartItems(updatedCartItems);
      } else {
        console.error(data.message || "Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleDelete = async (recipeIndex, ingredientIndex) => {
    const recipe = cartItems[recipeIndex];
    const ingredient = recipe.ingredients[ingredientIndex];

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/cart/deling", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          recipename: recipe.recipename,
          ingredient: ingredient,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update UI after successful delete
        const updatedCartItems = [...cartItems];
        updatedCartItems[recipeIndex].ingredients.splice(ingredientIndex, 1);

        // If no ingredients left in a recipe, optionally remove the whole recipe
        if (updatedCartItems[recipeIndex].ingredients.length === 0) {
          updatedCartItems.splice(recipeIndex, 1);
        }

        setCartItems(updatedCartItems);
      } else {
        console.error(data.message || "Failed to delete ingredient");
      }
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  return (
    <div className="recipe-list" style={{ backgroundColor: "white" }}>
      {cartItems.length > 0 ? (
        <>
          <h2 className="cart-header">Your Cart</h2>
          <ul style={{ width: "800px", margin: "0px auto" }}>
            {cartItems.map((recipe, recipeIndex) => (
              <li key={recipeIndex} className="recipe-item">
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3>{recipe.recipename}</h3>
                    <button onClick={() => handleDeleteRecipe(recipeIndex)} style={{padding:"5px",cursor:"pointer"}}>
                      Delete Recipe
                    </button>
                  </div>
                  <ul className="ingredient-list">
                    {recipe.ingredients.map((ingredient, ingredientIndex) => (
                      <li
                        key={ingredientIndex}
                        className="ingredient-item"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {/* <img src={`/images/${ingredient.toLowerCase()}.jpg`} alt={ingredient} /> */}
                          <span
                            className="ingredient-name"
                            style={{
                              fontSize: "16px",
                              alignContent: "left",
                              color: "black",
                              fontWeight: "lighter",
                            }}
                          >
                            {ingredient}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            handleDelete(recipeIndex, ingredientIndex)
                          }
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h1 style={{width:"100%", textAlign:"center"}}>No items found</h1>
      )}
    </div>
  );
};

export default Cart;
