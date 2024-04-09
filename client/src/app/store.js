import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/auth/authSlice';
import blogReducer from '../features/blogs/blogSlice'
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from "redux-persist"

const rootReducer = combineReducers({
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  version:1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: {
    user:persistedReducer,
    blog:blogReducer
  },
});


export const persistor = persistStore(store);