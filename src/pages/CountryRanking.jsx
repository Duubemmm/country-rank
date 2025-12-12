import fetchCountriesData from "../api/countryapi"
import { useState, useEffect } from "react"
import Region from "../components/Region"
import SearchBar from "../components/SearchBar"
import Sort from "../components/Sort"

const CountryRanking = () => {
  const [isLoading, setIsLoading] = useState(true)  
  const [isError, setIsError] = useState(false)    
  const [displayCountries, setDisplayCountries] = useState([])  

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true)
        setIsError(false)
        const countriesData = await fetchCountriesData()
        setDisplayCountries(countriesData)
      } catch (error) {
        console.error("Error fetching countries:", error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getCountries()  
  }, [])  

  if (isLoading) return <div>Loading countries...</div>
  if (isError) return <div>Error loading countries. Please try again.</div>

  return (
    <>
      <section className="bg-lightgray text-white">
        <SearchBar countries={displayCountries} setDisplayCountries={setDisplayCountries} />
        <Region countries={displayCountries} setDisplayCountries={setDisplayCountries} />
        <Sort countries={displayCountries} setDisplayCountries={setDisplayCountries} />
        <table>
          <thead>
            <tr>
              <th>Flag</th>
              <th>Name</th>
              <th>Population</th>
              <th>Area (km²)</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {displayCountries.map((country) => (
          <tr key={country.name.common}>
            <td>
              <img src={country.flags.png} alt={`${country.name.common} flag`} style={{ width: '50px' }} />
            </td>
            <td>{country.name.common}</td>
            <td>{country.population.toLocaleString()}</td>
            <td>{country.area.toLocaleString()}</td>
            <td>{country.region}</td>
          </tr>
        ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default CountryRanking
