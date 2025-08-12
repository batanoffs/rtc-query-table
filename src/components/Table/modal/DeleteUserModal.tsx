import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, notification, Tooltip } from 'antd';

import { useDeleteUserMutation, useGetUsersQuery } from '../../../api/endpoints/userEndpoints';

type DeleteUserModalProps = {
  userId: number;
  userName: string;
};

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ userId, userName }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const { refetch: getUsers } = useGetUsersQuery();

  const showOnDeleteUser = () => {
    Modal.confirm({
      title: 'Delete User',
      icon: <ExclamationCircleFilled />,
      content: `Are you sure that you want to delete ${userName} with id: ${userId}?`,
      okText: 'Delete',
      okButtonProps: {
        color: 'danger',
        danger: true,
      },
      cancelText: 'Cancel',
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
      <Button
        color="danger"
        variant="outlined"
        loading={isLoading}
        icon={<DeleteOutlined />}
        onClick={showOnDeleteUser}
      />
    </Tooltip>
  );
};

export default DeleteUserModal;
