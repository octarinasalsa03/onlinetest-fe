import { createSlice } from "@reduxjs/toolkit";

export const indexSlice = createSlice({
    name: 'testIndex',
    initialState: {
        idx: 0
        // kalau mau simpen data disini juga bisa
    },
    reducers: {
        previous: state => {
            state.idx -= 1;
        },
        next: state => {
            state.idx += 1;
        },
        go: (state, action) => {
            state.idx = action.payload;
        }
    }
})

export const { previous, next, go } = indexSlice.actions;
export default indexSlice.reducer;