import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/userSlice";


export const persistConfig = {
    key: "task",
    version: 1,
    storage,
};
const combinedReducer = combineReducers({
    auth: authSlice,
    user: userSlice
})

const rootReducer = (state, action) => {
    if (action.type === 'auth/removeToken') {
        state = undefined
    }
    return combinedReducer(state, action)
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);