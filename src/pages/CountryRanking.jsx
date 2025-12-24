import Region from "../components/Region";
import SearchBar from "../components/SearchBar";
import Sort from "../components/Sort";
import Status from "../components/Status";
import Pagination from "../components/Pagination";
import useSortAndFilter from "../hooks/useSortAndFilter";
import usePagination from "../hooks/usePagination";
import { useNavigate } from "react-router-dom";

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

  const {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    hasNextPage,
    hasPrevPage,
    startIndex,
    endIndex,
    totalItems,
  } = usePagination(filteredCountries, 20);

  const handleCountryClick = (country) => {
    navigate(`/country/${country.name.common}`);
  };

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading countries...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error loading countries. Please try again.</p>
      </div>
    );
  }

  return (
    <section className="bg-black text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Found {filteredCountries.length} countries
          </h1>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="flex gap-6">
          <aside className="w-64 flex flex-col gap-6">
            <Sort setSortBy={setSortBy} />
            <Region setSelectedRegions={setSelectedRegions} />
            <Status setUnMember={setUnMember} />
          </aside>
          <div className="flex-1">
            {filteredCountries.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-xl">No countries found matching your filters.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="p-3 text-left">Flag</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Population</th>
                        <th className="p-3 text-left">Area (km²)</th>
                        <th className="p-3 text-left">Region</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((country) => (
                        <tr
                          key={country.cca3 || country.name.common}
                          onClick={() => handleCountryClick(country)}
                          className="border-b border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors"
                        >
                          <td className="p-3">
                            <img
                              src={country.flags.png}
                              alt={`${country.name.common} flag`}
                              className="w-16 h-10 object-cover rounded shadow"
                            />
                          </td>
                          <td className="p-3 font-medium">{country.name.common}</td>
                          <td className="p-3">{country.population.toLocaleString()}</td>
                          <td className="p-3">{country.area.toLocaleString()}</td>
                          <td className="p-3">{country.region}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToPage={goToPage}
                  nextPage={nextPage}
                  prevPage={prevPage}
                  goToFirstPage={goToFirstPage}
                  goToLastPage={goToLastPage}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  totalItems={totalItems}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryRanking;