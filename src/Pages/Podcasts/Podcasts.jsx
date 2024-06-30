import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { createPodcast } from '../../Slices/podcastSlice';
import PodcastCard from '../../Components/PodcastCard/PodcastCard';
import InputComponent from '../../SignUpComponents/InputComponent';
import ButtonComponent from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import "./style.css"
const PodcastPage = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const podcasts  = useSelector((state)=>state.podcasts.podcasts);
const[search,setSearch]=useState(""); 
const filteredPodcast = podcasts.filter((item)=>item.Title.trim().toLowerCase().includes(search.trim().toLowerCase()));


useEffect(()=>{
const unsubscribe = onSnapshot(
query(collection(db,"podcasts")),
(querySnapshot)=>{
  const podcastData = [];
  querySnapshot.forEach((doc)=>{
    podcastData.push({id:doc.id, ...doc.data()});
  });
  dispatch(createPodcast(podcastData));
  console.log(podcastData);
},(error)=>{ 
  console.error(error);
}

);
return ()=>{
  unsubscribe();
}

},
[dispatch])

  return (<>
    <Header/>
    <h1>Podcasts</h1>
    <div className='page-container'>
    <InputComponent
      state={search}
      setState={setSearch}
      type="text"
     placeholder="Search By Name.."
   />
   <div className='podcast-grid'>
     {filteredPodcast.length > 0 ?(<>{filteredPodcast.map((pod,index)=>{
      return<>
           <PodcastCard key={index} id={pod.id} DisplayImg={pod.DisplayImg} Title={pod.Title}/>
           </>
          
     })}</>) :<>not found</>}
    </div>
    </div>
    </>
  )
}

export default PodcastPage
