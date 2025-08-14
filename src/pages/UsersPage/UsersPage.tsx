import { Flex, Modal } from 'antd';
import React, { useState } from 'react';

import AddUserForm from './AddNewUserForm';
import ExampleFormModal from '@/components/Modal/ExampleFormModal';

type UsersPageProps = {
  tableComponent: React.ComponentType<any>;
};

const UsersPage: React.FC<UsersPageProps> = ({ tableComponent: TableComponent }) => {
  const [isOpen, setOpen] = useState<boolean>();

  const toggleOpenClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Flex justify="center" align="center">
      <TableComponent toggleOpenClose={toggleOpenClose} />

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
        <AddUserForm setIsModalOpen={toggleOpenClose} />
        <ExampleFormModal />
      </Modal>
    </Flex>
  );
};

export default UsersPage;
