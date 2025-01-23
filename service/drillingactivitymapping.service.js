const { prismaClient } = require("../app/database");

class DrillingFormation {
  static previousData = null;
  static previousBlockPos = null;

  // Fungsi untuk mengecek aturan
  static checkRule(rule, value) {
    const { operator, thresholdValue } = rule;
    switch (operator) {
      case ">":
        return value > thresholdValue;
      case "<":
        return value < thresholdValue;
      case ">=":
        return value >= thresholdValue;
      case "<=":
        return value <= thresholdValue;
      case "==":
        return value === thresholdValue;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  // Fungsi utama untuk mengecek kondisi
  static checkConditions = async (data, wellId) => {
    try {
      const conditions = await prismaClient.condition.findMany({
        where: { wellId },
        include: { rules: true },
      });

      if (!data || !Object.keys(data).length) {
        console.error("Data tidak valid atau kosong");
        return null;
      }

      for (const condition of conditions) {
        let isConditionMet = true;

        for (const rule of condition.rules) {
          const value = Number(data[rule.parameter]);
          const isRuleMet = DrillingFormation.checkRule(rule, value);

          if (rule.logicalOperator === "AND" && !isRuleMet) {
            isConditionMet = false;
            break;
          }

          if (rule.logicalOperator === "OR" && isRuleMet) {
            isConditionMet = true;
            break;
          }
        }

        if (isConditionMet) {
          return DrillingFormation.executeCondition(data, condition);
        }
      }

      return null;
    } catch (error) {
      console.error("Error checking conditions:", error.message);
      return null;
    }
  };

  // Menjalankan kondisi spesifik
  static executeCondition = async (data, condition) => {
    const validConditions = [
      "Drilling Rotate",
      "Drilling Slide",
      "Connection",
      "PreConnection Reaming",
      "Reaming",
      "PostConnection Reaming",
    ];

    if (!validConditions.includes(condition.name)) {
      console.warn(`Anomaly detected: Unknown condition '${condition.name}'`);
      await DrillingFormation.logNotification({
        title: "Anomaly Detected",
        message: `Anomaly detected for condition: ${condition.name}`,
        wellId: condition.wellId,
      });
      return null;
    }

    const result = await DrillingFormation[condition.name.replace(/\s/g, "")](
      data,
      condition
    );

    if (result) {
      await DrillingFormation.logNotification({
        title: "Condition Detected",
        message: `Condition '${condition.name}' successfully detected.`,
        wellId: condition.wellId,
      });
    }

    return result;
  };

  // Fungsi untuk mencatat notifikasi ke tabel Notification
  static logNotification = async ({ title, message, wellId }) => {
    try {
      await prismaClient.notification.create({
        data: {
          title,
          message,
          wellId,
        },
      });
      console.info(`Notification logged: ${title}`);
    } catch (error) {
      console.error("Error logging notification:", error.message);
    }
  };

  static DrillingRotate = async (data, condition) => {
    if (
      Math.abs(Number(data.bitdepth) - Number(data.md)) <= 0.5 &&
      Math.abs(Number(data.md) - Number(data.spare_1)) <= 0.5 &&
      (DrillingFormation.previousData === null ||
        [
          "PreConnection Reaming",
          "Drilling Rotate",
          "PostConnection Reaming",
          "Reaming",
        ].includes(DrillingFormation.previousData))
    ) {
      DrillingFormation.previousData = "Drilling Rotate";
      return "Drilling Rotate";
    }
    return null;
  };

  static DrillingSlide = async (data, condition) => {
    if (
      Math.abs(Number(data.bitdepth) - Number(data.md)) <= 0.5 &&
      Math.abs(Number(data.md) - Number(data.spare_1)) <= 0.5 &&
      (DrillingFormation.previousData === null ||
        ["PostConnection Reaming", "Drilling Slide"].includes(
          DrillingFormation.previousData
        ))
    ) {
      DrillingFormation.previousData = "Drilling Slide";
      return "Drilling Slide";
    }
    return null;
  };

  static Connection = async (data, condition) => {
    if (
      Number(data.bitdepth) <= Number(data.md) &&
      Number(data.md) === Number(data.spare_1) &&
      (DrillingFormation.previousData === null ||
        ["PreConnection", "Connection"].includes(
          DrillingFormation.previousData
        ))
    ) {
      DrillingFormation.previousData = "Connection";
      return "Connection";
    }
    return null;
  };

  static PreConnectionReaming = async (data, condition) => {
    if (
      Number(data.bitdepth) < Number(data.md) &&
      Number(data.md) === Number(data.spare_1) &&
      (DrillingFormation.previousBlockPos === null || 
        Number(data.blockpos) > DrillingFormation.previousBlockPos) &&
      (DrillingFormation.previousData === null ||
        ["Drilling Rotate", "PostConnection Reaming", "Reaming","PreConnection Reaming"].includes(
          DrillingFormation.previousData
        ))
    ) {
      DrillingFormation.previousData = "PreConnection Reaming";
      return "PreConnection Reaming";
    }
    return null;
  };
  static Reaming = async (data, condition) => {
    if (
      Number(data.bitdepth) < Number(data.md) &&
      Number(data.md) === Number(data.spare_1) &&
      (DrillingFormation.previousBlockPos === null || 
        Number(data.blockpos) > DrillingFormation.previousBlockPos) &&
      (DrillingFormation.previousData === null ||
        ["Drilling Rotate", "Drilling Slide", "Reaming"].includes(
          DrillingFormation.previousData
        ))
    ) {
      DrillingFormation.previousData = "Reaming";
      return "Reaming";
    }
    return null;
  };
  static PostConnectionReaming = async (data, condition) => {
    if (
      Number(data.bitdepth) <= Number(data.md) &&
      Number(data.md) === Number(data.spare_1) &&
      (DrillingFormation.previousData === null ||
        ["Connection", "PostConnection Reaming"].includes(
          DrillingFormation.previousData
        ))
    ) {
      DrillingFormation.previousData = "PostConnection Reaming";
      return "PostConnection Reaming";
    }
    return null;
  };
}

module.exports = DrillingFormation;
