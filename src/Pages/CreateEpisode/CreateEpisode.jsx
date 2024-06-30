import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import InputComponent from '../../SignUpComponents/InputComponent'
import FileInputComponent from '../../SignUpComponents/FileInputComponent';
import ButtonComponent from '../../Components/Button';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import Loader from '../../Components/Loader/Loader';

const CreateEpisode = () => {
  const {id}=useParams();
  const[Title,setTitle]=useState("");
  const[Description,setDescription]=useState("");
  const[AudioFile,setAudioFile]=useState();
  const[loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const HandleSubmit=async()=>{
   if(Title,Description,AudioFile,id){
     setLoading(true);
     try{
     const audioRef = ref(storage,`podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);
     await uploadBytes(audioRef,AudioFile);
     const audioURL = await getDownloadURL(audioRef);
     const episodeData = {
      Title,
      Description,
      AudioFile:audioURL
     };
     await addDoc(collection(db,"podcasts",id,"episodes"),episodeData);
     toast.success("episode created successfully");
     setLoading(false);
     setTitle("");
     setDescription("");
     setAudioFile(null);
     navigate(`/podcasts/${id}`)
     }
     catch(error){
      toast.error(error.message);
     }
   }
   else{
    setLoading(false);
    toast.error("All files are required");
   }
  }
  const HandleAudioFile=(file)=>{
    setAudioFile(file);
  }
  return (
    <>
      <Header/>
    <div className='page-container'>
     <div className='form-container'>
    <InputComponent 
    state={Title}
    setState={setTitle}
    Type="text"
    placeholder="Tilte"
    required={true}
    label="Title"
    
    />
    <InputComponent
     state={Description}
     setState={setDescription}
     Type="text"
     placeholder="Description"
     required={true}
     label="Description"
    />
    <FileInputComponent
    accept="auido/*"
    id="audio-file-id"
    fileHandleFn={HandleAudioFile}
    text="AudiFile"
    />
    <ButtonComponent onClick={HandleSubmit} text="Create Episode" disabled={loading}/>
    </div>
    </div>
    <Loader/>
    </>
  )
}

export default CreateEpisode
