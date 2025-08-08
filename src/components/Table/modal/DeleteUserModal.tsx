import { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, notification } from 'antd';
import { Tooltip } from 'antd';

import { useDeleteUserMutation, useGetUsersQuery } from '../../../api/endpoints/userEndpoints';

interface rowDataProps {
  userId: number;
}

export const DeleteUserModal = ({ userId }: rowDataProps) => {
  //const [isOpen, setIsOpen] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const { refetch: getUsers } = useGetUsersQuery();

  const onDelete = () => {
    Modal.confirm({
      title: 'Delete User',
      content: `Are you sure that you want to delete user with ID: ${userId}?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        deleteUser(userId)
          .unwrap()
          .then(() => {
            notification.success({
              message: 'Success',
              description: `User with ID: ${userId} has been successfully deleted.`,
            });

            getUsers();
          })
          .catch((error) => {
            notification.error({
              message: 'Error',
              description: `Failed to delete user with ID ${userId}: ${error.message}`,
            });
          });
      },
    });
  };

  return (
    <Tooltip title="Delete User">
      <Button color="danger" variant="outlined" icon={<DeleteOutlined />} onClick={onDelete} />
    </Tooltip>
  );
};

export default DeleteUserModal;
