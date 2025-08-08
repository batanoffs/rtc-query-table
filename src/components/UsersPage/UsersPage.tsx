import UserTable from '../Table/UsersTable';
import { useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import UserForm from '../Form/UserForm';

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
    <>
      <Flex>
        <UserTable />

        <Button type="primary" onClick={showModal}>
          Create New User
        </Button>
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
        {/* Modal content can be added here if needed */}
        <UserForm />
      </Modal>
    </>
  );
};

export default UsersPage;
