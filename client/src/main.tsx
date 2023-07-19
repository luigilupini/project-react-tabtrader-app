import ReactDOM from 'react-dom/client';

import App from '@/App';

import { Provider } from 'react-redux';
// Importing the necessary function to create a Redux store
import { configureStore } from '@reduxjs/toolkit';
// Importing the API slice that we defined within the state folder
import { api } from '@/state/api';
// Importing the function to setup listeners for automatic refetching of data
import { setupListeners } from '@reduxjs/toolkit/query';

import '@/styles/index.scss';

// Creating a Redux store
export const store = configureStore({
  // The reducer function for the store is an object that includes the reducer from our API slice
  // The key for the reducer is the same as the 'reducerPath' we defined in our API slice
  reducer: { [api.reducerPath]: api.reducer },

  // The middleware for the store includes the middleware from our API slice
  // We're using the 'getDefault' function to get the default middleware
  // And then adding our api as middleware for the store
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
// Setting up listeners for automatic refetching
// This will make RTK Query automatically refetch data in certain situations
// Like when the app regains focus or reconnects to the internet
setupListeners(store.dispatch);

// Rendering the React app We're wrapping the entire app in a 'Provider'
// component, which makes the Redux store available to all components in the app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
