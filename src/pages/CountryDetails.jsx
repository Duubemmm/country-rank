import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {fetchCountryByCode,fetchCountriesByCodes } from "../api/countrydetailsapi";
import DetailBox from "../components/DetailBox";

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
        const countryData = await fetchCountryByCode(cca2);
        setCountry(countryData);

        if (countryData.borders && countryData.borders.length > 0) {
          const borders = await fetchCountriesByCodes(countryData.borders);
          setBorderCountries(borders);
        } else {
          setBorderCountries([]);
        }
      } catch (err) {
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
        <p className="text-xl animate-pulse">Loading country details...</p>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center flex-col gap-4 p-6 text-center">
        <p className="text-xl text-red-500">
          {error || "No country data found"}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <section className="bg-black text-white min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          <span>←</span> Back
        </button>

        {/* Main Section: Column on mobile, Row on md+ */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
          {/* Flag Container */}
          <div className="w-full lg:w-1/2">
            <img
              src={country.flags.svg || country.flags.png}
              alt={`${country.name.common} flag`}
              className="w-full h-auto max-h-64 sm:max-h-96 object-cover rounded-xl shadow-2xl border border-zinc-800"
            />
          </div>

          {/* Info Container */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              {country.name.common}
            </h1>
            <p className="text-lg text-zinc-500 mb-8">
              {country.name.official}
            </p>

            {/* Details Grid: Stacks on small, 2 cols on md */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <DetailBox label="Capital" value={country.capital?.[0]} />
              <DetailBox
                label="Population"
                value={country.population.toLocaleString()}
              />
              <DetailBox label="Region" value={country.region} />
              <DetailBox label="Subregion" value={country.subregion} />
              <DetailBox
                label="Area"
                value={`${country.area.toLocaleString()} km²`}
              />
              <DetailBox
                label="Languages"
                value={
                  country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"
                }
              />
            </div>
          </div>
        </div>

        {/* Neighbors Section */}
        <div className="mt-12 pt-8 border-t border-zinc-900">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            Neighboring Countries
            {borderCountries.length > 0 && (
              <span className="text-zinc-600 text-lg font-normal">
                ({borderCountries.length})
              </span>
            )}
          </h2>

          {borderCountries.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {borderCountries.map((border) => (
                <button
                  key={border.cca3}
                  onClick={() => handleBorderClick(border.cca3)}
                  className="group bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl hover:bg-zinc-800 transition-all text-left"
                >
                  <img
                    src={border.flags.png}
                    alt={border.name.common}
                    className="w-full h-24 object-cover rounded-lg mb-3 group-hover:opacity-80 transition-opacity"
                  />
                  <p className="font-semibold text-sm sm:text-base truncate">
                    {border.name.common}
                  </p>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">
                    {border.cca3}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 italic py-4 bg-zinc-900/30 rounded-lg text-center">
              This country has no land borders.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CountryDetails;