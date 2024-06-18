import express from 'express';
import videoItemsController from '../controller/videoItemsController.js';

const videoItemRouter = express.Router();

videoItemRouter.get('/videoItems', videoItemsController.getAllVideoItems);
videoItemRouter.get('/videoItems/:id', videoItemsController.getVideoItemsById);
videoItemRouter.post('/videoItems', videoItemsController.addVideoItems);
videoItemRouter.delete('/videoItems/:id', videoItemsController.deleteVideoItems);

export default videoItemRouter;
