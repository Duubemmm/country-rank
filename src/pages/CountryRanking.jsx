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
    isError,
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
    navigate(`/country/${country.cca2}`);
  };

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading countries...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
        <p className="text-xl text-red-500 text-center">
          Error loading countries. Please try again.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-black text-white min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section: Stacks on mobile */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-xl md:text-2xl font-bold">
            Found {filteredCountries.length} countries
          </h1>
          <div className="w-full md:w-auto">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>

        {/* Main Content: Sidebar moves to top on mobile */}
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex flex-col gap-6 bg-zinc-900/50 p-4 rounded-xl lg:bg-transparent lg:p-0">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 lg:hidden">
              Filters & Sort
            </h2>
            <Sort setSortBy={setSortBy} />
            <Region setSelectedRegions={setSelectedRegions} />
            <Status setUnMember={setUnMember} />
          </aside>

          <div className="flex-1 w-full overflow-hidden">
            {filteredCountries.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-xl">
                  No countries found matching your filters.
                </p>
              </div>
            ) : (
              <>
                {/* Horizontal Scroll Wrapper for the table */}
                <div className="overflow-x-auto rounded-lg border border-gray-800">
                  <table className="w-full border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-gray-700 bg-zinc-900/30">
                        <th className="p-4 text-left text-sm text-gray-400">
                          Flag
                        </th>
                        <th className="p-4 text-left text-sm text-gray-400">
                          Name
                        </th>
                        <th className="p-4 text-left text-sm text-gray-400">
                          Population
                        </th>
                        <th className="p-4 text-left text-sm text-gray-400">
                          Area (km²)
                        </th>
                        <th className="p-4 text-left text-sm text-gray-400">
                          Region
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((country) => (
                        <tr
                          key={country.cca2 || country.name.common}
                          onClick={() => handleCountryClick(country)}
                          className="border-b border-gray-800 cursor-pointer hover:bg-zinc-900 transition-colors"
                        >
                          <td className="p-4">
                            <img
                              src={country.flags.png}
                              alt={`${country.name.common} flag`}
                              className="w-12 h-8 md:w-16 md:h-10 object-cover rounded shadow-sm"
                            />
                          </td>
                          <td className="p-4 font-medium text-sm md:text-base">
                            {country.name.common}
                          </td>
                          <td className="p-4 text-sm">
                            {country.population.toLocaleString()}
                          </td>
                          <td className="p-4 text-sm">
                            {country.area.toLocaleString()}
                          </td>
                          <td className="p-4 text-sm text-gray-400">
                            {country.region}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryRanking;