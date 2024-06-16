import videoService from '../services/videoService.js';

const getAllVideos = async (req, res, next) => {
  try {
    const videos = await videoService.getAllVideos();
    res.status(200).json({
      status: 'success',
      data: videos,
    });
  } catch (e) {
    next(e);
  }
};

const getVideoById = async (req, res, next) => {
  try {
    const video = await videoService.getVideoById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: video,
    });
  } catch (e) {
    next(e);
  }
};

const createVideo = async (req, res, next) => {
  try {
    const video = await videoService.createVideo(req.body);
    res.status(201).json({
      status: 'success',
      data: video,
    });
  } catch (e) {
    next(e);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    await videoService.deleteVideo(req.params.id);
    res.status(200).json({
      status: 'success',
      message:'Video Berhasil dihapus!',
    });
  } catch (e) {
    next(e);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const video = await videoService.updateVideo(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: video,
    });
  } catch (e) {
    next(e);
  }
};

export default{getAllVideos, getVideoById, createVideo, deleteVideo, updateVideo};