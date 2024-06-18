import { prismaClient } from '../library/database.js';
import { NotFoundError } from "../exceptions/NotFoundError.js";
import { nanoid } from 'nanoid';

const getAllVideoItems = async () => {
  const videoItems = await prismaClient.videoItem.findMany();
  return videoItems;
};

const getVideoItemsById = async (id) => {
  const videoitems = await prismaClient.videoItem.findUnique({
    where: { id: id },
    include: {
      video: true
    },
  });

  if (!videoitems) {
    throw new NotFoundError('VideoItem not found');
  }

  return videoitems;
};

const addVideoItems = async (payload) => {
  const newVideo = {
    id: `videoItem-${nanoid(16)}`,
    video_id: payload.video_id,
    link: payload.link,
  };

  return prismaClient.videoItem.create({
    data: newVideo,
  });
};

const deleteVideoItems = async (id) => {
  const videoItem = prismaClient.videoItem.delete({
  // return prismaClient.videoItem.delete({
    where: { id: id },
  });

  if(!videoItem) {
    throw new NotFoundError('id not found');
  }

  return videoItem;
};

export default { getAllVideoItems, getVideoItemsById, addVideoItems, deleteVideoItems};
