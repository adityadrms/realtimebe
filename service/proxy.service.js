const axios = require("axios");

const fetchRealTimeDataService = async ({ token, timeStart, timeEnd }) => {
  try {
    const data = JSON.stringify({
      token,
      timeStart,
      timeEnd,
    });

    const response = await axios({
      method: "GET",
      url: "https://pdumitradome.id/dome_api/realtime-data",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    return response.data;
  } catch (error) {
    console.error("API Response Data:", error.response?.data);
    throw new Error("Failed to fetch data from external API");
  }
};

module.exports = {
  fetchRealTimeDataService,
};
