import mealPlanItemsService from '../services/mealPlanItemsService.js';

const getAllMealPlanItems = async (req, res, next) => {
  try {
    const mealPlanItems = await mealPlanItemsService.getAllMealPlanItems();
    res.status(200).json({
      status: 'success',
      data: mealPlanItems,
    });
  } catch (e) {
    next(e);
  }
};

const getMealPlanItemsById = async (req, res, next) => {
  try {
    const mealPlanItem = await mealPlanItemsService.getMealPlanItemsById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: mealPlanItem,
    });
  } catch (e) {
    next(e);
  }
};

const addMealPlanItems = async (req, res, next) => {
  try {
    const mealPlanItem = await mealPlanItemsService.addMealPlanItems(req.body);
    res.status(201).json({
      status: 'success',
      data: mealPlanItem,
    });
  } catch (e) {
    next(e);
  }
};

const deleteMealPlanItems = async (req, res, next) => {
  try {
    await mealPlanItemsService.deleteMealPlanItems(req.params.id);
    res.status(200).json({
      status: 'success',
      message:'mealPlanItem Berhasil dihapus!',
    });
  } catch (e) {
    next(e);
  }
};

const updateMealPlanItems = async (req, res, next) => {
  try {
    const mealPlanItem = await mealPlanItemsService.updateMealPlanItems(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: mealPlanItem,
    });
  } catch (e) {
    next(e);
  }
};

export default{getAllMealPlanItems, getMealPlanItemsById, addMealPlanItems, deleteMealPlanItems, updateMealPlanItems};