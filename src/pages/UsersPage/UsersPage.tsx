import { Flex, Modal } from 'antd';
import { useState } from 'react';

import UserTable from '../../components/Table/UsersTable';
import UserForm from './UserForm';

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen((state) => !state);
  };

  return (
    <Flex style={{ background: '#fff' }}>
      <Flex vertical style={{ width: '100%' }}>
        <UserTable showModal={toggleModal} />
      </Flex>

      <Modal
        title="Add New User"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={toggleModal}
        centered
        footer={null}
        maskClosable={false}
        keyboard
        onCancel={toggleModal}
      >
        <UserForm setIsModalOpen={toggleModal} />
      </Modal>
    </Flex>
  );
};

export default UsersPage;
