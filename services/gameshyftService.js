const callGameshiftAPI = async (endpoint, method = "GET", body = null) => {
  const url = `https://api.gameshift.dev${endpoint}`;
  const options = {
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      console.error("API Error:", response.status, data);
      throw new Error(data.error || "API request failed");
    }
    return data;
  } catch (err) {
    console.error("Error calling Gameshift API:", err);
    throw err;
  }
};
