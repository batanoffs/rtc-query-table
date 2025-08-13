import { NotificationContext } from '@/theme/providers/Notification/NotificationContext';
import { ModalContext } from '../theme/providers/Modal/ModalContext';
import { useContext } from 'react';

export const useModal = () => {
  const modalApi = useContext(ModalContext);

  return modalApi;
};

export const useNotification = () => {
  const notificationApi = useContext(NotificationContext);
  
  return notificationApi;
};

export default () => {
  const notification = useNotification();
  const modal = useModal();

  return { modal, notification };
};
