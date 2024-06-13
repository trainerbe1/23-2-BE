import { nanoid } from "nanoid";
import { prismaClient } from "../library/database.js";
import { validate } from "../validator/index.js";
import { createRecipesValidator } from "../validator/recipesValidator.js";
import { NotFoundError } from "../exceptions/NotFoundError.js";

const addRecipe = async (payload, url) => {
  const recipe = validate(createRecipesValidator, payload);

  const newRecipe = {
    id: `recipe-${nanoid(16)}`,
    descriptions: recipe.descriptions,
    cuisine: recipe.cuisine,
    instructions: recipe.instructions,
    recipe_picture: url,
    category_id: recipe.categoryId,
    video_id: recipe.videoId
  };


  return await prismaClient.recipe.create({
    data: newRecipe,
    select: {
      id: true,
    }
  });
};

const getRecipe = async() => {
  const recipe = await prismaClient.recipe.findMany({
    include:{
      category: {
        select: {
          name: true,
        }
      },
      video:{
        select: {
          name: true,
          link: true
        }
      }
    },
  });

  const recipes = recipe.map((r) => ({
    id: r.id,
    descriptions: r.descriptions,
    cuisine: r.cuisine,
    instructions: r.instructions,
    recipePictureUrl: r.recipe_picture,
    categoryName: r.category.name,
    videoName: r.video.name,
    link: r.video.link,
    createdAt: r.created_at,
    updatedAt: r.updated_at
  }));

  return recipes;
};

const getRecipeById = async(id) => {
  const recipe = await prismaClient.recipe.findUnique({
    where:{
      id: id,
    },
    include:{
      category: {
        select: {
          name: true,
        }
      },
      video:{
        select: {
          name: true,
          link: true
        }
      }
    },
  });

  if(!recipe) {
    throw new NotFoundError('Id not found');
  }

  return {
    id: recipe.id,
    descriptions: recipe.descriptions,
    cuisine: recipe.cuisine,
    instructions: recipe.instructions,
    recipePictureUrl: recipe.recipe_picture,
    categoryName: recipe.category.name,
    videoName: recipe.video.name,
    link: recipe.video.link,
    createdAt: recipe.created_at,
    updatedAt: recipe.updated_at
  };
};

const deleteRecipeById = async(id) => {
  const recipe = await prismaClient.recipe.findUnique({
    where:{
      id: id,
    },
  });

  if(!recipe) {
    throw new NotFoundError('Id not found');
  }

  return await prismaClient.recipe.delete({
    where:{
      id: id
    }
  });
};

export default {addRecipe,getRecipe, getRecipeById, deleteRecipeById};
