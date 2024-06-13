import { InvariantError } from "../exceptions/InvariantError.js";
import recipesService from "../services/recipesService.js";
import { deleteFile } from "../utils/deleteFile.js";

const addRecipe = async (req, res, next) => {
  try {
    const {descriptions, cuisine, instructions, categoryId, videoId} = req.body;
    const recipePicture = req.file ? `/uploads/${req.file.filename}` : new InvariantError('Masukan Gambar');

    const result = await recipesService.addRecipe({descriptions, cuisine, instructions, categoryId, videoId}, recipePicture);

    res.status(201).json({
      status: 'success',
      statusCode: 201,
      data: {
        userId: result.id
      }
    });

  } catch (e) {
    next(e);
  }
}; 

const getRecipe = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: await recipesService.getRecipe()
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
      statusCode: 200,
      data: await recipesService.getRecipeById(id)
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
      statusCode: 200,
      message: 'recipe berhasil dihapus!'
    });
  } catch (e) {
    next(e);
  }
};

export default {addRecipe, getRecipe, getRecipeById, deleteRecipeById};