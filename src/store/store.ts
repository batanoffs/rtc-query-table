import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';

import rootReducer from './rootReducer';
import restApi from '../api/api';

/**
 * TODO: What is Immer??
 * Immer is a library that allows you to work with immutable state in a more convenient way.
 * It lets you write code as if you're mutating the state directly, while it takes care of producing the next immutable state for you.
 */

export const store = configureStore({
  // In the reducer object we can specify the reducers for our slices
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(restApi.middleware),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
