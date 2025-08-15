import { Button, Empty, Modal } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { FormEvent, useState } from 'react';

import initialUserValues from '@/pages/UsersPage/constants/initialState';
import UserDataForm from '@/pages/UsersPage/components/form/UserDataForm';
import { useForm } from '../../hooks/useForm';

type EditUserModalProps = {
  userId?: number;
};

export const EditUserModal: React.FC<EditUserModalProps> = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { formData, isDisabled, isLoading, isUserLoading, onChange, setFormData, onSubmit } = useForm({
    initialState: initialUserValues,
    isModalOpen,
    userId,
  });

  if (!userId) {
    return <Empty />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const submitHandler = (userId: number) => {
    onSubmit(userId, setIsModalOpen);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData(initialUserValues);
  };

  return (
    <>
      <Button icon={<EditFilled />} loading={isUserLoading} onClick={showModal}>
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
          handleSubmit={submitHandler}
          isLoading={isLoading}
          isDisabled={isDisabled}
          onChangeHandler={changeHandler}
        />
      </Modal>
    </>
  );
};
