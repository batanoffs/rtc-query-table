import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * @method createApi - isn’t just a naming convention—it's the foundation of RTK Query.
 * It sets up the built-in logic for data fetching, cache management, middleware, and hook generation.
 * Using it means you get all this powerful functionality with minimal code and maintainable architecture.
 */

const RestApi = createApi({
  reducerPath: 'JSONPlaceholderApi',
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ['USERS', 'ONE_USER'],
});

export default RestApi;
