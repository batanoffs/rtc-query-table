import { Modal } from 'antd';
import { FC, ReactNode, useEffect } from 'react';
import { ModalContext } from './ModalContext';
import ModalService from './ModalService';

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modalApi, contextHolder] = Modal.useModal();

  useEffect(() => {
    ModalService.setModalApi(modalApi);
  }, [modalApi]);


  return (
    <ModalContext.Provider value={modalApi}>
      {contextHolder}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
