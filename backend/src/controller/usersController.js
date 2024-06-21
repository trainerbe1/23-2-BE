import { InvariantError } from '../exceptions/InvariantError.js';
import usersService from '../services/usersService.js';
import { deleteFile } from '../utils/deleteFile.js';
import { generateAccessToken } from '../utils/tokenManager.js';

const register = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await usersService.register(payload);

    const accessToken = generateAccessToken({id: result.id, role: result.role});

    res.cookie('meal_mastery', accessToken, { httpOnly: true, secure: false, expire: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) }).status(201).json({
      status: 'success',
      message: 'register successfully',
      data: result
    });

  } catch (e) {
    next(e);
  }
}; 

const login = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await usersService.login(payload);

    const accessToken = generateAccessToken({id: result.id, role: result.role});

    res.cookie('meal_mastery', accessToken, { httpOnly: true, secure: false, expire: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) }).status(201).json({
      status: 'success',
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
    const userId = req.userId;

    await usersService.verifyOwner(id, userId);
    res.status(200).json({
      status: 'success',
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
    const userId = req.userId;

    await usersService.verifyOwner(id, userId);

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: await usersService.editUserById(payload, id)
    });

  } catch (e) {
    next(e);
  }
}; 

const editAvatar = async (req, res, next) => {
  try {
    const payload = req.file ? `/uploads/${req.file.filename}` : new InvariantError('input kosong');

    const id = req.params.userId;

    let avatarExists = false;
    let oldAvatarFilename = null;

    const avatarUrl = (await usersService.getUserById(id)).profilePictureUrl;
    if (avatarUrl) {
      avatarExists = true;
      oldAvatarFilename = avatarUrl.split('/').pop();
    }

    const profilePicture = await usersService.editAvatarUser(id, payload);

    if (avatarExists) {
      deleteFile(oldAvatarFilename);
    }

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: profilePicture,
    });

  } catch (e) {
    next(e);
  }
}; 

const editPasswordById = async(req, res, next) => {
  try {
    const id = req.params.userId;
    const newPassword = req.body;

    const userId = req.userId;

    await usersService.verifyOwner(id, userId);

    res.status(200).json({
      status: 'success',
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

    const userId = req.userId;

    await usersService.verifyOwner(id, userId);

    res.status(200).json({
      status: 'success',
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
      message: 'logout successfully'
    });

  } catch (e) {
    next(e);
  }
}; 

export default { register, login, getUserById, editUserById, editPasswordById, editEmail, deleteUser, editAvatar, logout};