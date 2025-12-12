// export default async function fetchCountriesData(nameOfCountry, population, flag, region, area) {
//   const params = {
//     name: nameOfCountry,
//     population,
//     region,
//     area
//   };
//   const COUNTRIES_URL = `https://restcountries.com/v3.1/all?fields=${params}`;
  
//   const response = await fetch(COUNTRIES_URL);
//   const responseData = await response.json();
//   return responseData;
// }

// export default async function fetchCountry(){
// const COUNTRY_URL = ``;
// const response = await fetch(COUNTRY_URL)
// }

// export default async function fetchNeighboringCountry(){
// const NEIGHBORINGCOUNTRY_URL = ``;
// const response = await fetch(NEIGHBORINGCOUNTRY_URL)
// }

/**
 * Fetches data for all countries from the restcountries API, 
 * requesting only the essential fields for your table display.
 * * @returns {Promise<Array<Object>>} A promise that resolves to an array of country objects.
 */
export default async function fetchCountriesData() {
  // 1. Define the specific fields you need for your table.
  // The API uses 'name', 'population', 'area', 'region', and 'flags' (for the image/flag data).
  const requiredFields = ['name', 'population', 'area', 'region', 'flags'];
  
  // 2. Join the fields into a comma-separated string for the API's 'fields' query parameter.
  const fieldsQuery = requiredFields.join(',');

  // 3. Construct the final API URL.
  // The structure for fetching all countries with specific fields is:
  // https://restcountries.com/v3.1/all?fields=field1,field2,...
  const COUNTRIES_URL = `https://restcountries.com/v3.1/all?fields=${fieldsQuery}`;
  
  try {
    // 4. Perform the fetch request.
    const response = await fetch(COUNTRIES_URL);

    // 5. Check if the response was successful (status code 200-299).
    if (!response.ok) {
      // Throw an error if the network request failed (e.g., 404 Not Found, 500 Server Error)
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 6. Parse the JSON data. This should be an array of country objects.
    const responseData = await response.json();
    
    // 7. Return the processed data.
    return responseData;

  } catch (error) {
    console.error("Could not fetch countries data:", error);
    // Return an empty array or re-throw the error depending on your application's error handling strategy
    return []; 
  }
}