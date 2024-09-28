import axios from "axios";

export const getUserData = async (limit = 5) => {
  const options = {
    method: "GET",
    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=${limit}`,
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    return error;
  }
};
