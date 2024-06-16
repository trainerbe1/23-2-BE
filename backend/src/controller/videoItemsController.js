import videoItemsService from '../services/videoItemsService.js';

const getAllVideoItems = async (req, res, next) => {
  try {
    const videoItems = await videoItemsService.getAllVideoItems();
    res.status(200).json({
      status: 'success',
      data: videoItems,
    });
  } catch (e) {
    next(e);
  }
};

const getVideoItemsById = async (req, res, next) => {
  try {
    const videoItems = await videoItemsService.getVideoItemsById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: videoItems,
    });
  } catch (e) {
    next(e);
  }
};

const addVideoItems = async (req, res, next) => {
  try {
    const videoItem = await videoItemsService.addVideoItems(req.body);
    res.status(201).json({
      status: 'success',
      data: videoItem,
    });
  } catch (e) {
    next(e);
  }
};

const deleteVideoItems = async (req, res, next) => {
  try {
    await videoItemsService.deleteVideoItems(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'video item berhasil dihapus!'
    });
  } catch (e) {
    next(e);
  }
};

export default { getAllVideoItems, getVideoItemsById, addVideoItems, deleteVideoItems};