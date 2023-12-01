import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        initalizeState (state, action) {
            return action.payload
        }
    }
});

export const initalizeUsers = (id) => {
    return async dispatch => {
        dispatch(initalizeState(id));
    };
};

export const { initalizeState } = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
