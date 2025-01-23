const {
  getAllNotificationService,
  getIdNotificationService,
  getAllRecordService,
  getIdRecordService
} = require("../service/notification.service");


const getAllNtfController = async (req, res, next) => {
  try {
    const getAllNtf = await getAllNotificationService();
    res.status(200).json({
      message: "notification retrieved successfully.",
      data: getAllNtf,
    });
  } catch (error) {
    next(error);
  }
};

const getIdNtfController = async (req, res, next) => {
  const { notificationId } = req.params;

  try {
    const getIdNtf = await getIdNotificationService(notificationId);
    res.status(200).json({
      message: "notification retrieved successfully.",
      data: getIdNtf,
    });
  } catch (error) {
    next(error);
  }
};
const getAllRcdController = async (req, res, next) => {
  try {
    const getAllRcd = await getAllRecordService();
    res.status(200).json({
      message: "Record retrieved successfully.",
      data: getAllRcd,
    });
  } catch (error) {
    next(error);
  }
};

const getIdRcdController = async (req, res, next) => {
  const { recordId } = req.params;

  try {
    const getIdRcd = await getIdRecordService(recordId);
    res.status(200).json({
      message: "Record retrieved successfully.",
      data: getIdRcd,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNtfController,
  getIdNtfController,
  getAllRcdController,
  getIdRcdController
}