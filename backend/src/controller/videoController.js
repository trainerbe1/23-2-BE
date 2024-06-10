import videoService from '../services/videoService.js';

export const getAllVideos = async (req, res, next) => {
  try {
    const videos = await videoService.getAllVideos();
    res.status(200).json({
      status: 'success',
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};

export const getVideoById = async (req, res, next) => {
  try {
    const video = await videoService.getVideoById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: video,
    });
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req, res, next) => {
  try {
    const video = await videoService.createVideo(req.body);
    res.status(201).json({
      status: 'success',
      data: video,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    await videoService.deleteVideo(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await videoService.updateVideo(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: video,
    });
  } catch (error) {
    next(error);
  }
};
