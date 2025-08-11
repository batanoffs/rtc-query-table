import { Flex, Modal } from 'antd';
import { useState } from 'react';

import UserTable from '../../components/Table/UsersTable';
import UserForm from './UserForm';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex style={{ background: '#fff' }}>
      <Flex vertical style={{ width: '100%' }}>
        <UserTable showModal={showModal} />
      </Flex>

      <Modal
        title="Add New User"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        centered
        footer={null}
        maskClosable={false}
        keyboard
        onCancel={handleCancel}
      >
        <UserForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </Flex>
  );
};

export default UsersPage;
