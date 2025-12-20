import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCountryByCode, fetchCountriesByCodes } from "../api/countrydetailsapi";

const CountryDetails = () => {
  const { cca2 } = useParams();
  const navigate = useNavigate();
  
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountryData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Fetching country with code:", cca2);
        
        // Step 1: Fetch the main country data
        const countryData = await fetchCountryByCode(cca2);
        console.log("Country data received:", countryData);
        setCountry(countryData);

        // Step 2: Fetch border countries if they exist
        if (countryData.borders && countryData.borders.length > 0) {
          console.log("Fetching border countries:", countryData.borders);
          const borders = await fetchCountriesByCodes(countryData.borders);
          console.log("Border countries received:", borders);
          setBorderCountries(borders);
        } else {
          console.log("No border countries");
          setBorderCountries([]);
        }
      } catch (err) {
        console.error("Error loading country data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (cca2) {
      loadCountryData();
    }
  }, [cca2]);

  const handleBorderClick = (borderCode) => {
    navigate(`/country/${borderCode}`);
  };

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading country details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-xl text-red-500">Error: {error}</p>
        <button 
          onClick={() => navigate('/countries')}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Back to Countries
        </button>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl">No country data found</p>
      </div>
    );
  }

  return (
    <section className="bg-black text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
        >
          ← Back
        </button>

        {/* Country Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <img
            src={country.flags.svg || country.flags.png}
            alt={`${country.name.common} flag`}
            className="w-full md:w-96 h-64 object-cover rounded-lg shadow-lg"
          />
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{country.name.common}</h1>
            <p className="text-xl text-gray-400 mb-6">{country.name.official}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Capital</p>
                <p className="text-lg">{country.capital?.[0] || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-gray-400">Population</p>
                <p className="text-lg">{country.population.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-gray-400">Region</p>
                <p className="text-lg">{country.region}</p>
              </div>
              
              <div>
                <p className="text-gray-400">Subregion</p>
                <p className="text-lg">{country.subregion || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-gray-400">Area</p>
                <p className="text-lg">{country.area.toLocaleString()} km²</p>
              </div>
              
              <div>
                <p className="text-gray-400">Languages</p>
                <p className="text-lg">
                  {country.languages 
                    ? Object.values(country.languages).join(', ')
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Neighboring Countries Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Neighboring Countries
            {borderCountries.length > 0 && (
              <span className="text-gray-400 text-lg ml-2">
                ({borderCountries.length})
              </span>
            )}
          </h2>
          
          {borderCountries.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {borderCountries.map((border) => (
                <button
                  key={border.cca3}
                  onClick={() => handleBorderClick(border.cca3)}
                  className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors text-left"
                >
                  <img
                    src={border.flags.png}
                    alt={`${border.name.common} flag`}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                  <p className="font-semibold">{border.name.common}</p>
                  <p className="text-sm text-gray-400">{border.cca3}</p>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">This country has no land borders.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CountryDetails;