// Reducer manages two things: state and action. 
// State is the current value, 
// Action is created to change the value of the state

import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    pending: false,
    profile: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateAuthState(authState, { payload }) {
            authState.pending = payload.pending
            authState.profile = payload.profile
        }
    }
})

export const { updateAuthState } = authSlice.actions

export const getAuthState = createSelector(
    //take the entire Redux state
    (state) => state,
    //takes the entire Redux state as an argument and returns only the auth part of the state.
    (state) => state.auth
)

export default authSlice.reducer