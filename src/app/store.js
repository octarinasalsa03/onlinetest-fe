import { configureStore } from "@reduxjs/toolkit";
import testIndexReducer from "../features/testIndex/testIndexSlice";

export default configureStore({
    reducer: {
        testIndex: testIndexReducer
    }
})