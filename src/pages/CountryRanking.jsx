import { useState, useEffect, useMemo } from "react";
import "flag-icons/css/flag-icons.min.css";
import fetchCountryData from "../api/countryapi";
import SearchIcon from "../assets/Search.svg";
import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate
const regionList = [
  "Americas",
  "Antarctic",
  "Africa",
  "Asia",
  "Europe",
  "Oceania",
];

const CountryRanking = ({ className = "" }) => {
  const navigate = useNavigate(); // 👈 Get the navigate function
  const [rawCountries, setRawCountries] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: "",
    region: "",
    isUnMember: false,
    isIndependent: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading"); // Set status to loading before the fetch.
      try {
        const countryData = await fetchCountryData();
        setRawCountries(countryData);
        setStatus("succeeded"); // Set status to succeeded on success.
      } catch (err) {
        console.error("Failed to fetch country data:", err);
        setError("Could not load country data. Please try again later.");
        setStatus("failed"); // Set status to failed on error.
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount.

  const displayCountries = useMemo(() => {
    return rawCountries
      .filter((country) => {
        // Filter 1: Search Term (checks common and official names)
        const searchTermLower = filters.searchTerm.toLowerCase();
        return (
          country.name.common.toLowerCase().includes(searchTermLower) ||
          country.name.official.toLowerCase().includes(searchTermLower)
        );
      })
      .filter((country) => {
        // Filter 2: Region
        return filters.region ? country.region === filters.region : true;
      })
      .filter((country) => {
        // Filter 3: UN Member
        return filters.isUnMember ? country.unMember === true : true;
      })
      .filter((country) => {
        // Filter 4: Independent
        return filters.isIndependent ? country.independent === true : true;
      })
      .sort((a, b) => b.population - a.population); // Finally, sort the filtered results.
  }, [rawCountries, filters]); // Recalculate only when raw data or filters change.

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegionChange = (region) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      // If the same region is clicked again, clear the filter.
      region: prevFilters.region === region ? "" : region,
    }));
  };
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "N/A";
    return num.toLocaleString("en-US");
  };
  return (
    <section
      className={`bg-[#1B1D1F] text-white shadow-2xl rounded-lg w-full max-w-6xl mx-auto flex flex-col p-4 sm:p-6 ${className}`}
    >
      <header className="mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <p className="text-[#D2D5DA] font-bold text-lg">
            Found {displayCountries.length} countries
          </p>
          <div className="relative w-full sm:w-72">
            <label htmlFor="search-input" className="sr-only">
              Search by Name, Region, Subregion...
            </label>
            <img
              src={SearchIcon}
              alt="Search Icon"
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            />
            <input
              id="search-input"
              aria-label="Search by Name,Region,Subregion..."
              name="searchTerm"
              type="search"
              placeholder="Search by Name..."
              value={filters.searchTerm}
              onChange={handleFilterChange}
              className="bg-[#282B30] text-[#D2D5DA] w-full rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-300 mr-4">Region:</span>
            {regionList.map((region) => (
              <button
                key={region}
                onClick={() => handleRegionChange(region)}
                className={`px-3 py-1 rounded-md text-sm mr-2 mb-2 transition-colors ${
                  filters.region === region
                    ? "bg-[#6C727F] text-white font-semibold"
                    : "bg-[#282B30] hover:bg-[#282B30]"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                id="unMember"
                name="isUnMember"
                checked={filters.isUnMember}
                onChange={handleFilterChange}
                className="h-4 w-4 rounded"
              />
              <label htmlFor="unMember" className="text-sm cursor-pointer">
                Member of UN
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                id="independent"
                name="isIndependent"
                checked={filters.isIndependent}
                onChange={handleFilterChange}
                className="h-4 w-4 rounded"
              />
              <label htmlFor="independent" className="text-sm cursor-pointer">
                Independent
              </label>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-auto rounded-lg">
        {status === "loading" && (
          <p className="text-center p-8">Loading countries...</p>
        )}
        {status === "failed" && (
          <p className="text-center text-red-500 p-8">{error}</p>
        )}
        {status === "succeeded" && (
          <table className="w-full text-left text-sm table-auto">
            <caption className="sr-only">
              A table of countries sorted by population, with details on area
              and region.
            </caption>
            <thead className="bg-[#282B30] sticky top-0 z-10">
              <tr>
                {/* <th scope="col" className="p-3 w-[5%] text-center font-semibold">#</th> */}
                <th scope="col" className="p-3 w-[5%] font-semibold">
                  Flag
                </th>
                <th scope="col" className="p-3 w-[30%] font-semibold">
                  Name
                </th>
                <th scope="col" className="p-3 w-[20%] font-semibold">
                  Population
                </th>
                <th scope="col" className="p-3 w-[20%] font-semibold">
                  Area(km<sup>2</sup>)
                </th>
                <th scope="col" className="p-3 w-[20%] font-semibold">
                  Region
                </th>
              </tr>
            </thead>
            <tbody>
              {displayCountries.length > 0 ? (
                displayCountries.map((country) => (
                  <tr
                    key={country.cca2}
                    onClick={() =>
                      navigate(`/country/${country.cca2.toLowerCase()}`)
                    } // 👈 Navigate on click
                    onKeyDown={(e) => {
                      // 👈 Navigate on 'Enter' key press
                      if (e.key === "Enter") {
                        navigate(`/country/${country.cca2.toLowerCase()}`);
                      }
                    }}
                    className="border-b border-gray-700 hover:bg-[#2c2f35] transition-colors"
                    role="link" // 👈 Accessibility: Tells screen readers this row acts as a link
                    tabIndex="0" // 👈 Accessibility: Makes the row focusable with the keyboard
                  >
                    {/* <td className="p-3 text-center font-medium text-gray-400">{index + 1}</td> use index in the mapping */}
                    <td className="p-3">
                      <span
                        className={`fi fi-${country.cca2.toLowerCase()} rounded-sm`}
                        title={country.name.common}
                      ></span>
                    </td>
                    <td className="p-3 font-bold">{country.name.common}</td>
                    <td className="p-3 font-mono text-cyan-400">
                      {formatNumber(country.population)}
                    </td>
                    <td className="p-3 font-mono">
                      {formatNumber(country.area)}
                    </td>
                    <td className="p-3 text-gray-300">{country.region}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-400">
                    No countries match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default CountryRanking;
