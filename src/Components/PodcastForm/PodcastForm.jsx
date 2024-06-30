import React, { useEffect, useState } from 'react'
import InputComponent from '../../SignUpComponents/InputComponent';
import ButtonComponent from '../Button';
import { toast } from 'react-toastify';
import FileInputComponent from '../../SignUpComponents/FileInputComponent';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';


const PodcastForm = () => {
    const[Title,setTitle]=useState("");
    const[Des,setDes]=useState("");
    const[DisplayImg,setDisplayImg]=useState(null);
    const[BannerImg,setBannerImg]=useState(null);
    const[loading,setLoading]=useState(false);
    const navigate = useNavigate();
    const {id}=useParams();


 useEffect(()=>{ //first we validate the id, if id is there  that means user want to edit an existing podcast;
  if(id){
    //if id is there then we will update the podcast
    //first we will get the podcast data from the database
  const fetchPodcast=async()=>{
  const docRef = doc(db,"podcasts",id);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    const Podcastdata = docSnap.data();
    setTitle(Podcastdata.Title);
    setDes(Podcastdata.Description);
    setDisplayImg(Podcastdata.DisplayImg);
    setBannerImg(Podcastdata.BannerImg);
  }

  }
  fetchPodcast();
  
  }},[id]);
   


 const handleSubmit=async()=>{
    //now we will do validattion
  if(Title && Des && DisplayImg && BannerImg ){
  //upload document and get downloadable link
  try{
  setLoading(true);
  const BannerImgRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
  await uploadBytes(BannerImgRef,BannerImg);
  const bannerImgUrl = await getDownloadURL(BannerImgRef);
  //for display img
  const DisplayImgref = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
  await uploadBytes(DisplayImgref,DisplayImg);
  const displayImgUrl = await getDownloadURL(DisplayImgref);
  //create new doc in a new collection called podcast in firebase 

  const podcastData={
    Title:Title,
    Description:Des,
    BannerImg:bannerImgUrl,
    DisplayImg:displayImgUrl,
    Created_by:auth.currentUser.uid,
  };
 

  //updating the podcast in firbase storage.
  if(id){
      const docRef = doc(db,"podcasts",id);
      await updateDoc(docRef,podcastData);
      toast.success("podcast updated successfully");
      navigate(`/podcasts`);
  }
  else{
    const docRef = await addDoc(collection(db,"podcasts"),podcastData);
    toast.success("podcast created successfully");
    navigate(`/podcasts/${docRef.id}`)
  }
  //redireect to the podcast details page.
  setTitle("");
  setDes("");
  setBannerImg(null);
  setDisplayImg(null);
  setLoading(false);
}
catch(error){
  setLoading(false);
  toast.error(error.message);
  console.log(error.message)
}
  
  //save the new podcast state in our prveious podcasts
 }
 else{
  setLoading(false);
  toast.error("Please fill all the required fields");
 }
  }
    const DisplayImgHandleFn=(file)=>{
     setDisplayImg(file);
    }
    const BannerImgHandleFn=(file)=>{
     setBannerImg(file);
    }
  return (
   <>
   <InputComponent
   state={Title}
   setState={setTitle}
   type="text"
   placeholder="Title"
   required={true}
   />
   <InputComponent
   state={Des}
   setState={setDes}
   type="text"
   placeholder='Description.......'
   required={true}
   />
   <FileInputComponent 
   accept={"image/*"}
  id="Display-Img-Input"
  fileHandleFn={DisplayImgHandleFn}
  text="Display-Img-Upload"

  
   />
   <FileInputComponent
   accept={"image/*"}
   id="Banner Img Upload"
   fileHandleFn={BannerImgHandleFn}
   text="Banner Img Upload"
   />
   <ButtonComponent text={id?"Edit Podcast":"Create Podcast"} onClick={handleSubmit}/>
   {loading && <Loader/>}
   </>
  )
}

export default PodcastForm
