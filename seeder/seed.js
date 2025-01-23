const bcrypt = require("bcrypt");
const { prismaClient } = require("../app/database");

async function seed() {
  const hashedPassword = await bcrypt.hash("Hashedpassword456", 10);

  const company = await prismaClient.company.create({
    data: {
      name: "PDU",
      address: "UGM Yogyakarta",
    },
  });

  await prismaClient.employee.create({
    data: {
      name: "AdminPDU",
      email: "adminpdu@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
      companyId: company.id,
    },
  });

  // Data tambahan
  const hashedPasswordUser = await bcrypt.hash("User123", 10);

  const additionalCompanies = [
    { name: "Pertamina Hulu Rokan", address: "Jakarta" },
    { name: "PT Client_2", address: "Bandung" },
  ];
  const createdCompanies = [];

  for (const company of additionalCompanies) {
    const createdCompany = await prismaClient.company.create({
      data: company,
    });
    createdCompanies.push(createdCompany);
  }

  const existingCompany = await prismaClient.company.findFirst({
    where: { name: "PDU" },
  });

  const additionalEmployees = [
    {
      name: "Pertamina Client",
      email: "pertamina@gmail.com",
      password: hashedPasswordUser,
      role: "USER",
      companyId: createdCompanies.find((c) => c.name === "Pertamina Hulu Rokan")
        .id,
    },
    {
      name: "UserClient2",
      email: "userclient2@gmail.com",
      password: hashedPasswordUser,
      role: "USER",
      companyId: createdCompanies.find((c) => c.name === "PT Client_2").id,
    },
    {
      name: "StaffPDU",
      email: "staffpdu@gmail.com",
      password: hashedPasswordUser,
      role: "USER",
      companyId: existingCompany.id,
    },
  ];

  for (const employee of additionalEmployees) {
    await prismaClient.employee.create({ data: employee });
  }

  // Tambahkan data places dan wells
  const targetCompanies = ["PDU", "PT Client_2"];

  const companies = await prismaClient.company.findMany({
    where: { name: { in: targetCompanies } },
  });

  for (const company of companies) {
    const places = [];
    for (let i = 1; i <= 4; i++) {
      const place = await prismaClient.place.create({
        data: {
          name: `Place ${i} of ${company.name}`,
          address: `Address of Place ${i}, ${company.address}`,
          latitude: -7.75 + Math.random() * 0.1,
          longitude: 110.37 + Math.random() * 0.1,
          companyId: company.id,
        },
      });
      places.push(place);
    }

    for (let i = 1; i <= 4; i++) {
      const place = places[i - 1];
      await prismaClient.well.create({
        data: {
          name: `Well ${i} of ${company.name}`,
          address: `Address of Well ${i}, ${company.address}`,
          latitude: place.latitude,
          longitude: place.longitude,
          topic: `UniqueTopic${company.name}${i}`,
          placeId: place.id,
          rig: `RIG-${i}-${company.name}`,
          apiKey: "DUMMYAPIKEY",
        },
      });
    }
  }

  //real data
  const pertaminaCompany = await prismaClient.company.findFirst({
    where: { name: "Pertamina Hulu Rokan" },
  });

  const place = await prismaClient.place.create({
    data: {
      name: `Place 1 of Pertamina`,
      address: `Jakarta`,
      latitude: -6.2 + Math.random() * 0.1, // Koordinat acak untuk Jakarta
      longitude: 106.8 + Math.random() * 0.1,
      companyId: pertaminaCompany.id,
    },
  });

  await prismaClient.well.create({
    data: {
      name: `P_BLSO24_H08`,
      address: `Jakarta`,
      latitude: -6.2 + Math.random() * 0.1, // Koordinat acak untuk Jakarta
      longitude: 106.8 + Math.random() * 0.1,
      topic: `bebas`,
      placeId: place.id,
      rig: `EPI-9`,
      apiKey: "15a39c5dd2b23b32714777164d9f15e3",
    },
  });

  const defaultFilterData = [
    [
      {
        label: "hklda",
        value: "hklda",
        color: "#6DCF77",
        lowerBound: 0,
        upperBound: 100,
      },
      {
        label: "woba",
        value: "woba",
        color: "#4700DE",
        lowerBound: 0,
        upperBound: 40,
      },
      {
        label: "rpm",
        value: "rpm",
        color: "#C9A857",
        lowerBound: 0,
        upperBound: 100,
      },
    ],
    [
      {
        label: "spm1",
        value: "spm1",
        color: "#727CAB",
        lowerBound: 0,
        upperBound: 80,
      },
      {
        label: "mudflowin",
        value: "mudflowin",
        color: "#C33AC8",
        lowerBound: 0,
        upperBound: 1000,
      },
      {
        label: "mudflowout",
        value: "mudflowout",
        color: "#666E40",
        lowerBound: 150,
        upperBound: 300,
      },
    ],
    [
      {
        label: "mudtempin",
        value: "mudtempin",
        color: "#A84E5A",
        lowerBound: 80,
        upperBound: 150,
      },
      {
        label: "mudtempout",
        value: "mudtempout",
        color: "#6276AB",
        lowerBound: 80,
        upperBound: 150,
      },
      {
        label: "-",
        value: "-",
        color: "#9ca3af",
        lowerBound: 0,
        upperBound: 0,
      },
    ],
    [
      {
        label: "co21",
        value: "co21",
        color: "#771960",
        lowerBound: 2500,
        upperBound: 3500,
      },
      {
        label: "-",
        value: "-",
        color: "#9ca3af",
        lowerBound: 0,
        upperBound: 0,
      },
      {
        label: "-",
        value: "-",
        color: "#9ca3af",
        lowerBound: 0,
        upperBound: 0,
      },
    ],
  ];

  const wells = await prismaClient.well.findMany();

  if (!wells || wells.length === 0) {
    console.error("No wells found in the database. Please seed wells first.");
    return;
  }

  for (const well of wells) {
    const existingFilter = await prismaClient.filter.findUnique({
      where: { wellId: well.id },
    });

    if (existingFilter) {
      console.log(`Filter for Well ID ${well.id} already exists. Skipping.`);
      continue;
    }

    await prismaClient.filter.create({
      data: {
        wellId: well.id,
        labels: defaultFilterData.flatMap((group) =>
          group.map((item) => item.label)
        ),
        values: defaultFilterData.flatMap((group) =>
          group.map((item) => item.value)
        ),
        colors: defaultFilterData.flatMap((group) =>
          group.map((item) => item.color)
        ),
        lowerBounds: defaultFilterData.flatMap((group) =>
          group.map((item) => item.lowerBound.toString())
        ),
        upperBounds: defaultFilterData.flatMap((group) =>
          group.map((item) => item.upperBound.toString())
        ),
      },
    });

    console.log(`Filter for Well ID ${well.id} has been created.`);
  }

  console.log("Seeding selesai!");
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
