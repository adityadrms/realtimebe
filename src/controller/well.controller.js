const {
  createWellService,
  getAllWellService,
  getIdWellService,
  updateWellService,
  deleteWellservice,
  getByCompanyIdWellService,
  getPublicAllWellService,
} = require("../service/well.service");

const createWellController = async (req, res, next) => {
  try {
    const well = await createWellService(req.body);
    res.status(200).json({ message: "Well created successfully.", data: well });
  } catch (error) {
    next(error);
  }
};

const getAllWellController = async (req, res, next) => {
  try {
    const getAllWellController = await getAllWellService();
    res.status(200).json({
      message: "Well retrieved successfully.",
      data: getAllWellController,
    });
  } catch (error) {
    next(error);
  }
};

const getIdWellController = async (req, res, next) => {
  const { wellId } = req.params;
  try {
    const getIdWell = await getIdWellService(wellId);
    res
      .status(200)
      .json({ message: "Well retrieved successfully.", data: getIdWell });
  } catch (error) {
    next(error);
  }
};

const getByCompanyIdWellController = async (req, res, next) => {
  const { companyId } = req.params;

  try {
    const wells = await getByCompanyIdWellService(companyId);
    res
      .status(200)
      .json({ message: "Wells retrieved successfully.", data: wells });
  } catch (error) {
    next(error);
  }
};

const updateWellController = async (req, res, next) => {
  const { wellId } = req.params;
  const { well, placeId } = req.body;

  try {
    const updatedWell = await updateWellService({ well, wellId, placeId });
    res
      .status(200)
      .json({ message: "Well updates successfully.", data: updatedWell });
  } catch (error) {
    next(error);
  }
};

const deteleWellController = async (req, res, next) => {
  const { wellId } = req.params;

  try {
    const deleteWell = await deleteWellservice(wellId);
    res
      .status(200)
      .json({ message: "Well deleted successfully.", data: deleteWell });
  } catch (error) {
    next(error);
  }
};

const getPublicAllWellController = async (req, res) => {
  try {
    const wells = await getAllWellService();

    const response = wells.map((well) => ({
      id: well.id,
      name: well.name,
      companyName: well.place?.company?.name || null,
    }));

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error in getAllWellController:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch well data",
    });
  }
};

module.exports = {
  createWellController,
  getAllWellController,
  getIdWellController,
  updateWellController,
  deteleWellController,
  getByCompanyIdWellController,
  getPublicAllWellController,
};
