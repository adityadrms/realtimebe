const { prismaClient } = require("../app/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  employeeValidation,
  updateEmployeeValidation,
  loginEmployeeValidation,
} = require("../validator/employee.validation");

const cretaeEmpService = async (data) => {
  const { employee, companyId } = data;

  if (employee && employee.length > 0) {
    for (const emp of employee) {
      const { error: employeeError } = employeeValidation.validate(emp);
      if (employeeError) {
        throw new Error(
          `employee validation failed: ${employeeError.details[0].message}`
        );
      }
      const existingEmployee = await prismaClient.employee.findUnique({
        where: { email: emp.email },
      });

      if (existingEmployee) {
        throw new Error(
          `Email ${emp.email} sudah digunakan oleh employee lain.`
        );
      }
    }
  }

  return await prismaClient.$transaction(async (prisma) => {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error(`employee with ID ${companyId} not found`);
    }
    const createdEmployees = [];
    for (const emp of employee) {
      const hashedPassword = await bcrypt.hash(emp.password, 10);
      const createdEmployee = await prisma.employee.create({
        data: {
          name: emp.name,
          email: emp.email,
          role: emp.role,
          password: hashedPassword,
          companyId: companyId,
        },
      });
      createdEmployees.push(createdEmployee);
    }
    return createdEmployees;
  });
};

const changePasswordService = async (data) => {
  const { employeeId, oldPassword, newPassword } = data;

  // Validasi input
  if (!employeeId || !oldPassword || !newPassword) {
    throw new Error(
      "Employee ID, old password, and new password are required."
    );
  }

  // Ambil data employee berdasarkan ID
  const employee = await prismaClient.employee.findUnique({
    where: { id: employeeId },
  });

  if (!employee) {
    throw new Error("Employee not found.");
  }

  // Verifikasi password lama
  const isOldPasswordValid = await bcrypt.compare(
    oldPassword,
    employee.password
  );
  if (!isOldPasswordValid) {
    throw new Error("Old password is incorrect.");
  }

  // Validasi password baru (contoh: minimal 8 karakter)
  // if (newPassword.length < 8) {
  //   throw new Error("New password must be at least 8 characters long.");
  // }

  // Hash password baru
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Update password di database
  const updatedEmployee = await prismaClient.employee.update({
    where: { id: employeeId },
    data: {
      password: hashedNewPassword,
    },
  });

  return {
    message: "Password changed successfully.",
    employeeId: updatedEmployee.id,
  };
};

const loginEmployeeService = async (data) => {
  const { error: employeeError } = loginEmployeeValidation.validate(data);
  if (employeeError) {
    throw new Error(
      `Login validation failed: ${employeeError.details[0].message}`
    );
  }

  const { email, password } = data;

  const employee = await prismaClient.employee.findUnique({
    where: { email },
    include: { company: true },
  });

  if (!employee) {
    throw new Error("Email tidak ditemukan.");
  }

  const isPasswordValid = await bcrypt.compare(password, employee.password);
  if (!isPasswordValid) {
    throw new Error("Password salah.");
  }

  const token = jwt.sign(
    { id: employee.id, email: employee.email, role: employee.role },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  return {
    token,
    employeeId: employee.id,
    role: employee.role,
    companyId: employee.companyId,
  };
};

//viewAll
const getAllEmpService = async () => {
  return await prismaClient.employee.findMany({});
};

// View Id
const getIdEmpService = async (employeeId) => {
  return await prismaClient.employee.findUnique({
    where: { id: employeeId },
  });
};

const updateEmpService = async (data) => {
  const { employee, employeeId, companyId } = data;

  const { error: employeeError } = updateEmployeeValidation.validate(employee);
  if (employeeError) {
    throw new Error(
      `Employee validation failed: ${employeeError.details[0].message}`
    );
  }

  return await prismaClient.$transaction(async (prisma) => {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    const existingEmployee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!existingEmployee || existingEmployee.companyId !== companyId) {
      throw new Error(
        `Employee with ID ${employeeId} not found or does not belong to the specified company`
      );
    }

    let hashedPassword = existingEmployee.password;
    if (employee.password) {
      hashedPassword = await bcrypt.hash(employee.password, 10);
    }
    return await prisma.employee.update({
      where: { id: employeeId },
      data: {
        name: employee.name,
        email: employee.email,
        role: employee.role,
        password: hashedPassword,
        companyId: companyId,
      },
    });
  });
};

const deleteEmpservice = async (employeeId) => {
  const deleteEmp = await prismaClient.employee.delete({
    where: {
      id: employeeId,
    },
  });
  return deleteEmp;
};

module.exports = {
  cretaeEmpService,
  getAllEmpService,
  getIdEmpService,
  updateEmpService,
  deleteEmpservice,
  loginEmployeeService,
  changePasswordService,
};
