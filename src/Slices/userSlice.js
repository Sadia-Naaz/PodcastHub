import {createSlice} from "@reduxjs/toolkit";
 
const initialState = {
    user:null,
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
     createUser : (state,action)=>{
      state.user=action.payload;
     },
     clearUser:(state,action)=>{
      state.user=null;
     },

    },
})

export const {createUser,clearUser}=userSlice.actions;
export default userSlice.reducer;