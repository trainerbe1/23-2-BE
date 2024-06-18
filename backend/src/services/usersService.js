import { loginUserValidator, patchUserChangeEmailValidator, patchUserChangePasswordValidator, patchUserValidator, registerUserValidator } from "../validator/usersValidator.js";
import { validate } from "../validator/index.js";
import {prismaClient} from '../library/database.js';
import { InvariantError } from "../exceptions/InvariantError.js";
import { AuthenticationError } from "../exceptions/AuthenticationError.js";
import { NotFoundError } from "../exceptions/NotFoundError.js";
import bcrypt from 'bcrypt';
import {nanoid} from 'nanoid';
import { AuthorizationError } from "../exceptions/AuthorizationError.js";

const register = async (payload) => {
  const user = validate(registerUserValidator, payload);

  const isEmailExists = await prismaClient.user.findUnique({
    where: {
      email: user.email
    }
  });

  if (isEmailExists){
    throw new InvariantError("Email already exists.");
  }
  const password = payload.password;
  const hash = await bcrypt.hash(password, 10);
  const newUser = {
    id: `user-${nanoid(16)}`,
    username: payload.username,
    email: payload.email,
    password: hash,
    gender: payload.gender,
    role: payload.role
  };


  return await prismaClient.user.create({
    data: newUser,
    select: {
      id: true,
      username:true,
      role:true
    }
  });
};

const login = async (payload) => {
  const loginRequest = validate(loginUserValidator, payload);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      role: true
    }
  });

  if (!user) {
    throw new AuthenticationError('Kredensial yang diberikan salah');
  }

  const correctPassword = await bcrypt.compare(loginRequest.password, user.password);

  if (!correctPassword) {
    throw new AuthenticationError('Kredensial yang diberikan salah');
  }

  return {id: user.id, username: user.username, role: user.role};
};


 const getUserById = async (id) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      username: true,
      email: true,
      gender: true,
      profile_picture: true,
      role: true,
      created_at: true,
      updated_at: true
    }
  });

  if(!user) {
    throw new NotFoundError('user not found. id undefined');
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    gender: user.gender,
    profilePictureUrl: user.profile_picture,
    role: user.role,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  };
};

const editUserById = async(payload, id) => {
  const user = validate(patchUserValidator, payload);

  const userCount = await prismaClient.user.findUnique({
    where: {
      id: id
    }
  });

  if (!userCount) {
    throw new NotFoundError('user not found. id undefined');
  }

  const data = {};

  if(user.username) {
    data.username = user.username;
  }

  if(user.gender) {
    data.gender = user.gender;
  }

  return await prismaClient.user.update({
    where: {
      id: id
    },
    data: data,
    select: {
      id: true,
    }
  });
};

const editAvatarUser = async(id, payload) => {

  const user = await prismaClient.user.findUnique({
    where:{
      id: id,
    },
  });

  if(!user) {
    throw new NotFoundError('id not found');
  }

  return await prismaClient.user.update({
    where: {
      id: id
    },
    data: {
      profile_picture: payload,
    },
    select: {
      id: true,
      profile_picture: true
    }
  });
};

const changePassword = async(payload, id) => {
  const passwordRequest = validate(patchUserChangePasswordValidator, payload);

  const user = await prismaClient.user.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      password: true,
    }
  });

  if (!user) {
    throw new NotFoundError('id not found');
  }

  const correctPassword = await bcrypt.compare(passwordRequest.oldPassword, user.password);

  if (!correctPassword) {
    throw new AuthenticationError('Kredensial yang diberikan salah');
  }

  const password = await bcrypt.hash(passwordRequest.newPassword, 10);

  const data = {
    password: password
  };

  return await prismaClient.user.update({
    where: {
      id: id
    },
    data: data,
    select: {
      id: true,
    }
  });
};


const changeEmail = async(payload, id) => {
  const emailRequest = validate(patchUserChangeEmailValidator, payload);

  const user = await prismaClient.user.findUnique({
    where: {
      id: id
    },
    select: {
      email: true
    }
  });

  if(!user){
    throw new NotFoundError('id not found');
  }

  if(emailRequest.oldEmail !== user.email){
    throw new AuthenticationError('kredensial yang diberikan salah');
  }

  const isEmailExists = await prismaClient.user.findUnique({
    where: {
      email: emailRequest.newEmail
    }
  });

  if (isEmailExists){
    throw new InvariantError("Email already exists.");
  }

  const data = {
    email: emailRequest.newEmail
  };

  return await prismaClient.user.update({
    where: {
      id:id
    },
    data: data,
    select:{
      id: true,
      email: true
    }
  });
};

const deleteUser = async(id) => {
  const user = await prismaClient.user.findUnique({
    where:{
      id: id
    }
  });

  if(!user) {
    throw new NotFoundError('id not found');
  }

  return await prismaClient.user.update({
    where:{
      id: id
    },
    data:{
      is_delete: true
    }
  });
};

const verifyOwner = async(id, userId) => {
  const owner = await prismaClient.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true
    }
  });

  if(!owner) {
    throw new NotFoundError('Id not found');
  }

  if(owner.id !== userId) {
    throw new AuthorizationError('restricted resource');
  }
};

export  default {register, login, getUserById, editUserById, changePassword,editAvatarUser, changeEmail, deleteUser, verifyOwner};