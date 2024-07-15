import { configureStore } from "@reduxjs/toolkit";
import formReducer from '../slices/FormSlice.tsx'


export const store = configureStore({
    reducer: formReducer
})