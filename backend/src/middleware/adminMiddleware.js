import { AuthenticationError } from "../exceptions/AuthenticationError.js";
import Jwt from 'jsonwebtoken';
import { config } from "../utils/config.js";
import { AuthorizationError } from "../exceptions/AuthorizationError.js";

export const adminMiddleware = (req, res, next) => {
  const token = req.cookies.meal_mastery;
  if (!token) {
    return next(new AuthenticationError('unauthorized'));
  }

  try {
    const data = Jwt.verify(token, config.jwtToken.accessToken);
    req.userId = data.id;
    req.role = data.role;

    if(data.role !== 'ADMIN') {
      return next(new AuthorizationError('not an admin'));
    }
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AuthenticationError('token expired'));
    }
    next(new AuthorizationError('not enough access'));
  }
};