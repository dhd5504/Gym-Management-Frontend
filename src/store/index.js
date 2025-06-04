import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const authReducer = persistReducer(authPersistConfig, authSlice.reducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // serializableCheck: false
    }),
});

export default store;
