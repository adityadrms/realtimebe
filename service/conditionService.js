const { prismaClient } = require("../app/database");
const {
  conditionValidation,
  updataConditionValidation,
} = require("../validator/condition.validation");
const {
  ruleConditionValidation,
  updateRuleConditionValidation,
} = require("../validator/rulecondition.validation");

const createCondition = async (data) => {
  const { condition, rules, wellId } = data;

  if (!condition) throw new Error("Data condition wajib diisi");

  const { error: conditionError } = conditionValidation.validate(condition);
  if (conditionError) {
    throw new Error(
      `Condition validation failed: ${conditionError.details[0].message}`
    );
  }

  if (rules && rules.length > 0) {
    for (const rule of rules) {
      const { error: ruleError } = ruleConditionValidation.validate(rule);
      if (ruleError) {
        throw new Error(
          `Rule validation failed: ${ruleError.details[0].message}`
        );
      }
    }
  }

  return await prismaClient.$transaction(async (prisma) => {
    const well = await prisma.well.findUnique({
      where: { id: wellId },
    });

    if (!well) {
      throw new Error(`Well dengan ID ${wellId} tidak ditemukan.`);
    }

    const createdCondition = await prisma.condition.create({
      data: {
        name: condition.name,
        wellId: wellId,
        rules: {
          create: rules.map((rule) => ({
            parameter: rule.parameter,
            operator: rule.operator,
            thresholdValue: rule.thresholdValue,
            logicalOperator: rule.logicalOperator,
          })),
        },
      },
      include: { rules: true },
    });

    return createdCondition;
  });
};

const getCondition = async () => {
  return await prismaClient.condition.findMany({
    include: {
      rules: true,
    },
  });
};

const getIdCondition = async (conditionId) => {
  return await prismaClient.condition.findUnique({
    where: { id: parseInt(conditionId) },
    include: { rules: true },
  });
};

const deleteAllCondition = async (conditionId) => {
  return await prismaClient.condition.delete({
    where: {
      id: conditionId,
    },
  });
};

const deleteruleCondition = async (ruleId) => {
  return await prismaClient.ruleCondition.delete({
    where: {
      id: ruleId,
    },
  });
};

const updateCondition = async (conditionId, data) => {
  const { error: conditionError } = updataConditionValidation.validate(data);
  if (conditionError) {
    throw new Error(
      `Condition validation failed: ${conditionError.details[0].message}`
    );
  }

  // Validasi rules (jika ada)
  if (data.rules && data.rules.length > 0) {
    for (const rule of data.rules) {
      const { error: ruleError } = updateRuleConditionValidation.validate(rule);
      if (ruleError) {
        throw new Error(
          `Rule validation failed: ${ruleError.details[0].message}`
        );
      }
    }
  }

  return await prismaClient.condition.update({
    where: { id: conditionId },
    data: {
      name: data.name,
      rules: {
        deleteMany: {}, 
        create: data.rules.map((rule) => ({
          parameter: rule.parameter,
          operator: rule.operator,
          thresholdValue: rule.thresholdValue,
          logicalOperator: rule.logicalOperator,
        })),
      },
    },
    include: { rules: true },
  });
};

module.exports = {
  createCondition,
  getCondition,
  deleteAllCondition,
  deleteruleCondition,
  updateCondition,
  getIdCondition,
};
