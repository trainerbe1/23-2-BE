import categoryService from '../services/categoryService.js';

const getAllCategory = async (req, res, next) => {
  try {
    const category = await categoryService.getAllCategory();
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: category,
    });
  } catch (e) {
    next(e);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.getCategoryById(categoryId);
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: category,
    });
  } catch (e) {
    next(e);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await categoryService.createCategory(payload);


    res.status(201).json({
      status: 'success',
      statusCode: 201,
      data: {
        categoryId: result.id
      }
    });

  } catch (e) {
    next(e);
  }
}; 

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await categoryService.deleteCategory(categoryId);
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'Category berhasil dihapus',
    });
  } catch (e) {
    next(e);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const payload = req.body;
    const updatedCategory = await categoryService.updateCategory(categoryId, payload);
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'Category berhasil diupdate',
      data: updatedCategory,
    });
  } catch (e) {
    next(e);
  }
};


export default {getAllCategory, getCategoryById, createCategory, deleteCategory, updateCategory};