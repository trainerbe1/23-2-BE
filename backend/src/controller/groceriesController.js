import groceriesServices from "../services/groceriesServices.js";


const addGrocery = async(req, res, next) => {
  try {
    const payload = req.body;
    const userId = req.userId;

    const result = await groceriesServices.addGrocery(payload, userId);

    res.status(201).json({
      status: 'success',
      data: {
        groceryId: result.id
      }
    });
  } catch (e) {
    next(e);
  }
};

const getGroceries = async(req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      data: await groceriesServices.getGroceries()
    });

  } catch (e) {
    next(e);
  }
};

const getGroceryById = async(req, res, next) => {
  try {
    const id = req.params.groceryId;
    const userId = req.userId;

    await groceriesServices.verifyGroceriesOwner(id, userId);
    res.status(200).json({
      status: 'success',
      data: await groceriesServices.getGroceryById(id)
    });

  } catch (e) {
    next(e);
  }
};

const deleteGroceryById = async(req, res, next) => {
  try {
    const id = req.params.groceryId;

    res.status(200).json({
      status: 'success',
      message: 'grocert deleted successfully',
      data: await groceriesServices.
      deleteGroceyById(id)
    });
  } catch (e) {
    next(e);
  }
};

export default {addGrocery, getGroceries, getGroceryById, deleteGroceryById};