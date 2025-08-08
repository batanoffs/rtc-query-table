import { Button, Form, Modal } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { useState } from 'react';
import { IUser } from '@/types/user.types';
import { useUpdateUserMutation } from '../../../api/endpoints/userEndpoints';
import UserForm from '../../Form/UserForm';

interface EditUserModalProps {
  rowData: IUser;
}

export const EditUserModal = ({ rowData }: EditUserModalProps) => {
  const [form] = Form.useForm();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateUser({ id: rowData.id.toString(), user: values });
      setIsModalOpen(false);
      form.resetFields();
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
        <UserForm form={form} initialValues={rowData} />
      </Modal>
    </>
  );
};
