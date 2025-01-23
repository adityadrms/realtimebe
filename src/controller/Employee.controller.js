const {
  cretaeEmpService,
  getAllEmpService,
  getIdEmpService,
  updateEmpService,
  deleteEmpservice,
  loginEmployeeService,
  changePasswordService,
} = require("../service/employee.service");

const createEmpController = async (req, res, next) => {
  try {
    const employee = await cretaeEmpService(req.body);
    res
      .status(200)
      .json({ message: "employee created successfully.", data: employee });
  } catch (error) {
    next(error);
  }
};

const changePasswordController = async (req, res, next) => {
  const { employeeId } = req.params; // ID karyawan dari URL
  const { oldPassword, newPassword } = req.body; // Password lama dan baru dari body request

  try {
    const result = await changePasswordService({
      employeeId,
      oldPassword,
      newPassword,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error); // Kirim error ke middleware error handling
  }
};

const loginEmployeeController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginEmployeeService({ email, password });
    res.status(200).json({
      message: "Login successfully.",
      data: {
        token: token.token,
        employeeId: token.employeeId,
        role: token.role,
        companyId: token.companyId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllEmpController = async (req, res, next) => {
  try {
    const getAllEmp = await getAllEmpService();
    res
      .status(200)
      .json({ message: "employee retrieved successfully.", data: getAllEmp });
  } catch (error) {
    next(error);
  }
};

const getIdEmpController = async (req, res, next) => {
  const { employeeId } = req.params;
  try {
    const getIdEmp = await getIdEmpService(employeeId);
    res
      .status(200)
      .json({ message: "employee retrieved successfully.", data: getIdEmp });
  } catch (error) {
    next(error);
  }
};

const updateEmpController = async (req, res, next) => {
  const { employeeId } = req.params;
  const { employee, companyId } = req.body;

  try {
    const updatedEmp = await updateEmpService({
      employee,
      employeeId,
      companyId,
    });
    res
      .status(200)
      .json({ message: "employee updated successfully.", data: updatedEmp });
  } catch (error) {
    next(error);
  }
};

const deleteEmpController = async (req, res, next) => {
  const { employeeId } = req.params;

  try {
    const deleteEmp = await deleteEmpservice(employeeId);
    res
      .status(200)
      .json({ message: "employee deleted successfully.", data: deleteEmp });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmpController,
  getAllEmpController,
  getIdEmpController,
  updateEmpController,
  deleteEmpController,
  loginEmployeeController,
  changePasswordController,
};
