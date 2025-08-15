import axios from 'axios';

import { User } from '@/models/types/user.types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const urls = {
  base: BASE_URL,
  users: `${BASE_URL}/users`,
};

const getUsers = () => {
  return axios.get<User[]>(urls.users);
};

const getOne = (id: number) => {
  return axios.get<User>(`${urls.users}/${id}`);
};

const createUser = (user: User) => {
  return axios.post<User>(urls.users, user);
};

const updateUser = (id: number, user: User) => {
  return axios.put<User>(`${urls.users}/${id}`, user);
};

const deleteUser = (id: number) => {
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
