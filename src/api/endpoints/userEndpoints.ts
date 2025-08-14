import RestApi from '../api';
import UserService from '../services/userService';
import { User } from '@/shared/types/user.types';

// API Endpoints
// GET	/users
// GET	/users/1
// POST	/users
// PUT	/users/1
// PATCH	/users/1
// DELETE	/users/1

const usersApi = RestApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const response = await UserService.getUsers();
          return { data: response.data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['USERS'],
    }),

    getOneUser: builder.query<User, number>({
      queryFn: async (id) => {
        try {
          const response = await UserService.getOne(id);
          return { data: response.data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['ONE_USER'],
    }),

    updateUser: builder.mutation<User, { id: number; user: User }>({
      queryFn: async ({ id, user }) => {
        try {
          const response = await UserService.updateUser(id, user);
          return { data: response.data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['USERS'],
    }),

    deleteUser: builder.mutation<void, number>({
      queryFn: async (id) => {
        try {
          await UserService.deleteUser(id);
          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        // Optimistically remove the user from the cache
        const patchResult = dispatch(
          util.updateQueryData('getUsers', undefined, (users) => {
            const index = users.findIndex((u) => u.id === id);
            if (index !== -1) {
              users.splice(index, 1);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
      // invalidatesTags: ['USERS'],
    }),

    createUser: builder.mutation<User, User>({
      queryFn: async (user) => {
        try {
          const response = await UserService.createUser(user);
          return { data: response.data };
        } catch (error) {
          return { error };
        }
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        let dispatchResult;

        try {
          const res = await queryFulfilled;

          // Update optimistically the user data
          dispatchResult = dispatch(
            util.updateQueryData('getUsers', undefined, (users) => {
              users.push(res.data);
            }),
          );
        } catch (error) {
          console.log(error);
          dispatchResult.undo();
        }
      },
    }),
  }),
});

export const {
  endpoints,
  util,
  useGetUsersQuery,
  useGetOneUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useLazyGetOneUserQuery,
} = usersApi;

export default usersApi;
