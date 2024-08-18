import { configureStore } from "@reduxjs/toolkit";
import autReducer from "./authSlice"
 import commentReducer from "./commentSlice"

const store  = configureStore({
    reducer:{
        user:autReducer,
        commets:commentReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;