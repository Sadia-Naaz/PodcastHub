import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    podcasts:[],
}
const podcastSlice = createSlice({
    name:"podcasts",
    initialState,
    reducers:{
        createPodcast:(state,action)=>{
         state.podcasts=action.payload;
        },
    }
})
export const {createPodcast}=podcastSlice.actions;
export default podcastSlice.reducer;