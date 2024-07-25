import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState("fr");

  return (
    <LanguageContext.Provider value={{ selectedLang, setSelectedLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
