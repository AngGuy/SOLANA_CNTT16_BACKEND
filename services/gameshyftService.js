const fetch = require("node-fetch");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.gameshift.dev/nx";

// Hàm helper gọi API Gameshyft
const callGameshyftAPI = async (endpoint, method, body) => {
  const options = {
    method,
    headers: {
      accept: "application/json",
      "x-api-key": API_KEY,
      "content-type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await response.json();
  return data;
};

module.exports = { callGameshyftAPI };
