import Region from "../components/Region";
import SearchBar from "../components/SearchBar";
import Sort from "../components/Sort";
import Status from "../components/Status"
import useSortAndFilter from "../hooks/useSortAndFilter";

const CountryRanking = () => {
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

  if (isLoading) return <div>Loading countries...</div>;
  if (isError) return <div>Error loading countries. Please try again.</div>;

  return (
    <>
      <section className="bg-black text-white">
        <div className="flex justify-between">
        <p>Found {filteredCountries.length} countries</p>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <Sort setSortBy={setSortBy}/>
            <Region setSelectedRegions={setSelectedRegions}/>
            <Status setUnMember={setUnMember} />
          </div>
          <table>
            <thead>
              <tr className="border-b border-gray">
                <th>Flag</th>
                <th>Name</th>
                <th>Population</th>
                <th>Area (km²)</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries.map((country) => (
                <tr key={country.name.common}>
                  <td>
                    <img
                      src={country.flags.png}
                      alt={`${country.name.common} flag`}
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{country.name.common}</td>
                  <td>{country.population.toLocaleString()}</td>
                  <td>{country.area.toLocaleString()}</td>
                  <td>{country.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default CountryRanking;