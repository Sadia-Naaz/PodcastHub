import React, { useEffect, useRef, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import "./style.css"
const AudioPlayer = ({audioSrc,image}) => {

    const audioRef = useRef();
    const[duration,setDuration]=useState(0);
    const[volume,setVolume]=useState(1);
    const[isPlaying,setIsplaying]=useState(true);
    const[isMuted,setIsMuted]=useState(false);
    const[currentTime,setCurrentTime]=useState(0);

    const formatTime =(time)=>{
    const Minutes = Math.floor( time / 60 );
    const Seconds = Math.floor( time % 60 );
    return `${Minutes}:${Seconds < 10 ? "0" : ""}${Seconds}`;
    }

    const handleDuration =(e)=>{
        setCurrentTime(e.target.value);
        audioRef.current.currentTime = e.target.value;
       
    }

    const handleTimeUpdate=()=>{
    setCurrentTime(audioRef.current.currentTime);
  
    }

    const handleLoadedMetaData=()=>{
     setDuration(audioRef.current.duration);
    }

    const handleMute=()=>{
      setIsMuted(!isMuted);
    }

    const handlePlayPause=()=>{
        if(isPlaying){
            setIsplaying(false);
        }else{
            setIsplaying(true);
        }
        
    }

    const handleVolume =(e)=>{
        setVolume(e.target.value);
        audioRef.current.volume=e.target.value;
    }

    const handleEnded = ()=>{
        setCurrentTime(0);
        setIsplaying(false);
    }
    useEffect(()=>{
        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    },[isPlaying])

    useEffect(()=>{
        if(!isMuted){
            audioRef.current.volume=1;
            setVolume(1);
        }else{
            audioRef.current.volume=0;
            setVolume(0);
        }
    },[isMuted]);
    useEffect(()=>{
     const audio = audioRef.current;
     audio.addEventListener("timeupdate",handleTimeUpdate);
     audio.addEventListener("loadedmetadata",handleLoadedMetaData);
     audio.addEventListener("ended",handleEnded);
     return ()=>{
        audio.removeEventListener("timeupdate",handleTimeUpdate);
     audio.removeEventListener("loadedmetadata",handleLoadedMetaData);
     audio.removeEventListener("ended",handleEnded);
     } 
    },[audioSrc])
    
    // useEffect(() => {
    //     const audio = audioRef.current;
        
    //     const setAudioData = () => {
    //       setDuration(audio.duration);
    //       setCurrentTime(audio.currentTime);
    //     };
      
    //     const setAudioTime = () => setCurrentTime(audio.currentTime);
      
    //     audio.addEventListener("loadedmetadata", setAudioData);
    //     audio.addEventListener("timeupdate", setAudioTime);
      
    //     return () => {
    //       audio.removeEventListener("loadedmetadata", setAudioData);
    //       audio.removeEventListener("timeupdate", setAudioTime);
    //     };
    //   }, [audioSrc]);
    const remainingTime = duration - currentTime; 
  return (
    <div className='custom-audio-player'>
      <img src={image} className='custom-audio-player-img'/>
      <audio src={audioSrc} ref={audioRef}/>
      <div className='duration-flex'>
      <p onClick={handlePlayPause}>{isPlaying ?<FaPause/>: <FaPlay />} </p> 
      <p>{formatTime(currentTime)}</p>
        <input type='range' value={currentTime} max={duration} step={0.01} className="input-duration" onChange={handleDuration}/>
        <p>{formatTime(remainingTime)}</p>
      </div>
      <p onClick={handleMute}>{isMuted ? <FaVolumeMute />:<GoUnmute />}</p>
      <input type='range' value={volume} onChange={handleVolume} className='volume-range' 
      max={1}
      min={0}
      step={0.01}
      />
      
    </div>
  )
}

export default AudioPlayer
