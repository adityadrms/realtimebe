const { prismaClient } = require("../app/database");

const {
  companyValidation,
  updateCompanyValidation,
} = require("../validator/company.validation");

const createCmpService = async (data) => {
  const { company } = data;

  const { error: companyError } = companyValidation.validate(company);
  if (companyError) {
    throw new Error(
      `company validation failed: ${companyError.details[0].message}`
    );
  }

  return prismaClient.$transaction(async (prisma) => {
    return prisma.company.create({
      data: {
        name: company.name,
        address: company.address,
      },
    });
  });
};

const getAllCmpService = async () => {
  return prismaClient.company.findMany();
};

const getIdCmpService = async (companyId) => {
  return await prismaClient.company.findUnique({
    where: { id: companyId },
  });
};

const updateCmpService = async (data) => {
  const { company, companyId } = data;
  const { error: companyError } = updateCompanyValidation.validate(company);
  if (companyError) {
    throw new Error(
      `company validation failed: ${companyError.details[0].message}`
    );
  }
  if (companyError) {
    throw new Error(
      `Company validation failed: ${companyError.details[0].message}`
    );
  }

  return await prismaClient.company.update({
    where: { id: companyId },
    data: {
      name: company.name,
      address: company.address,
    },
  });
};

const deleteCmpservice = async (companyId) => {
  const deleteCmp = await prismaClient.company.delete({
    where: {
      id: companyId,
    },
  });
  return deleteCmp;
};

module.exports = {
  createCmpService,
  getAllCmpService,
  getIdCmpService,
  updateCmpService,
  deleteCmpservice,
};
