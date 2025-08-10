import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";

// ✅ 1. Create specific API functions for clarity and correctness.
// This function fetches a SINGLE country by its code.
const fetchCountryByCode = async (code) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!response.ok) throw new Error("Country not found");
  // The API returns an array with one object, so we return just the object.
  const data = await response.json();
  return data[0]; 
};

// This function fetches MULTIPLE countries from an array of codes.
const fetchCountriesByCodes = async (codes) => {
  if (!codes || codes.length === 0) return [];
  const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}`);
  if (!response.ok) throw new Error("Could not fetch border countries");
  return response.json();
};


const CountryDetails = () => {
  const { cca2 } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const loadCountryData = async () => {
      try {
        setStatus("loading");
        
        // ✅ 2. Fetch the country object directly, without array destructuring.
        const countryData = await fetchCountryByCode(cca2);
        setCountry(countryData);

        // ✅ 3. Use the second API function to get border countries.
        if (countryData.borders && countryData.borders.length > 0) {
          const borders = await fetchCountriesByCodes(countryData.borders);
          setBorderCountries(borders);
        } else {
          setBorderCountries([]); // Ensure borders are reset if there are none
        }

        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
        console.error("Failed to load country data:", error);
      }
    };

    // Only fetch if cca2 is present
    if (cca2) {
      loadCountryData();
    }
  }, [cca2]);

  // The rest of your component is perfect and needs no changes.
  const formatNumber = (num) => (num ? num.toLocaleString("en-US") : "N/A");

  if (status === "loading") return <p className="text-center text-white text-xl p-8">Loading details...</p>;
  if (status === "failed") return <p className="text-center text-red-500 text-xl p-8">Could not load country data.</p>;
  
  return (
    <section className="bg-[#1B1D1F]">
      <div className="max-w-4xl mx-auto text-white p-4">
        <button onClick={() => navigate(-1)} className="mb-8 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          &larr; Back
        </button>
        {country && (
          <div className="flex flex-col">
            <div className="flex justify-center items-center">
              <span className={`fi fi-${country.cca2.toLowerCase()} text-[200px] rounded-md`}></span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">{country.name.common}</h1>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <p><strong>Native Name:</strong> {Object.values(country.name.nativeName || {})[0]?.common}</p>
                <p><strong>Population:</strong> {formatNumber(country.population)}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Sub Region:</strong> {country.subregion}</p>
                <p><strong>Capital:</strong> {country.capital?.join(", ")}</p>
                <p><strong>Area:</strong> {formatNumber(country.area)} km²</p>
                <p><strong>Top Level Domain:</strong> {country.tld?.join(", ")}</p>
                <p><strong>Currencies:</strong> {Object.values(country.currencies || {}).map((c) => c.name).join(", ")}</p>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-3">Neighboring Countries:</h2>
                <div className="flex flex-wrap gap-3">
                  {borderCountries.length > 0 ? (
                    borderCountries.map((border) => (
                      <Link key={border.cca2} to={`/country/${border.cca2.toLowerCase()}`} className="bg-[#282B30] px-3 py-1 rounded shadow-md hover:bg-gray-600 transition-colors">
                        {border.name.common}
                      </Link>
                    ))
                  ) : (
                    <p>No neighboring countries.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CountryDetails;