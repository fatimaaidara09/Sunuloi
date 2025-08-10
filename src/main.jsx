import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { FilterProvider } from "./context/FilterContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import "./i18n"; 
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FilterProvider>
      <FavoriteProvider>
        <App />
        <Toaster position="top-right" />
      </FavoriteProvider>
    </FilterProvider>
  </React.StrictMode>
);
