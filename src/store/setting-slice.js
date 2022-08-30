import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
    name: "setting",
    initialState: {
        level: 1,
    },
    reducers: {
        setLevel(state, action) {
            state.level = action.payload;
        },
    },
});

export const settingActions = settingSlice.actions;

export default settingSlice;
