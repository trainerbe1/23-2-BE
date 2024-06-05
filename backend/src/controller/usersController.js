import usersService from '../services/usersService.js';
import { generateAccessToken } from '../utils/tokenManager.js';

const register = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await usersService.register(payload);


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

const login = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await usersService.login(payload);

    const accessToken = generateAccessToken({id: result.userId, role: result.role});

    res.cookie('meal_mastery', accessToken, { httpOnly: true }).status(201).json({
      status: 'success',
      statusCode: 201,
      message: 'login successfully',
      data: result
    });

  } catch (e) {
    next(e);
  }
}; 

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.userId;
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: await usersService.getUserById(id)
    });

  } catch (e) {
    next(e);
  }
}; 

const editUserById = async (req, res, next) => {
  try {
    const payload = req.body;
    const id = req.params.userId;

    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'User updated successfully',
      data: await usersService.editUserById(payload, id)
    });

  } catch (e) {
    next(e);
  }
}; 

const editPasswordById = async(req, res, next) => {
  try {
    const id = req.params.userId;
    const newPassword = req.body;

    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'update password successfully',
      data: await usersService.changePassword(newPassword, id)
    });
  } catch (e) {
    next(e);
  }
};

const editEmail = async(req, res, next) => {
  try {
    const id = req.params.userId;
    const payload = req.body;

    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'email update successfully',
      data: await usersService.changeEmail(payload, id)
    });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async(req, res, next) => {
  try {
    const id = req.params.userId;
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: await usersService.deleteUser(id)
    });

  } catch (e) {
    next(e);
  }
};

const logout =  (req, res, next) => {
  try {

    res.clearCookie('meal_mastery',{
      httpOnly: true, 
    }).status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'logout successfully'
    });

  } catch (e) {
    next(e);
  }
}; 

export default { register, login, getUserById, editUserById, editPasswordById, editEmail, deleteUser, logout};