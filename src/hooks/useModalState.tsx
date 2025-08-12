import { useState } from 'react';

export const useModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    return setIsModalOpen((state) => !state);
  };

  const modalProps = {
    isModalOpen,
    toggleModal,
  };

  return {
    modalProps,
  };
};
