import { configureStore, combineReducers } from "@reduxjs/toolkit";
import videoSlice from "./video/videoSlice";
import storageSession from "redux-persist/lib/storage/session";
/* import storage from "redux-persist/lib/storage"; /이건 로컬스토리지부를때 */
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["video"],
};
const reducer = combineReducers({
  video: videoSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
