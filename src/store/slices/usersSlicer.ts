import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IUser } from '../../types/user.types';

interface IUserState {
  selectedUserId: number | null;
}

const initialState: IUserState = {
  selectedUserId: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    },
  },
  selectors: {
    selectSelectedUserId: (state: IUserState) => state.selectedUserId,
  },
});

export const { setSelectedUserId } = usersSlice.actions;
export const { selectSelectedUserId } = usersSlice.selectors;

export default usersSlice;
