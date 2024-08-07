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
import videoItemRouter from "../routes/videoItemsRoutes.js";
import recipesRouter from "../routes/recipesRoutes.js";
import favoriteRouter from "../routes/favoriteRoutes.js";
import groceriesRouter from "../routes/groceriesRoutes.js";

export const web = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
web.use(express.json());
web.use(helmet());
web.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
web.use(cookieParser());
web.use(express.urlencoded({extended:true}));

web.use('/api/v1', express.static(path.join(__dirname, '../public')));
web.use('/api/v1', usersRouter);
web.use('/api/v1', ingredientsRouter);
web.use('/api/v1', categoryRouter);
web.use('/api/v1', videoRouter);
web.use('/api/v1', videoItemRouter);
web.use('/api/v1', recipesRouter);
web.use('/api/v1', favoriteRouter);
web.use('/api/v1', groceriesRouter);

web.use(morganMiddleware);
web.use(errorMiddleware);
