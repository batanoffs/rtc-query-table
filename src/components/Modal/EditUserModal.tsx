import { Empty, Form } from 'antd';
import { useState, useEffect, useCallback } from 'react';

import { useLazyGetOneUserQuery, useUpdateUserMutation } from '../../api/endpoints/userEndpoints';
import initialUserValues from '@/pages/UsersPage/constants';
import ModalEditUser from '@/components/Modal/ModalEditUser';
import useModal from '@/hooks/useModal';
import { User } from '@/shared/types/user.types';
import { useModalState } from '@/hooks/useModalState';

type EditUserModalProps = {
  userId?: number;
};

export const EditUserModal: React.FC<EditUserModalProps> = ({ userId }) => {
  const [fetchUser, { data, isLoading: isUserLoading }] = useLazyGetOneUserQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [form] = Form.useForm<User>();
  const { notification } = useModal();
  const { modalProps } = useModalState();

  if (!userId) {
    return <Empty />;
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Debug
    console.log({ name, value });

    // form.setFieldValue('name', value);

    // Set state
    form.setFieldsValue((prev) => {
      // Get nested keys by splitting
      const keys = name.split('.');

      // Return callback - Map the nested keys in the object for "address.street" to change the value
      return keys.reduceRight((acc, key, index) => {
        // Check if nesting is present
        if (index === keys.length - 1) {
          // Top-level property
          return { ...prev, [key]: value };
        }

        // Else handle nesting by accessing the array index and destructuring with the spread operator
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      }, prev);
    });

    setIsDisabled(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // setFormData(initialUserValues);
  };

  const handleSubmit = async () => {
    // Try to update the user data
    try {
      if (!formData.name || !formData.email || !formData.username || !formData.phone)
        throw new Error('Required fields are empty!');

      if (!userId) throw new Error('User id not found. Please refresh the page');

      await updateUser({ id: userId, user: formData });

      setIsModalOpen(false);

      notification.success({ message: 'Success' });
    } catch (error) {
      // Catch any errors
      console.error('Error updating user:', error);

      if (error instanceof Error) {
        notification.error({ message: error.message });
      } else {
        notification.error({ message: 'Whops, something went wrong' });
      }
    }
  };

  // Callback func to trigger data fetch
  const fetchUserDataById = useCallback(
    async (userId: number) => {
      try {
        const userData = await fetchUser(userId).unwrap();

        console.log(`Fetching for User:${userId} data... /\n`, userData);

        if (userData) {
          console.log({ userData });
          // TODO check how to do with ant logic
          setFormData({
            id: userData.id,
            name: userData.name || '',
            username: userData.username || '',
            email: userData.email || '',
            phone: userData.phone || '',
            website: userData.website || '',
            company: {
              name: userData.company?.name || '',
            },
            address: {
              street: userData.address?.street || '',
              suite: userData.address?.suite || '',
              city: userData.address?.city || '',
              zipcode: userData.address?.zipcode || '',
            },
          });
        }
      } catch (error) {
        notification.error({
          message: `Failed to get the user data`,
        });

        if (error instanceof Error) console.error(error.message);

        console.log(error);
      }
    },
    [fetchUser, data, userId, modalProps.isModalOpen],
  );

  useEffect(() => {
    if (userId && modalProps.isModalOpen) {
      fetchUserDataById(userId);
    }
  }, [userId, modalProps.isModalOpen]);

  return (
    <ModalEditUser
      onChange={onChangeHandler}
      form={form}
      initialValues={initialUserValues}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={isDisabled}
      isModalOpen={modalProps.isModalOpen}
      handleCancel={handleCancel}
      isUserLoading={isUserLoading}
    />
  );
};
