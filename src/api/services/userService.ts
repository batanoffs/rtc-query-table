import axios from 'axios';

import { IUser } from '@/types/user.types';
import { BASE_URL } from '../constants';

const urls = {
  base: BASE_URL,
  users: `${BASE_URL}/users`,
};

const getUsers = () => {
  return axios.get<IUser[]>(urls.users);
};

const getOne = (id: string) => {
  return axios.get<IUser>(`${urls.users}/${id}`);
};

const createUser = (user: IUser) => {
  return axios.post<IUser>(urls.users, user);
};

const updateUser = (id: string, user: IUser) => {
  return axios.put<IUser>(`${urls.users}/${id}`, user);
};

const deleteUser = (id: string) => {
  return axios.delete<void>(`${urls.users}/${id}`);
};

const UserService = {
  getUsers,
  getOne,
  createUser,
  deleteUser,
  updateUser,
  urls,
};

export default UserService;
