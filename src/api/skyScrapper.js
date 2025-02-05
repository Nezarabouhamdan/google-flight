const API_KEY = "394bb0d055mshd7cee20cac05a53p18aef2jsnd61fb0229055";
const API_HOST = "sky-scrapper.p.rapidapi.com";
const API_URL =
  "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights";

export const getSkyId = async (query) => {
  try {
    const response = await fetch(
      `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`,
      {
        headers: {
          "x-rapidapi-host": API_HOST,
          "x-rapidapi-key": API_KEY,
        },
      }
    );

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching SkyId:", error);
    return [];
  }
};
export const fetchFlights = async ({
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  date,
  returnDate = "",
  adults = 1,
  infants = "",
  childrens = "",
  cabinClass = "economy",
  journeyType = "one_way",
  currency = "USD",
}) => {
  try {
    const params = new URLSearchParams({
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      ...(returnDate && { returnDate }),
      ...(adults && { adults }),
      ...(childrens && { childrens }),
      ...(infants && { infants }),
      ...(cabinClass && { cabinClass }),
      ...(journeyType && { journeyType }),
      ...(currency && { currency }),
    });

    const url = `${API_URL}?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    return null;
  }
};
