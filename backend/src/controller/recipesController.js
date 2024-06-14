import { InvariantError } from "../exceptions/InvariantError.js";
import recipesService from "../services/recipesService.js";
import { deleteFile } from "../utils/deleteFile.js";

const addRecipe = async (req, res, next) => {
  try {
    const {name, descriptions, cuisine, instructions, categoryId, videoId, ingredientId} = req.body;
    const recipePicture = req.file ? `/uploads/${req.file.filename}` : new InvariantError('Masukan Gambar');

    const result = await recipesService.addRecipe({name, descriptions, cuisine, instructions, categoryId, videoId, ingredientId}, recipePicture);

    res.status(201).json({
      status: 'success',
      data: {
        recipeId: result.id
      }
    });

  } catch (e) {
    next(e);
  }
}; 

const getRecipe = async (req, res, next) => {
  try {
    const {recipeName, categoryName, page = 1, limit = 10} = req.query;
    res.status(200).json({
      status: 'success',
      data: await recipesService.getRecipe(recipeName, categoryName, page, limit)
    });

  } catch (e) {
    next(e);
  }
}; 

const getRecipeById = async (req, res, next) => {
  try {
    const id = req.params.recipeId;
    res.status(200).json({
      status: 'success',
      data: await recipesService.getRecipeById(id)
    });

  } catch (e) {
    next(e);
  }
}; 

const editRecipeById = async(req, res, next) => {
  try {
    const payload = req.body;

    const recipe = await recipesService.getRecipeById(req.params.recipeId);

    const recipePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

    if (req.file && recipe.recipePictureUrl) {
        const filename = recipe.recipePictureUrl.split('/').pop();
        deleteFile(filename); 
    };

    const result = await recipesService.editRecipeById(req.params.recipeId, payload, recipePicture);

    res.status(200).json({
      status: 'success',
      data: {
        recipeId: result.id
      }
    });
  } catch (e) {
    next(e);
  }
};

const deleteRecipeById = async(req, res, next) => {
  try {
    const id = req.params.recipeId;
    const recipe = await recipesService.getRecipeById(id);

    if (recipe.recipePictureUrl) {
      const filename = recipe.recipePictureUrl.split('/').pop();
      deleteFile(filename); 
    };

    await recipesService.deleteRecipeById(id);

    res.status(200).json({
      status: 'success',
      message: 'recipe berhasil dihapus!'
    });
  } catch (e) {
    next(e);
  }
};

export default {addRecipe, getRecipe, getRecipeById, editRecipeById, deleteRecipeById};