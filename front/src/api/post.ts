import axiosInstance from './axios';
import {ImageUri, Post} from '@/types';

type ResponsePost = Post & {images: ImageUri[]};

type RequsetCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const createPost = async (body: RequsetCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);
  return data;
};

export {createPost};
export type {RequsetCreatePost, ResponsePost};
