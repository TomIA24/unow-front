import React, { useState, useEffect } from "react";
import fr from "../../assets/fr.png";
import en from "../../assets/en.png";
import { useLanguage } from "../../../hooks/LanguageContext";
import styles from "../styles.module.css";
const LangSelector = () => {
  const { selectedLang, setSelectedLang } = useLanguage();

  useEffect(() => {
    const div = document.getElementById("langBg");
    console.log(selectedLang);

    switch (selectedLang) {
      case "fr":
        div.style.backgroundImage = `url(${fr})`;
        break;
      case "en":
        div.style.backgroundImage = `url(${en})`;
        break;
    }
  }, [selectedLang]);

  const handleSelectChange = (e) => {
    setSelectedLang(e.target.value);
  };

  return (
    <div id="langBg" className={styles.language}>
      <img src={selectedLang === "fr" ? fr : en} alt="" />
      <select
        id="backgroundSelector"
        value={selectedLang}
        onChange={handleSelectChange}
        className=" outline-none rounded text-sm font-bold w-[35px] pl-2  appearance-none "
        style={{ backgroundColor: "#00000000" }}
      >
        <option value="fr">fr</option>
        <option value="en">en</option>
      </select>
    </div>
  );
};

export default LangSelector;
