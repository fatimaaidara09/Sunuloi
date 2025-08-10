import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-selector">
      <button
        onClick={() => changeLanguage("fr")}
        className={`px-2 py-1 rounded ${
          i18n.language === "fr" ? "bg-green-600 text-white" : "bg-gray-200"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`ml-2 px-2 py-1 rounded ${
          i18n.language === "en" ? "bg-green-600 text-white" : "bg-gray-200"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;
