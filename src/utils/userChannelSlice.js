import { createSlice } from "@reduxjs/toolkit";
// userchannelslice for tracking user channel
const userChennelSlice = createSlice({
    // initialising initial state
    name: "userChannel",
    initialState: {
        userChannelDetails: {},
    },
    // creating reducer functions
    reducers: {
        setUserChannelDetails: (state, action) => {

            state.userChannelDetails = action.payload;
        },
        clearUserChannelDetails: (state, action) => {
            state.userChannelDetails = {}
        },
    }
});


// exporting default reducer
export default userChennelSlice.reducer;

// named exporting reducer functions
export const { setUserChannelDetails, clearUserChannelDetails } = userChennelSlice.actions;




