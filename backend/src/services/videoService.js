import { prismaClient } from '../library/database.js';
import { NotFoundError } from "../exceptions/NotFoundError.js";
import { nanoid } from 'nanoid';

const getAllVideos = async () => {
  const videos = await prismaClient.video.findMany();
  return videos;
};

const getVideoById = async (id) => {
  const video = await prismaClient.video.findUnique({
    where: { id: id },
  });

  if (!video) {
    throw new NotFoundError('Video not found');
  }

  return video;
};

const createVideo = async (payload) => {
  const newVideo = {
    id: `video-${nanoid(16)}`,
    name: payload.name,
    link: payload.link,
  };

  return prismaClient.video.create({
    data: newVideo,
  });
};

const deleteVideo = async (id) => {
  return prismaClient.video.delete({
    where: { id: id },
  });
};

const updateVideo = async (id, payload) => {
  return prismaClient.video.update({
    where: { id: id },
    data: payload,
  });
};

export default { getAllVideos, getVideoById, createVideo, deleteVideo, updateVideo };
