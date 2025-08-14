import { Flex, Modal } from 'antd';
import React, { useState } from 'react';

import AddUserModal from './AddUserModal';

type UsersPageProps = {
  Table: React.ComponentType<any>;
};

const UsersPage: React.FC<UsersPageProps> = ({ Table: TableComponent }) => {
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
        <AddUserModal setIsModalOpen={toggleOpenClose} />
      </Modal>
    </Flex>
  );
};

export default UsersPage;
