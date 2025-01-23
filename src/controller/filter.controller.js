const {
  updateFilterService,
  getFilterService,
  getAllFiltersService,
} = require("../service/filter.service");

const updateFilterController = async (req, res, next) => {
  const { wellId } = req.params;
  const { filter } = req.body;

  try {
    const updatedFilter = await updateFilterService({ wellId, filter });
    res
      .status(200)
      .json({ message: "Filter updated successfully.", data: updatedFilter });
  } catch (error) {
    next(error);
  }
};

const getFilterController = async (req, res, next) => {
  const { wellId } = req.params;

  try {
    const filter = await getFilterService(wellId);
    res.status(200).json({
      message: "Filter retrieved successfully.",
      data: filter,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFiltersController = async (req, res, next) => {
  try {
    const filters = await getAllFiltersService();
    res.status(200).json({
      message: "Filters retrieved successfully.",
      data: filters,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateFilterController,
  getFilterController,
  getAllFiltersController,
};
