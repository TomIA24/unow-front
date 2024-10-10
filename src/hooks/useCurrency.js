import { useEffect, useState } from 'react';
import axios from 'axios';

const useCurrency = () => {
  const [currency, setCurrency] = useState(null);
  const [error, setError] = useState(null);
  const token = process.env.TOKEN_API_LOCATION;
  const currencies = {
    "DZ": { currency: "Algerian dinar", code: "DZD" }, // Algeria
    "BE": { currency: "Euro", code: "EUR" },           // Belgium
    "CA": { currency: "Canadian dollar", code: "CAD" }, // Canada
    "FR": { currency: "Euro", code: "EUR" },           // France
    "DE": { currency: "Euro", code: "EUR" },           // Germany
    "MA": { currency: "Moroccan dirham", code: "MAD" }, // Morocco
    "TN": { currency: "Tunisian dinar", code: "TND" }, // Tunisia
    "EG": { currency: "Egyptian pound", code: "EGP" },  // Egypt
    "GB": { currency: "Pound sterling", code: "GBP" },   // United Kingdom
    "US": { currency: "United States dollar", code: "USD" }, // United States
  };
console.log("token",token,process.env.REACT_APP_API)
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const ipResponse = await axios.get(`https://ipinfo.io/json?token=${token}`);
        const country = ipResponse.data.country; // Récupère le code pays
        const currencyData = currencies[country];
console.log("currencyData",country)
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
  }, [token]); // Ajoute le token dans les dépendances

  return { currency, error };
};



export default useCurrency;