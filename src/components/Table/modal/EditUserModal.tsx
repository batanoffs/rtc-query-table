import { Button, Modal } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { useState, useEffect } from 'react';

import { useLazyGetOneUserQuery, useUpdateUserMutation } from '../../../api/endpoints/userEndpoints';
import { User } from '@/shared/types/user.types';
import initialUserValues from '@/pages/UsersPage/constants';
import UserDataForm from '@/components/Form/UserDataForm';

type EditUserModalProps = {
  rowData: User;
  userId?: number;
};

export const EditUserModal: React.FC<EditUserModalProps> = ({ rowData, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialUserValues);
  const [fetchUser, { data, isLoading: isUserLoading }] = useLazyGetOneUserQuery();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // if (!userId) {
  //   return <Empty />;
  // }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(`Getting event data for ${name}: ${value}`);

    setFormData((prev) => {
      console.log('Log prev state', prev);

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      await updateUser({ id: rowData.id, user: formData });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setFormData((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  useEffect(() => {
    if (userId && isModalOpen) {
      fetchUser(userId);
    }
  }, [fetchUser, userId, isModalOpen]);

  return (
    <>
      <Button icon={<EditFilled />} loading={isUserLoading} onClick={showModal}>
        Edit
      </Button>

      <Modal
        title={`Edit User: ${rowData.name}`}
        open={isModalOpen}
        onOk={handleSubmit}
        okButtonProps={{
          title: 'Create',
        }}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        width={720}
        centered
        footer={null}
        loading={isUserLoading}
      >
        <UserDataForm
          formData={formData}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          onChangeHandler={onChangeHandler}
        />
      </Modal>
    </>
  );
};
