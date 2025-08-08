import RestApi from "../api";
import UserService from "../services/userService";
import { IUser } from '@/types/user.types';


const usersApi = RestApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get all users in the DB
        getUsers: builder.query<IUser[], void>({
            queryFn: async () => {
                try {
                    const response = await UserService.getUsers();
                    return { data: response.data };
                } catch (error) {
                    return { error }
                }
            },
            //TODO: What is is this tag for?
            // This tag is used to invalidate the cache when a user is created, updated, or deleted
            // so that the list of users is always up-to-date.??
            providesTags: ['USERS'],
        }),

        // Get one user by ID
        getOneUser: builder.query<IUser, string>({
            queryFn: async (id) => {
                try {
                    const response = await UserService.getOne(id);
                    return { data: response.data };
                } catch (error) {
                    return { error }
                }
            },
            providesTags: ['ONE_USER'],
        }),

        // Update a specific user by ID
        updateUser: builder.mutation<IUser, { id: string; user: IUser }>({
            queryFn: async ({ id, user }) => {
                try {
                    const response = await UserService.updateUser(id, user);
                    return { data: response.data };
                } catch (error) {
                    return { error }
                }
            },
            invalidatesTags: ['USERS'],
        }),

        // Delete a specific user by ID
        deleteUser: builder.mutation<void, string>({
            queryFn: async (id) => {
                try {
                    await UserService.deleteUser(id);
                    return { data: undefined };
                } catch (error) {
                    return { error }
                }
            },
            invalidatesTags: ['USERS'],
        }),

        // Create a new user
        createUser: builder.mutation<IUser, IUser>({
            queryFn: async (user) => {
                try {
                    const response = await UserService.createUser(user);
                    return { data: response.data };
                } catch (error) {
                    return { error }
                }
            },
            invalidatesTags: ['USERS'],
        }),
    })
});

export const {
    useGetUsersQuery,
    useGetOneUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useCreateUserMutation,
} = usersApi;

export default usersApi;
