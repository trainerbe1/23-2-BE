import express from 'express';
import { getAllVideos, getVideoById, createVideo, deleteVideo, updateVideo } from '../controller/videoController.js';

const videoRouter = express.Router();

videoRouter.get('/videos', getAllVideos);
videoRouter.get('/videos/:id', getVideoById);
videoRouter.post('/videos', createVideo);
videoRouter.delete('/videos/:id', deleteVideo);
videoRouter.put('/videos/:id', updateVideo);

export default videoRouter;
