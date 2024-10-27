import axios from 'axios';
import axiosInstance from './axios';
import {getEncryptStorage} from '@/utils';

type RequestUser = {
  email: string;
  password: string;
  passwordConfirm?: string;
  nickname?: string;
};

const postSignup = async ({
  nickname,
  email,
  password,
  passwordConfirm,
}: RequestUser) => {
  const {data} = await axiosInstance.post(`/auth/signup`, {
    nickname,
    email,
    password,
    passwordConfirm,
  });

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post(`/auth/login`, {email, password});

  return data;
};

const getProfile = async () => {
  const {data} = await axiosInstance.get(`/auth/profile`);

  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const {data} = await axiosInstance.get(`/auth/refresh`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async () => {
  await axiosInstance.post(`/auth/logout`);
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
