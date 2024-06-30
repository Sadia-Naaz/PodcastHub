import{BrowserRouter,Routes,Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import "./card.css"
import SignUp from "./Pages/signUp/signUp"
import Profile from "./Pages/Profile/Profile"
import PodcastPage from "./Pages/Podcasts/Podcasts"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { createUser } from "./Slices/userSlice";
import PrivateRoute from "./Components/PrivaterRoute/PrivateRoute";
import CreatePodcast from "./Pages/CreatePodcast/CreatePodcast";
import "./App.css";
import PodcastDetails from "./Pages/PodcastDeatils/PodcastDetails";
import CreateEpisode from "./Pages/CreateEpisode/CreateEpisode";
import EpisodeEditForm from "./Pages/EpisodeEditForm/EpisodeEdit";

function App() {
  const dispatch=useDispatch();
useEffect(()=>{
const unsubscribeAuth = onAuthStateChanged(auth,(user)=>{
  if(user){
    const unsubscribeSnapshot = onSnapshot(
      doc(db,"users",user.uid),
      (userDoc)=>{
        if(userDoc.exists()){
          const userData  = userDoc.data();
          dispatch(
            createUser({
              name:userData.name,
              email:userData.email,
              uid:userData.uid,
            })
          )
        }
      }
      ,(error)=>{
        console.log(error);
      }
    )
    return unsubscribeSnapshot;
  }
})
return unsubscribeAuth;


},[])

  return (
    
    <div className="app">
    <ToastContainer />
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<SignUp/>}/>
    <Route element={<PrivateRoute/>}>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/podcasts" element={<PodcastPage/>}/>
    <Route path="/create-podcast" element={<CreatePodcast/>}/>
    <Route path="/podcasts/:id" element={<PodcastDetails/>}/>
    <Route path="/podcasts/:id/create-episode"element={<CreateEpisode/>}/>
    <Route path="/podcasts/:id/edit" element={<CreatePodcast/>}/>
    <Route path="/podcasts/:podcastId/episodes/:episodeId/edit-episode" element={<EpisodeEditForm/>}/>
    </Route>
  
   </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
