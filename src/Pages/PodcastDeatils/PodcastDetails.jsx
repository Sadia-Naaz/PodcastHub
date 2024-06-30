
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
import Header from '../../Components/Header';
import ButtonComponent from '../../Components/Button';
import { addDoc, collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import EpisodeDetails from '../../Components/EpisodeDetails/EpisodeDetails';
import AudioPlayer from '../../Components/AudioPlayer/AudioPlayer';
import "./details.css";
const PodcastDetails = () => {
    const[podcast,setPodcast]=useState({});
   const[playingFile,setPlayingFile]=useState("");
    const[episodes,setEpisodes]=useState([]);
    const {id}=useParams();
    
    const navigate =useNavigate();
    useEffect(()=>{
      const fetchPodcast = async()=>{
        try{
          const podcastDoc= await getDoc(doc(db,"podcasts",id));
          if(podcastDoc.exists()){
            setPodcast({id:podcastDoc.id,...podcastDoc.data()});
          }
        }
        catch(error){
          toast.error(error.message);
        }
          }
      fetchPodcast();
    },[id])
    useEffect(()=>{
    const unsubscribe = onSnapshot(
      query(collection(db,"podcasts",id,"episodes")),
      (querySnapshot)=>{
      const episodeData = [];
      querySnapshot.forEach((doc)=>{
        episodeData.push({id:doc.id,...doc.data()});
        })
        setEpisodes(episodeData);
      },(error)=>{
        toast.error(error.message);
      }
    )
    return ()=>{unsubscribe();}
    },[id]);
useEffect(()=>{
   if(id){
    getData();
}
},[id])

const getData =async()=>{
const docref = doc(db,"podcasts",id);
const docSnap  = await getDoc(docref);
try{
    if(docSnap.exists()){
        console.log(docSnap.data())
        setPodcast({id:id,...docSnap.data()})
    }else{
        toast.error("No such document exist");
    }
}
catch{(error)=>{
toast.error(error.message);
}}

}
  return (
    <div>
      {
      podcast.id && <> 
      <Header/>
      <div className='placeholder'></div>
      <div className='page-container'>
  
        <div className='group'>
        <h1 className='active'>{podcast.Title}</h1>
        <Link to={`/podcasts/${id}/create-episode`}><ButtonComponent 
      text={"create episode"}/></Link>
       </div>
       <div className='banner-wrapper'>
       <img src={podcast.BannerImg}/>
       </div>
        <div className='description'>{podcast.Description}</div>
    <h1 className='active'>Episodes</h1>
     
        {episodes.map((e)=>{
          return (<div className='podcast-grid'>
          <EpisodeDetails Title={e.Title} Description={e.Description}  AudioFile={e.AudioFile} 
          onClick={(file)=>{setPlayingFile(file)}} id={e.id} podcastID={id}/>
          </div>
            )
          
        })}
      </div>
      {playingFile && <AudioPlayer audioSrc={playingFile} image={podcast.BannerImg}/>}
      </>
      
      }
    </div>
  )
}

export default PodcastDetails
