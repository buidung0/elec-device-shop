import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import ProductSlice from './products/ProductSlice';
import userSlice from './user/userSlice';
import blogSlice from './blog/blogSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const commnonConfig = {
  storage,
};
const userConfig = {
  ...commnonConfig,
  whitelist: ['isLoggedIn', 'token', 'current', 'currentCart'],
  key: 'shop/user',
};

const productConfig = {
  ...commnonConfig,
  whitelist: ['dealDaily'],
  key: 'shop/deal',
};

const blogConfig = {
  ...commnonConfig,
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: persistReducer(productConfig, ProductSlice),
    user: persistReducer(userConfig, userSlice),
    blog: blogSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
