import usersService from '../services/UsersService.js';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenManager.js';
// import { getUserIdFromToken } from "../utils/authUtils.js";

export const register = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await usersService.register(payload)


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
} 

export const login = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await usersService.login(payload);

    const accessToken = generateAccessToken({id: result.userId, role: result.role});

    res.cookie('meal_mastery', accessToken, { httpOnly: true }).status(201).json({
      status: 'success',
      statusCode: 201,
      message: 'login successfully'
    });

  } catch (e) {
    next(e);
  }
} 

export const getUserById = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: await usersService.getUserById(req.params.userId)
    });

  } catch (e) {
    next(e);
  }
} 

// const editUserById = async (req, res, next) => {
//   try {
//     const userId = await getUserIdFromToken(req);

//     const requestedUserId = req.params.userId;

//     if (userId !== requestedUserId) {
//       return res.status(403).json({
//         status: 'fail',
//         statusCode: 403,
//         message: 'Forbidden: Not enough access',
//       });
//     }
//     const result = await usersService.editUserById(req.body, requestedUserId);

//     res.status(200).json({
//       status: 'success',
//       statusCode: 200,
//       message: 'User updated successfully',
//       data: {
//         userId: result.id
//       }
//     });

//   } catch (e) {
//     next(e);
//   }
// } 

export const logout = async (req, res, next) => {
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
} 
