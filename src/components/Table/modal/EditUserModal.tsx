import { Button, Modal } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { useState } from 'react';

import { useUpdateUserMutation } from '../../../api/endpoints/userEndpoints';
import { User } from '@/pages/UsersPage/types/user.types';
import UserForm from '@/pages/UsersPage/UserForm';

type EditUserModalProps = {
  rowData: User;
};

export const EditUserModal = ({ rowData }: EditUserModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await updateUser({ id: rowData.id.toString(), user: values });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <>
      <Button icon={<EditFilled />} onClick={showModal}>
        Edit
      </Button>

      <Modal
        title={`Edit User: ${rowData.name}`}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        width={720}
        centered
      >
        {/* <UserForm setIsModalOpen={ } /> */}
      </Modal>
    </>
  );
};
