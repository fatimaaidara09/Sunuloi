// src/context/FilterContext.jsx
import React, { createContext, useState } from "react";

export const FilterContext = createContext({
  searchTerm: "",
  setSearchTerm: () => {},
  dateFrom: "",
  setDateFrom: () => {},
  dateTo: "",
  setDateTo: () => {},
  docType: "",
  setDocType: () => {},
  ministry: "",
  setMinistry: () => {},
});

export function FilterProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [docType, setDocType] = useState("");
  const [ministry, setMinistry] = useState("");

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
        docType,
        setDocType,
        ministry,
        setMinistry,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
