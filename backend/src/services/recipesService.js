import { nanoid } from "nanoid";
import { prismaClient } from "../library/database.js";
import { validate } from "../validator/index.js";
import { createRecipesValidator, updateRecipesValidator } from "../validator/recipesValidator.js";
import { NotFoundError } from "../exceptions/NotFoundError.js";

const addRecipe = async (payload, url) => {
  const recipe = validate(createRecipesValidator, payload);

  return await prismaClient.recipe.create({
    data: {
      id: `recipe-${nanoid(16)}`,
      name: recipe.name,
      descriptions: recipe.descriptions,
      cuisine: recipe.cuisine,
      instructions: recipe.instructions,
      recipe_picture: url,
      category_id: recipe.categoryId,
      video_id: recipe.videoId,
      ingredients: {
        connect: recipe.ingredientId.map(id => ({id}))
      }
    },
    select: {
      id: true,
    }
  });
};

const getRecipe = async(recipeName, categoryName, page, limit) => {

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Hitung jumlah hasil yang akan dilewati
  const skip = (pageNumber - 1) * limitNumber;

  const recipe = await prismaClient.recipe.findMany({
    where: {
      AND: [
        recipeName ? {
          name: {
            contains: recipeName,
            mode: 'insensitive',
          },
        } : {},
        categoryName ? {
          category: {
            name: {
              contains: categoryName,
              mode: 'insensitive',
            },
          },
        } : {},
      ],
    },
    include:{
      ingredients: {
        select:{
          name: true,
          unit: true,
          quantity: true
        }
      },
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
      },
      favorites:{
        count: true
      }
    },
    orderBy:{
      created_at: 'desc'
    },
    skip: skip,
    take: limitNumber
  });

  const recipes = recipe.map((r) => ({
    id: r.id,
    name: r.name,
    descriptions: r.descriptions,
    cuisine: r.cuisine,
    instructions: r.instructions,
    recipePictureUrl: r.recipe_picture,
    ingredientData: r.ingredients,
    categoryName: r.category.name,
    videoName: r.video.name,
    link: r.video.link,
    favoriteCount: r.favorites.count,
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
      ingredients: {
        select:{
          name: true,
          unit: true,
          quantity: true
        }
      },
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
    ingredients: recipe.ingredients,
    categoryName: recipe.category.name,
    videoName: recipe.video.name,
    link: recipe.video.link,
    createdAt: recipe.created_at,
    updatedAt: recipe.updated_at
  };
};

const editRecipeById = async(id, payload, recipePicture) => {
  const recipe = validate(updateRecipesValidator, payload);

  const recipeCount = await prismaClient.recipe.findUnique({
    where: {
      id: id
    }
  });

  if(!recipeCount) {
    throw new NotFoundError('Id not found');
  }

  const data = {...recipe};

  if(recipeCount.recipe_picture) {
    data.recipe_picture = recipePicture;
  }

  delete data.ingredientId;
  return await prismaClient.recipe.update({
    where: {
      id: id,
    },
    data: {
      ...data,
      ingredients: {
        set: [],
        connect: recipe.ingredientId.map(id => ({id}))
      }
    },
    select: {
      id: true
    }
  });

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

export default {addRecipe,getRecipe, getRecipeById, editRecipeById, deleteRecipeById};
