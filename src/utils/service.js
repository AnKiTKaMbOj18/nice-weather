import axios from "axios";

const endpoints = {
  testApi: "/api/test/users",
  currentWeather: "https://api.openweathermap.org/data/2.5/weather?q=amsterdam&appid="
};

export const getApiEndPointsFromStore = requestedKey => {
  if (!requestedKey) {
    return null;
  }
  return endpoints[requestedKey];
};

const ApiService = ({
  method = "GET",
  apiUrl,
  data,
  appendUrl = "",
  headers = {}
}) => {
  const url = getApiEndPointsFromStore(apiUrl) + appendUrl;
  return new Promise((resolve, reject) => {
    axios({ url, method, data, headers })
      .then(response => {
        resolve({ response });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default ApiService;
