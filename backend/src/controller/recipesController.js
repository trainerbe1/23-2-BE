import { InvariantError } from "../exceptions/InvariantError.js";
import recipesService from "../services/recipesService.js";
import { deleteFile } from "../utils/deleteFile.js";

const addRecipe = async (req, res, next) => {
  try {
    const {name, descriptions, cuisine, instructions, categoryId, videoId, ingredientId, recipePictureUrl} = req.body;

    const result = await recipesService.addRecipe({name, descriptions, cuisine, instructions, categoryId, videoId, ingredientId, recipePictureUrl});

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

const uploadRecipePicture = (req, res, next) => {
  try {
    if(!req.file) {
      throw new InvariantError('Mohon untuk mengisi file gambar');
    }

    const picture = req.file; 

    if(picture) {
      const recipePictureUrl = `/uploads/${req.file.filename}`;

      res.status(201).json({
        status: 'success',
        recipePictureUrl
      });
    }
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
    const {name, descriptions, cuisine, instructions, categoryId, videoId, ingredientId, recipePictureUrl} = req.body;

    const recipe = await recipesService.getRecipeById(req.params.recipeId);

    if (recipePictureUrl) {
      if(recipe.recipePictureUrl) {
        const filename = recipe.recipePictureUrl.split('/').pop();
        deleteFile(filename); 
      }
        
    };

    const result = await recipesService.editRecipeById(req.params.recipeId, {name, descriptions, cuisine, instructions, categoryId, videoId, ingredientId, recipePictureUrl});

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

export default {addRecipe, uploadRecipePicture, getRecipe, getRecipeById, editRecipeById, deleteRecipeById};