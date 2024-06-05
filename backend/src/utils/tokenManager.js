import Jwt from 'jsonwebtoken';
import { config } from './config.js';

  export const generateAccessToken = (payload) => {
    return Jwt.sign(payload, config.jwtToken.accessToken, {expiresIn: config.jwtToken.ageToken});
  };

  export const generateRefreshToken = (payload) => {
    return Jwt.sign(payload, config.jwtToken.refreshToken);
  };
