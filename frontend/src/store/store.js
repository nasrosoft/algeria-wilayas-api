import { configureStore } from "@reduxjs/toolkit"
import algeriaReducer from "./algeria"
import { thunk } from "redux-thunk"

export default configureStore({
  reducer: {
    algeria: algeriaReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
