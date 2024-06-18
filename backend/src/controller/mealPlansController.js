import mealPlansService from '../services/mealPlansService.js';

const getAllMealPlans = async (req, res, next) => {
  try {
    const mealPlans = await mealPlansService.getAllMealPlans();
    res.status(200).json({
      status: 'success',
      data: mealPlans,
    });
  } catch (e) {
    next(e);
  }
};

const getMealPlansById = async (req, res, next) => {
  try {
    const mealPlan = await mealPlansService.getMealPlansById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: mealPlan,
    });
  } catch (e) {
    next(e);
  }
};

const addMealPlans = async (req, res, next) => {
  try {
    const mealPlan = await mealPlansService.addMealPlans(req.body);
    res.status(201).json({
      status: 'success',
      data: mealPlan,
    });
  } catch (e) {
    next(e);
  }
};

const deleteMealPlans = async (req, res, next) => {
  try {
    await mealPlansService.deleteMealPlans(req.params.id);
    res.status(200).json({
      status: 'success',
      message:'mealPlan Berhasil dihapus!',
    });
  } catch (e) {
    next(e);
  }
};

const updateMealPlans = async (req, res, next) => {
  try {
    const mealPlan = await mealPlansService.updateMealPlans(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: mealPlan,
    });
  } catch (e) {
    next(e);
  }
};

export default{getAllMealPlans, getMealPlansById, addMealPlans, deleteMealPlans, updateMealPlans};