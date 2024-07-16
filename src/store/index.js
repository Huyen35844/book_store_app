import { combineReducers, configureStore, createSelector } from "@reduxjs/toolkit";
import authReducer from "./auth"

const reducers = combineReducers({
    auth: authReducer
})

const store = configureStore({ reducer: reducers })

export default store