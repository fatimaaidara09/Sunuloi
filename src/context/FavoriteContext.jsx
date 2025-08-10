// src/context/FavoriteContext.jsx
import React, { createContext, useContext, useState } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    let action = "added";
    setFavorites((prev) => {
      if (prev.includes(id)) {
        action = "removed";
        return prev.filter((fav) => fav !== id);
      } else {
        return [...prev, id];
      }
    });
    return action;
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
