import restApi from '../api/api';
import { combineReducers } from '@reduxjs/toolkit';
import usersSlice from './slices/userSSlicer';

const rootReducer = combineReducers({
  [restApi.reducerPath]: restApi.reducer,
  users: usersSlice.reducer,
});

export default rootReducer;
