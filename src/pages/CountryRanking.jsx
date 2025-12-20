import Region from "../components/Region";
import SearchBar from "../components/SearchBar";
import Sort from "../components/Sort";
import Status from "../components/Status"
import useSortAndFilter from "../hooks/useSortAndFilter";
import { useNavigate } from "react-router-dom"

const CountryRanking = () => {
  const navigate = useNavigate();
  
  const { 
    filteredCountries, 
    searchTerm, 
    setSearchTerm, 
    setSelectedRegions, 
    setSortBy,
    setUnMember, 
    isLoading,
    isError
  } = useSortAndFilter();

  const handleCountryClick = (country) => {
    navigate(`/country/${country.cca2}`);
  };

  if (isLoading) return <div className="text-white p-8">Loading countries...</div>;
  if (isError) return <div className="text-white p-8">Error loading countries. Please try again.</div>;

  return (
    <section className="bg-black text-white min-h-screen p-4">
      <div className="flex justify-between mb-4">
        <p>Found {filteredCountries.length} countries</p>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <Sort setSortBy={setSortBy}/>
          <Region setSelectedRegions={setSelectedRegions}/>
          <Status setUnMember={setUnMember} />
        </div>
        <table className="flex-1">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">Flag</th>
              <th className="p-2">Name</th>
              <th className="p-2">Population</th>
              <th className="p-2">Area (km²)</th>
              <th className="p-2">Region</th>
            </tr>
          </thead>
          <tbody>
            {filteredCountries.map((country) => (
              <tr 
                key={country.cca2}
                onClick={() => handleCountryClick(country)}
                className="border-b border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors"
              >
                <td className="p-2">
                  <img
                    src={country.flags.png}
                    alt={`${country.name.common} flag`}
                    className="w-12 h-8 object-cover"
                  />
                </td>
                <td className="p-2">{country.name.common}</td>
                <td className="p-2">{country.population.toLocaleString()}</td>
                <td className="p-2">{country.area.toLocaleString()}</td>
                <td className="p-2">{country.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CountryRanking;