import { useCallback, useEffect } from 'react';
import { Button, Modal, Result } from 'antd';
import { useDispatch } from 'react-redux';

import initialUserValues from '@/pages/UsersPage/constants/initialState';
import UserDataForm from '@/pages/UsersPage/components/form/UserDataForm';
import { useForm } from '../../hooks/useForm';
import { useFetchUpdateUser } from '../../hooks/useRequestUser';
import { setSelectedUserId } from '@/store/slices/usersSlicer';

type EditUserModalProps = {
  userId?: number;
  isEditMode: boolean;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserModalForm: React.FC<EditUserModalProps> = ({ userId, isOpen, setOpen }) => {
  const {
    isUpdating,
    isUserLoading,
    isCreating,
    isFetchUserError,
    isUpdatingError,
    isCreatingError,
    submitCreateUser,
    submitUserChanges,
    fetchAndSetUserData,
  } = useFetchUpdateUser();

  const { formData, isDisabled, onChange, setFormData, handleSubmit } = useForm(initialUserValues);
  const dispatch = useDispatch();

  const isEditMode = !!userId;

  if (isFetchUserError)
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

  const onSubmit = () => {
    if (isEditMode) submitUserChanges(formData, userId, setOpen);
    if (!isEditMode) submitCreateUser(formData, setOpen);
    dispatch(setSelectedUserId(null));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData(initialUserValues);
    dispatch(setSelectedUserId(null));
  };

  const fetchUser = useCallback(() => {
    if (userId) fetchAndSetUserData(userId, setFormData);
  }, [userId, fetchAndSetUserData]);

  useEffect(() => {
    if (userId && isOpen) fetchUser();
  }, [userId, isOpen]);

  // TODO if no id is passed change the form to add user
  return (
    <Modal
      title={isEditMode ? `Edit User: ${formData.name}` : 'Add User'}
      open={isOpen}
      onCancel={handleCancel}
      confirmLoading={isUserLoading}
      width={720}
      centered
      footer={null}
      loading={isCreating || isUpdating}
    >
      <UserDataForm
        formData={formData}
        handleSubmit={handleSubmit(onSubmit)}
        isUserLoading={isUserLoading}
        isDisabled={isDisabled}
        onChangeHandler={changeHandler}
      />
    </Modal>
  );
};
