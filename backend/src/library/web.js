import express from "express";
import helmet from "helmet";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import {errorMiddleware} from "../middleware/errorMiddleware.js";
import morganMiddleware from "../middleware/morganMiddleware.js";
import usersRouter from '../routes/usersRoutes.js';
import ingredientsRouter from '../routes/ingredientsRouter.js';
import categoryRouter from '../routes/categoryRoutes.js';
import videoRouter from "../routes/videoRoutes.js";
import recipesRouter from "../routes/recipesRoutes.js";

export const web = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
web.use(express.json());
web.use(helmet());
web.use(cors());
web.use(cookieParser());
web.use(express.urlencoded({extended:true}));

web.use('/api/v1', express.static(path.join(__dirname, '../public')));
web.use('/api/v1', usersRouter);
web.use('/api/v1', ingredientsRouter);
web.use('/api/v1', categoryRouter);
web.use('/api/v1', videoRouter);
web.use('/api/v1', recipesRouter);

web.use(morganMiddleware);
web.use(errorMiddleware);
