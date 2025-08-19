import { FC, MouseEvent } from 'react';
import { Modal } from 'antd';
import AddUserModal from './AddUserModal';


type CreateModalProps = {
  toggleOpenClose: (event: MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
};

const CreateUserModal: FC<CreateModalProps> = ({ toggleOpenClose, isOpen }) => {
  const handleModalClose = (isOpen: boolean) => {
    const syntheticEvent = {
      preventDefault: () => {},
      stopPropagation: () => {},
      currentTarget: document.createElement('button'),
    } as MouseEvent<HTMLButtonElement>;
    toggleOpenClose(syntheticEvent);
  };

  return (
    <Modal
      title="Add New User"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onOk={toggleOpenClose}
      centered
      footer={null}
      maskClosable={true}
      keyboard
      onCancel={toggleOpenClose}
    >
      <AddUserModal setIsModalOpen={handleModalClose} />
    </Modal>
  );
};

export default CreateUserModal;
