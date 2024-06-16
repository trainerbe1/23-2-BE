import express from 'express';
// import { getAllVideos, getVideoById, createVideo, deleteVideo, updateVideo } from '../controller/videoController.js';
import videoController from '../controller/videoController.js';


const videoRouter = express.Router();

videoRouter.get('/videos', videoController.getAllVideos);
videoRouter.get('/videos/:id', videoController.getVideoById);
videoRouter.post('/videos', videoController.createVideo);
videoRouter.delete('/videos/:id', videoController.deleteVideo);
videoRouter.put('/videos/:id', videoController.updateVideo);

export default videoRouter;
