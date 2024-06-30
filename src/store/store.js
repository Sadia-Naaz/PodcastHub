import { configureStore } from "@reduxjs/toolkit";
import episodeSlice from "../Slices/episodeSlice";
import podcastSlice from "../Slices/podcastSlice";
import userSlice from "../Slices/userSlice";
export default configureStore({
    reducer:{
        episode:episodeSlice,
        user:userSlice,
        podcasts:podcastSlice,
    },
})
