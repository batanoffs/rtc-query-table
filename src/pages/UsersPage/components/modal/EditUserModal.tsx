import { useCallback, useEffect, useState } from 'react';
import { Button, Empty, Modal, Result } from 'antd';
import { EditFilled } from '@ant-design/icons';

import initialUserValues from '@/pages/UsersPage/constants/initialState';
import UserDataForm from '@/pages/UsersPage/components/form/UserDataForm';
import { useForm } from '../../hooks/useForm';
import { useRequestUser } from '../../hooks/useRequestUser';

type EditUserModalProps = {
  userId?: number;
};

export const EditUserModal: React.FC<EditUserModalProps> = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { onEdit, isLoading, isError, fetchUserDataById, isUserLoading } = useRequestUser();
  const { formData, isDisabled, onChange, setFormData, handleSubmit } = useForm(initialUserValues);

  // TODO if no id is passed change the form to add user
  if (!userId) return;

  if (isError) {
    return (
      <Result
        status="error"
        title="There are some problems with your operation."
        extra={
          <Button type="primary" key="console">
            Go Console
          </Button>
        }
      />
    );
  }

  const onSubmit = () => {
    onEdit(formData, userId, setIsModalOpen);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData(initialUserValues);
  };

  const fetchUser = useCallback(() => {
    if (userId) {
      fetchUserDataById(userId, setFormData);
    }
  }, [userId, fetchUserDataById]);

  useEffect(() => {
    if (userId && isModalOpen) {
      fetchUser();
    }
  }, [userId, isModalOpen]);

  return (
    <>
      <Button icon={<EditFilled />} loading={isUserLoading} onClick={() => setIsModalOpen(true)}>
        Edit
      </Button>

      <Modal
        title={`Edit User: ${formData.name}`}
        open={isModalOpen}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        width={720}
        centered
        footer={null}
        loading={isUserLoading}
      >
        <UserDataForm
          formData={formData}
          handleSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
          isDisabled={isDisabled}
          onChangeHandler={changeHandler}
        />
      </Modal>
    </>
  );
};
