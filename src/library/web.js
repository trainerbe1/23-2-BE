import express from "express";
import helmet from "helmet";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import morganMiddleware from "../middleware/morganMiddleware.js";


export const web = express();
web.use(express.json());
web.use(helmet());

web.use(morganMiddleware);
web.use(errorMiddleware);
