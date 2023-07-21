// Importing the necessary functions from Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Importing the types for the responses we expect from our API calls
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from '@/state/types';

/* CREATE API USING REDUX TOOLKIT QUERY */
// Using createApi to define a set of endpoints for our API
// This is where we specify how to interact with our backend
export const api = createApi({
  // fetchBaseQuery is a basic fetch function from Redux Toolkit Query
  // We're setting the base URL for our API calls here
  // The URL is taken from the environment variables file
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),

  // A name of the reducer and the slice of the Redux store that this API will interact with
  reducerPath: 'main',

  // Important: The types of tags are the names this API will to save within the
  // store. Tags invalidate, refetch, and react to actions in the Redux store. We
  // define tags here and additionally specify which endpoints they belong toward.
  tagTypes: ['Kpis', 'Products', 'Transactions'],

  // Defining the endpoints for our API
  // This is where we specify the actual API calls that we can make
  endpoints: (build) => ({
    // The query is the path of the endpoint, relative to the base URL
    // The tags that this endpoint provides and belongs with
    // When an action for this endpoint is dispatched, it will affect the cache for these tags

    // Defining a query to get KPIs
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => 'kpi/kpis/',
      providesTags: ['Kpis'],
    }),
    // Defining a query to get products
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => 'product/products/',
      providesTags: ['Products'],
    }),
    // Defining a query to get transactions
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => 'transaction/transactions/',
      providesTags: ['Transactions'],
    }),
  }),
});

/* EXPORTING HOOKS TO MAKE API CALLS */
// Hooks that allow us to make these API calls in our components The names of
// these hooks are automatically generated based on the names of our endpoints
// After defining the API using createApi, we integrate it with the Redux store!
export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
  api;

/* Redux Toolkit Query (RTK Query) provides several powerful features

1. **Automatic Caching**: RTK Query automatically caches data as you fetch it.
   This means that if you try to fetch the same data again, RTK Query will
   return the cached data instead of making a new request. This de-dep feature
   significantly improves the performance of your application.

2. **Automatic Refetching**: RTK Query can automatically refetch data in certain
   situations. For example, it can refetch data when the app regains focus or
   reconnects to the internet. Or refetch based on a polling interval specify.

3. **Automatic Retrying**: If a request fails, RTK Query can automatically retry
   it a certain number of times with exponential back off.

4. **Mutations and Invalidations**: RTK Query provides a way to perform
   mutations (CRUD operations) and then invalidate specific pieces of cached
   data so they will be re-fetched the next time they are needed.

5. **Parallel and Dependent Queries**: You can make multiple queries at once and
   wait for all of them to complete, or you can make dependent queries where one
   query depends on data from another.

6. **WebSockets/RTCs**: RTK Query provides a way to manage WebSocket and RTC
   connections and automatically dispatch actions when messages are received.

7. **Pagination and Server-side Sorting**: RTK Query supports features like
   pagination and server-side sorting, which can be essential for dealing with
   large amounts of data in a performant way.

8. **React Hooks**: RTK Query auto generate hooks for you to use in components.
   These hooks encapsulate the entire process of dispatching actions, selecting
   data from the store, and handling loading and error states.

9. **Code Generation**: If you have an OpenAPI or GraphQL schema, RTK Query can
   generate your entire API slice, including endpoints and hooks, automatically.

10. **Normalization**: RTK Query supports normalization of data, which can help
    to reduce redundancy and performance when dealing with complex/nested data.

These features can significantly reduce the amount of boilerplate code you have
to write, make your code easier to read and maintain, and improve the
performance of your application. */
