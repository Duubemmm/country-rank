import { useState, useEffect, useMemo } from "react";
import fetchCountriesData from "../api/countryapi";

const useSortAndFilter = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [sortBy, setSortBy] = useState("population");
  const [unMember, setUnMember] = useState(false); 

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCountriesData();
        setAllCountries(data);
      } catch (err) {
        console.error(err)
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    let result = [...allCountries];

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.name.common.toLowerCase().includes(query) ||
        c.region.toLowerCase().includes(query) ||
        (c.subregion && c.subregion.toLowerCase().includes(query))
      );
    }

    if (selectedRegions.length > 0) {
      result = result.filter(c => selectedRegions.includes(c.region));
    }

    if (unMember) {
      result = result.filter(c => c.unMember === true);
    }

    result.sort((a, b) => {
      if (sortBy === "population") return b.population - a.population;
      if (sortBy === "area") return b.area - a.area;
      if (sortBy === "name") return a.name.common.localeCompare(b.name.common);
      return 0;
    });

    return result;
  }, [allCountries, searchTerm, selectedRegions, sortBy, unMember]);

  return {
    filteredCountries,
    searchTerm, setSearchTerm,
    setSelectedRegions,
    setSortBy,
    setUnMember,
    isLoading,
    isError
  };
};
export default useSortAndFilter;