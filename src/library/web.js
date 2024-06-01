import express from "express";
import helmet from "helmet";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {errorMiddleware} from "../middleware/errorMiddleware.js";
import morganMiddleware from "../middleware/morganMiddleware.js";
import UsersRouter from '../routes/UsersRoutes.js';


export const web = express();
web.use(express.json());
web.use(helmet());
web.use(cors());
web.use(cookieParser());

web.use('/api/v1', UsersRouter);

web.use(morganMiddleware);
web.use(errorMiddleware);
