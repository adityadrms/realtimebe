const { prismaClient } = require("../app/database");

const createFilterService = async (prisma, wellId) => {
  const defaultData = [
    {
      labels: ["hklda", "woba", "rpm"],
      values: ["hklda", "woba", "rpm"],
      colors: ["#6DCF77", "#4700DE", "#C9A857"],
      lowerBounds: ["0", "0", "0"],
      upperBounds: ["100", "40", "100"],
    },
    {
      labels: ["spm1", "mudflowin", "mudflowout"],
      values: ["spm1", "mudflowin", "mudflowout"],
      colors: ["#727CAB", "#C33AC8", "#666E40"],
      lowerBounds: ["0", "0", "150"],
      upperBounds: ["80", "1000", "300"],
    },
    {
      labels: ["mudtempin", "mudtempout", "-"],
      values: ["mudtempin", "mudtempout", "-"],
      colors: ["#A84E5A", "#6276AB", "#9ca3af"],
      lowerBounds: ["80", "80", "0"],
      upperBounds: ["150", "150", "0"],
    },
    {
      labels: ["co21", "-", "-"],
      values: ["co21", "-", "-"],
      colors: ["#771960", "#9ca3af", "#9ca3af"],
      lowerBounds: ["2500", "0", "0"],
      upperBounds: ["3500", "0", "0"],
    },
  ];

  // Cek apakah filter sudah ada
  const existingFilter = await prisma.filter.findUnique({
    where: { wellId },
  });
  if (existingFilter) {
    throw new Error(`Filter for Well with ID ${wellId} already exists`);
  }

  // Buat filter berdasarkan default data
  return await prisma.filter.create({
    data: {
      wellId,
      labels: defaultData.flatMap((d) => d.labels),
      values: defaultData.flatMap((d) => d.values),
      colors: defaultData.flatMap((d) => d.colors),
      lowerBounds: defaultData.flatMap((d) => d.lowerBounds),
      upperBounds: defaultData.flatMap((d) => d.upperBounds),
    },
  });
};

const updateFilterService = async (data) => {
  const { wellId, filter } = data;

  // Validasi keberadaan Well
  const existingWell = await prismaClient.well.findUnique({
    where: { id: wellId },
  });
  if (!existingWell) {
    throw new Error(`Well with ID ${wellId} not found`);
  }

  // Transformasi data dari nested array menjadi flat array untuk disimpan di database
  const flattenedFilter = filter.flatMap((group) =>
    group.map((item) => ({
      label: item.label,
      value: item.value,
      color: item.color,
      lowerBound: item.lowerBound.toString(),
      upperBound: item.upperBound.toString(),
    }))
  );

  // Ekstrak properti untuk pembaruan
  const labels = flattenedFilter.map((item) => item.label);
  const values = flattenedFilter.map((item) => item.value);
  const colors = flattenedFilter.map((item) => item.color);
  const lowerBounds = flattenedFilter.map((item) => item.lowerBound);
  const upperBounds = flattenedFilter.map((item) => item.upperBound);

  // Update data filter di database
  const updatedFilter = await prismaClient.filter.update({
    where: { wellId },
    data: {
      labels,
      values,
      colors,
      lowerBounds,
      upperBounds,
    },
  });

  return updatedFilter;
};

const getFilterService = async (wellId) => {
  // Cari filter berdasarkan `wellId`
  const filter = await prismaClient.filter.findUnique({
    where: {
      wellId: wellId,
    },
  });

  if (!filter) {
    throw new Error(`Filter for Well ID ${wellId} not found`);
  }

  // Format data Filter menjadi JSON seperti yang diminta
  const formattedFilter = [];
  const chunkSize = 3;

  for (let i = 0; i < filter.labels.length; i += chunkSize) {
    const chunk = [];
    for (let j = 0; j < chunkSize; j++) {
      if (filter.labels[i + j]) {
        chunk.push({
          label: filter.labels[i + j],
          value: filter.values[i + j],
          color: filter.colors[i + j],
          lowerBound: parseFloat(filter.lowerBounds[i + j]),
          upperBound: parseFloat(filter.upperBounds[i + j]),
        });
      }
    }
    formattedFilter.push(chunk);
  }

  return formattedFilter;
};

const getAllFiltersService = async () => {
  const filters = await prismaClient.filter.findMany({
    include: {
      well: true, // Menyertakan data Well jika diperlukan
    },
  });

  // Format hasil menjadi JSON sesuai permintaan
  const formattedFilters = filters.map((filter) => {
    const formattedFilter = [];
    const chunkSize = 3;

    for (let i = 0; i < filter.labels.length; i += chunkSize) {
      const chunk = [];
      for (let j = 0; j < chunkSize; j++) {
        if (filter.labels[i + j]) {
          chunk.push({
            label: filter.labels[i + j],
            value: filter.values[i + j],
            color: filter.colors[i + j],
            lowerBound: parseFloat(filter.lowerBounds[i + j]),
            upperBound: parseFloat(filter.upperBounds[i + j]),
          });
        }
      }
      formattedFilter.push(chunk);
    }

    return {
      wellId: filter.wellId,
      filter: formattedFilter,
    };
  });

  return formattedFilters;
};

module.exports = {
  updateFilterService,
  getFilterService,
  getAllFiltersService,
  createFilterService,
};
