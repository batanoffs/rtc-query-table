import axiosInstance from '../config/axios';
import { User } from '@/models/types/user.types';

const getUsers = () => {
  return axiosInstance.get<User[]>('/users');
};

const getOne = (id: number) => {
  return axiosInstance.get<User>(`/users/${id}`);
};

const createUser = (user: User) => {
  return axiosInstance.post<User>('/users', user);
};

const updateUser = (id: number, user: User) => {
  return axiosInstance.put<User>(`/users/${id}`, user);
};

const deleteUser = (id: number) => {
  return axiosInstance.delete<void>(`/users/${id}`);
};

const UserService = {
  getUsers,
  getOne,
  createUser,
  deleteUser,
  updateUser,
};

export default UserService;
