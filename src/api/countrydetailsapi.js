export const fetchCountryByCode = async (cca2) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca2}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch country: ${response.status}`);
    }
    
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching country:", error);
    throw error;
  }
};

export const fetchCountriesByCodes = async (codes) => {
  if (!codes || codes.length === 0) {
    return [];
  }
  
  try {
    const codesString = codes.join(',');
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codesString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching border countries:", error);
    return [];
  }
};