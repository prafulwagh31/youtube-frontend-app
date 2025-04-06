import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import userChannelReducer from "./userChannelSlice"

// the redux store
const appStore = configureStore({
    // store configured with reducers 
    reducer: {
        user: userReducer,
        userChannel: userChannelReducer
    }
})

export default appStore;


