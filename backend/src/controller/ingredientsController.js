import ingredientsService from '../services/ingredientsService.js';

const addIngredient = async(req, res, next) => {
  try {
    const payload = req.body;

    const result = await ingredientsService.addIngredient(payload);

    res.status(201).json({
      status: 'success',
      data: {
        ingredientId: result.id
      }
    });
  } catch (e) {
    next(e);
  }
};

const getIngredients = async(req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      data: await ingredientsService.getIngredients()
    });

  } catch (e) {
    next(e);
  }
};

const editIngredientById = async(req, res, next) => {
  try {
    const id = req.params.ingredientId;
    const payload = req.body;

    res.status(200).json({
      status: 'success',
      message: 'ingredient updated successfully',
      data: await ingredientsService.
      editIngredientById(id, payload)
    });
  } catch (e) {
    next(e); 
  }
};

const deleteIngredientById = async(req, res, next) => {
  try {
    const id = req.params.ingredientId;

    res.status(200).json({
      status: 'success',
      message: 'ingredient deleted successfully',
      data: await ingredientsService.
      deleteIngredientById(id)
    });
  } catch (e) {
    next(e);
  }
};

export default {addIngredient, getIngredients, editIngredientById, deleteIngredientById};