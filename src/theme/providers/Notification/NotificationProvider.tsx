import { notification } from 'antd';
import { FC, ReactNode, useEffect } from 'react';
import { NotificationContext } from './NotificationContext';
import NotificationService from './NotificationService';

export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notificationApi, contextHolder] = notification.useNotification({ placement: 'bottomRight' });

  useEffect(() => {
    NotificationService.setNotificationApi(notificationApi);
  }, [notificationApi]);

  return (
    <NotificationContext.Provider value={notificationApi}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
