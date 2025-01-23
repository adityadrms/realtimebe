const {
  createCmpService,
  getAllCmpService,
  getIdCmpService,
  updateCmpService,
  deleteCmpservice,
} = require("../service/company.service");

const createCmpController = async (req, res, next) => {
  try {
    const createCmp = await createCmpService(req.body);
    res.status(200).json({
      message: "Company created successfully.",
      data: createCmp,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCmpController = async (req, res, next) => {
  try {
    const getAllCmp = await getAllCmpService();
    res.status(200).json({
      message: "Companies retrieved successfully.",
      data: getAllCmp,
    });
  } catch (error) {
    next(error);
  }
};

const getIdCmpController = async (req, res, next) => {
  const { companyId } = req.params;

  try {
    const getIdCmp = await getIdCmpService(companyId);
    res.status(200).json({
      message: "Company retrieved successfully.",
      data: getIdCmp,
    });
  } catch (error) {
    next(error);
  }
};

const updateCmpController = async (req, res, next) => {
  const { companyId } = req.params;
  const { company } = req.body;

  try {
    const updateCmp = await updateCmpService({ company, companyId });
    res.status(200).json({
      message: "Company updated successfully.",
      data: updateCmp,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCmpController = async (req, res, next) => {
  const { companyId } = req.params;

  try {
    const deleteCmp = await deleteCmpservice(companyId);
    res.status(200).json({
      message: "Company deleted successfully.",
      data: deleteCmp,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCmpController,
  getAllCmpController,
  getIdCmpController,
  updateCmpController,
  deleteCmpController,
};
