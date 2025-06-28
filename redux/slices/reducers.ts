import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import todoReducer from "./todoSlice";
const persistConfig = {
    key:"root",
    storage,

    
}

const rootReducer =combineReducers({
    todo: persistReducer(persistConfig,todoReducer),
})

export default rootReducer;
