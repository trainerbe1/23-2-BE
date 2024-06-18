import { prismaClient } from '../library/database.js';
import { NotFoundError } from "../exceptions/NotFoundError.js";
import { nanoid } from 'nanoid';

const getAllMealPlanItems = async () => {
  const mealPlanItems = await prismaClient.MealPlanItem.findMany();
  return mealPlanItems;
};

const getMealPlanItemsById = async (id) => {
  const mealPlanItem = await prismaClient.MealPlanItem.findUnique({
    where: { id: id },
  });

  if (!mealPlanItem) {
    throw new NotFoundError('id mealPlanItems not found');
  }

  return mealPlanItem;
};

const addMealPlanItems = async (payload) => {
  const newMealPlanItem = {
    id: `mealPlanItems-${nanoid(5)}`,
    mealPlan_id: payload.mealPlan_id,
    recipe_id: payload.recipe_id,
    meal_type: payload.meal_type,
    day_of_week: payload.day_of_week,
  };

  return prismaClient.MealPlanItem.create({
    data: newMealPlanItem,
  });
};

const deleteMealPlanItems = async (id) => {
  return prismaClient.MealPlanItem.delete({
    where: { id: id },
  });
};

const updateMealPlanItems = async (id, payload) => {
  return prismaClient.MealPlanItem.update({
    where: { id: id },
    data: payload,
  });
};

export default { getAllMealPlanItems, getMealPlanItemsById, addMealPlanItems, deleteMealPlanItems, updateMealPlanItems };
