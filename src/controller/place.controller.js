const {
  createPlaceService,
  getAllPlcService,
  getIdPlcService,
  updatePlcService,
  deletePlcservice,
} = require("../service/place.service");

const createPlcController = async (req, res, next) => {
  try {
    const place = await createPlaceService(req.body);
    res
      .status(200)
      .json({ message: "place created successfully.", data: place });
  } catch (error) {
    next(error);
  }
};

const getAllPlcController = async (req, res, next) => {
  try {
    const getAllPlcController = await getAllPlcService();
    res.status(200).json({
      message: "place retrieved successfully.",
      data: getAllPlcController,
    });
  } catch (error) {
    next(error);
  }
};

const getIdPlcController = async (req, res, next) => {
  const { placeId } = req.params;
  try {
    const getIdPlc = await getIdPlcService(placeId);
    res
      .status(200)
      .json({ message: "place retrieved successfully.", data: getIdPlc });
  } catch (error) {
    next(error);
  }
};

const updatePlcController = async (req, res, next) => {
  const { placeId } = req.params;
  const { place, companyId } = req.body;

  try {
    const updatedPlace = await updatePlcService({ place, companyId, placeId });
    res
      .status(200)
      .json({ message: "place updated successfully.", data: updatedPlace });
  } catch (error) {
    next(error);
  }
};

const deletePlcController = async (req, res, next) => {
  const { placeId } = req.params;

  try {
    const deletePlc = await deletePlcservice(placeId);
    res
      .status(200)
      .json({ message: "place deleted successfully.", data: deletePlc });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPlcController,
  getAllPlcController,
  getIdPlcController,
  updatePlcController,
  deletePlcController,
};
