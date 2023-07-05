import { configureStore } from "@reduxjs/toolkit";
import testIndexReducer from "../features/testIndex/testIndexSlice";
// import urlParamReducer from "../features/urlParam/urlParamSlice";

export default configureStore({
    reducer: {
        testIndex: testIndexReducer
    }
})