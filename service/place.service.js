const { prismaClient } = require("../app/database");

const {
  placeValidation,
  updatePlaceValidation,
} = require("../validator/place.validation");

// Create Place
const createPlaceService = async (data) => {
  const { place, companyId } = data;

  if (place && place.length > 0) {
    for (const plc of place) {
      const { error: placeError } = placeValidation.validate(plc);
      if (placeError) {
        throw new Error(
          `place validation failed: ${placeError.details[0].message}`
        );
      }
    }
  }

  return await prismaClient.$transaction(async (prisma) => {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error(`Place with ID ${companyId} not found`);
    }
    const createdPlaces = [];
    for (const plc of place) {
      const createdPlace = await prisma.place.create({
        data: {
          name: plc.name,
          address: plc.address,
          latitude: plc.latitude,
          longitude: plc.longitude,
          companyId: companyId,
        },
      });
      createdPlaces.push(createdPlace);
    }
    return createdPlaces;
  });
};

//viewAll
const getAllPlcService = async () => {
  return await prismaClient.place.findMany({});
};

// View Id
const getIdPlcService = async (placeId) => {
  return await prismaClient.place.findUnique({
    where: { id: placeId },
  });
};

//Update Place
const updatePlcService = async (data) => {
  const { place, companyId, placeId } = data;

  const { error: placeError } = updatePlaceValidation.validate(place);
  if (placeError) {
    throw new Error(
      `place validation failed: ${placeError.details[0].message}`
    );
  }

  return await prismaClient.$transaction(async (prisma) => {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    const existingPlace = await prisma.place.findUnique({
      where: { id: placeId },
    });

    if (!existingPlace || existingPlace.companyId !== companyId) {
      throw new Error(
        `Place with ID ${placeId} not found or does not belong to the specified company`
      );
    }

    return await prisma.place.update({
      where: { id: placeId },
      data: {
        name: place.name,
        address: place.address,
        latitude: place.latitude,
        longitude: place.longitude,
        companyId: companyId,
      },
    });
  });
};

const deletePlcservice = async (placeId) => {
  const deleteplc = await prismaClient.place.delete({
    where: {
      id: placeId,
    },
  });
  return deleteplc;
};

module.exports = {
  createPlaceService,
  getAllPlcService,
  getIdPlcService,
  updatePlcService,
  deletePlcservice,
};
