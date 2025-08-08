import { Button, Flex, Form, Modal } from 'antd';
import { useState } from 'react';

import UserTable from '../Table/UsersTable';
import UserForm from '../Form/UserForm';
import initialUserValues from './constants';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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
      >``
        {/* Modal content can be added here if needed */}
        <UserForm form={form} initialValues={initialUserValues} />
      </Modal>
    </>
  );
};

export default UsersPage;
