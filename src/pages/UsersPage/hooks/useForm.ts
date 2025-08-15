import { useCallback, useEffect, useState } from 'react';

import { useLazyGetOneUserQuery, useUpdateUserMutation } from '@/api/endpoints/userEndpoints';
import useModal from '@/hooks/useModal';
import { User } from '@/models/types/user.types';

type FormValues = {
  initialState: User;
  userId?: number;
  isModalOpen: boolean;
};

export const useForm = ({ initialState, userId, isModalOpen }: FormValues) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<User>(initialState);
  const [fetchUser, { data, isLoading: isUserLoading }] = useLazyGetOneUserQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { notification } = useModal();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onSubmit = async (userId: number, setModalOpenClose: React.Dispatch<React.SetStateAction<boolean>>) => {
    // Try to update the user data
    try {
      if (!formData.name || !formData.email || !formData.username || !formData.phone)
        throw new Error('Required fields are empty!');

      if (!userId) throw new Error('User id not found. Please refresh the page');

      await updateUser({ id: userId, user: formData });

      setModalOpenClose(false);

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

        // Debug
        // console.log(`Fetching for User:${userId} data... /\n`, userData);

        if (userData) {
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

  return {
    isLoading,
    isUserLoading,
    formData,
    isDisabled,
    onChange,
    onSubmit,
    setFormData,
  };
};
