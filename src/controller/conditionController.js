const {
  createCondition,
  getCondition,
  deleteAllCondition,
  deleteruleCondition,
  updateCondition,
  getIdCondition,
} = require("../service/conditionService");

const createConditionController = async (req, res, next) => {
  try {
    console.log("Data yang dikirim:", req.body);
    const condition = await createCondition(req.body);
    res
      .status(201)
      .json({ message: "Condition created successfully.", data: condition });
  } catch (error) {
    next(error);
  }
};

const getallConditionController = async (req, res, next) => {
  try {
    const getallcondition = await getCondition();
    res.status(200).json({
      message: "Condition retrieved successfully.",
      data: getallcondition,
    });
  } catch (error) {
    next(error);
  }
};

const getIdConditionController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getaidcondition = await getIdCondition(id);
    res.status(200).json({
      message: "ConditionId retrieved successfully.",
      data: getaidcondition,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAllConditionController = async (req, res, next) => {
  const { conditionId } = req.params;
  try {
    const deletecondition = await deleteAllCondition(conditionId);
    res.status(200).json({
      message: "Condition deleted successfully.",
      data: deletecondition,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRulesController = async (req, res, next) => {
  const { ruleId } = req.params;
  try {
    const deleterule = await deleteruleCondition(ruleId);
    res
      .status(200)
      .json({ message: "Rules deleted successfully.", data: deleterule });
  } catch (error) {
    next(error);
  }
};

const updateConditionsController = async (req, res, next) => {
  const { conditionId } = req.params;
  try {
    const updatecondition = await updateCondition(conditionId, req.body);
    res.status(200).json({
      message: "Condition update successfully.",
      data: updatecondition,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConditionController,
  getallConditionController,
  getIdConditionController,
  deleteAllConditionController,
  deleteRulesController,
  updateConditionsController,
};
