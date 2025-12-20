 export default async function fetchCountriesData() {
  const requiredFields = ['cca2', 'name', 'population', 'area', 'region', 'flags', 'subregion', 'independent', 'unMember'];
  const fieldsQuery = requiredFields.join(',');
  const COUNTRIES_URL = `https://restcountries.com/v3.1/all?fields=${fieldsQuery}`;
  
  try {
    const response = await fetch(COUNTRIES_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
        return responseData;

  } catch (error) {
    console.error("Could not fetch countries data:", error);
    return []; 
  }
}