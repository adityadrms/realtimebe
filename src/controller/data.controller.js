const { fetchRealTimeDataService } = require("../service/proxy.service");

const fetchRealTimeDataController = async (req, res, next) => {
  try {
    const { token, timeStart, timeEnd } = req.body; // Ambil data dari body request

    const data = await fetchRealTimeDataService({ token, timeStart, timeEnd });

    res.status(200).json({
      message: "Data fetched successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchRealTimeDataController,
};
