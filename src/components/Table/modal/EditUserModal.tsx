import { Button, Empty, Modal } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';

import { useLazyGetOneUserQuery, useUpdateUserMutation } from '../../../api/endpoints/userEndpoints';
import initialUserValues from '@/pages/UsersPage/constants';
import UserDataForm from '@/components/Form/UserDataForm';
import useModal from '@/hooks/useModal';

type EditUserModalProps = {
  userId?: number;
};

type FormData = typeof initialUserValues;

export const EditUserModal: React.FC<EditUserModalProps> = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>(initialUserValues);
  const [fetchUser, { data, isLoading: isUserLoading }] = useLazyGetOneUserQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { notification } = useModal();

  if (!userId) {
    return <Empty />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData(initialUserValues);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Debug
    console.log({ name, value });

    // Set state
    setFormData((prev) => {
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
          message: `Failed to fetch data for user ${userId}`,
        });

        if (error instanceof Error) console.error(error.message);

        console.log(error);
      }
    },
    [fetchUser, data, userId, isModalOpen],
  );

  useEffect(() => {
    if (userId && isModalOpen) {
      fetchUserDataById(userId);
    }
  }, [userId, isModalOpen]);

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
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isDisabled={isDisabled}
          onChangeHandler={onChangeHandler}
        />
      </Modal>
    </>
  );
};
