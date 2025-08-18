import { useLazyGetOneUserQuery, useUpdateUserMutation } from '@/api/endpoints/userEndpoints';
import useModal from '@/hooks/useModal';
import { User } from '@/models/types/user.types';

export const useFetchUpdateUser = () => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [fetchUser, { data, isLoading: isUserLoading, isError }] = useLazyGetOneUserQuery();
  const { notification } = useModal();

  const onEdit = async (
    formData: User,
    userId: number,
    setModalOpenClose: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    // Try to update the user data
    try {
      // replace with ------------- useValidate()
      // if (!formData.name || !formData.email || !formData.username || !formData.phone) throw new Error('Required fields are empty!');
      // if (!userId) throw new Error('User id not found. Please refresh the page');

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
  const fetchUserDataById = async (userId: number, setFormData: React.Dispatch<React.SetStateAction<User>>) => {
    if (!userId) return;

    try {
      const userData = await fetchUser(userId).unwrap();

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

      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  return {
    isLoading,
    isUserLoading,
    isError,
    onEdit,
    fetchUserDataById,
  };
};
