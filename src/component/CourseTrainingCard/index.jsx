import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect } from "react";
import axios from "axios";

const CourseTrainingCard = ({
  id,
  thumbnail,
  title,
  category,
  price,
  level,
  rating,
  type,
}) => {
  const [currency, setCurrency] = useState(null);
  const [error, setError] = useState(null);
  const currencies = {
  "Algeria": { currency: "Algerian dinar", code: "DZD" },
  "Belgium": { currency: "Euro", code: "EUR" },
  "Canada": { currency: "Canadian dollar", code: "CAD" },
  "France": { currency: "Euro", code: "EUR" },
  "Germany": { currency: "Euro", code: "EUR" },
  "Morocco": { currency: "Moroccan dirham", code: "MAD" }, 
  "Tunisia": { currency: "Tunisian dinar", code: "TND" },
  "Egypt": { currency: "Egyptian pound", code: "EGP" },
  "United Kingdom": { currency: "Pound sterling", code: "GBP" },
  "United States": { currency: "United States dollar", code: "USD" },
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
      
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ip = ipResponse.data.ip; 
        const countryResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
        const country = countryResponse.data.country_name;
        const currencyData = currencies[country];

        if (currencyData) {
          setCurrency(currencyData);
        } else {
          setError('Monnaie non trouvée pour ce pays');
        }
      } catch (err) {
        setError('Erreur lors de la récupération des données');
        console.error(err);
      }
    };

    fetchCurrency();
  }, []);
  return (
    <Link to={`/${type}/${id}`} key={id}>
      <div key={id} className={styles.container}>
        <img
          src={`${process.env.REACT_APP_API}${thumbnail}`}
          className={styles.image}
          alt=""
        />

        <div className={styles.content}>
          <div className={styles.text}>
            <p>{category}</p>
            <p>{price} {currency?.code}</p>
          </div>

          <div className={styles.title}>
            <p>{level}</p>
            <p>{title}</p>
          </div>

          {/* <div className={styles.rating}>
            <span>⭐ {rating} (750)</span>
            <div className={styles.stars}>
              <div className={styles.avatarGroup}>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt=""
                />
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt=""
                />
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt=""
                />
              </div>
              <span>3k+</span>
            </div>
          </div> */}

          <div className={styles.type}>
            <img src="./images/home/type.png" alt="" />
          </div>
          <button>+</button>
        </div>
      </div>
    </Link>
  );
};

export default CourseTrainingCard;
