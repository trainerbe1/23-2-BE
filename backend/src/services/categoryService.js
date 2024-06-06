import {prismaClient} from '../library/database.js';
import { NotFoundError } from "../exceptions/NotFoundError.js";
import {nanoid} from 'nanoid';

const getAllCategory = async () => {
    const category = await prismaClient.category.findMany();
    return category;
};

const getCategoryById = async (id) => {
    const category = await prismaClient.category.findUnique({
      where: { id: id },
      select:{
        id: true,
        name : true,
        description: true,
    },
    });

    if(!category) {
        throw new NotFoundError('category not found. id undefined');
    }
    
    return category;
};

const createCategory = async (payload) => {
  const newCategory = {
    id: `category-${nanoid(16)}`,
    name: payload.name,
    description: payload.description,
    created_at: payload.created_at,
    update_at: payload.update_at,
  };

  return prismaClient.category.create({
    data: newCategory,
    select: {
      id: true,
    }
  });
};

const deleteCategory = async (id) => {
    const category = await prismaClient.category.delete({
      where: { 
        id: id
      }
    });
    
    if(!category) {
        throw new NotFoundError('id not found');
    }
    
    return category;
};

const updateCategory = async (id, payload) => {
  const category = await prismaClient.category.update({
    where: { id: id },
    data: payload,
  });
  return category;
};
    
export  default {getAllCategory, getCategoryById, createCategory, deleteCategory, updateCategory};