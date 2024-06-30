import { createSlice } from "@reduxjs/toolkit";
const initialState={
    episodes:[],
}
const episodeSlice = createSlice({
    name:"episodes",
    initialState,
    reducers:{
        createEpisode:(state,action)=>{
         state.episodes=action.payload;
        },
        
    },
})
export const {createEpisode} = episodeSlice.actions;
export default episodeSlice.reducer;