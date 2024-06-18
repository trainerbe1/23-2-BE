import { prismaClient } from '../library/database.js';
import { NotFoundError } from "../exceptions/NotFoundError.js";
import { nanoid } from 'nanoid';

const getAllMealPlans = async () => {
  const mealPlans = await prismaClient.mealPlan.findMany();
  return mealPlans;
};

const getMealPlansById = async (id) => {
  const mealPlan = await prismaClient.mealPlan.findUnique({
    where: { id: id },
  });

  if (!mealPlan) {
    throw new NotFoundError('id mealPlans not found');
  }

  return mealPlan;
};

const addMealPlans = async (payload) => {
  const newMealPlan = {
    id: `mealPlans-${nanoid(5)}`,
    user_id: payload.user_id,
  };

  return prismaClient.mealPlan.create({
    data: newMealPlan,
  });
};

const deleteMealPlans = async (id) => {
  return prismaClient.mealPlan.delete({
    where: { id: id },
  });
};

const updateMealPlans = async (id, payload) => {
  return prismaClient.mealPlan.update({
    where: { id: id },
    data: payload,
  });
};

export default { getAllMealPlans, getMealPlansById, addMealPlans, deleteMealPlans, updateMealPlans };
