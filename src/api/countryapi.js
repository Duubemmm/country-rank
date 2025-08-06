const fetchCountryData = async () => {
  let result = [];

  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=cca2,name,population,area,region,subregion,independent,unMember"
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    result = await response.json();

  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      console.log(error.message);
    } else {
      console.error("Unknown error", error);
    }
  }

  return result;
};

export default fetchCountryData;
