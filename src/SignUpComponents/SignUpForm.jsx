import React, { useState } from 'react'
import InputComponent from './InputComponent';
import ButtonComponent from "../Components/Button/index"
import { auth,db, storage } from '../firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createUser } from '../Slices/userSlice';
import Loader from '../Components/Loader/Loader';
import FileInputComponent from './FileInputComponent';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
function SignUpForm() {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const[profileImg,setProfileImg]=useState(null);
    const dispatch= useDispatch();
    const navigate =useNavigate();
const HandleProfileImage= (file)=>{
setProfileImg(file);
}


const handleSignUp=async()=>{
    setLoading(true);
     if(password==confirmPassword && password.length>=6){
      try{
        const userCredentials= await createUserWithEmailAndPassword(
          auth,email,password
        );
        const user = userCredentials.user;
        
        const ProfileImgRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(ProfileImgRef,profileImg);
        const profileImgUrl = await getDownloadURL(ProfileImgRef);
        //
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: user.email,
          uid: user.uid,
          profileImg: profileImgUrl // save the profile image URL in the user document
      });

      dispatch(createUser({
          name: name,
          email: user.email,
          uid: user.uid,
          profileImg: profileImgUrl // save it in Redux as well if needed
      }));
        //
  
      setLoading(false);
      toast.success("signed up successfully!");
      navigate("/profile");
      }catch(error){
        toast.error(error.message);
        setLoading(false);
      }
     }
     else{
      if(password!=confirmPassword){
        toast.error("password and confirm password should be same")
        setLoading(false);
      }else if(password.length!=6){
        toast.error("password length must be greater than 8 characters")
        setLoading(false);

      }
     }
    }
  return (
    <>
      <InputComponent
      state={name}
      setState={setName}
      type="text"
      placeholder="name"
      required={true}
      />
      <InputComponent
      state={email}
      setState={setEmail}
      type="email"
      placeholder="email"
      required={true}
      />
      <InputComponent
      state={password}
      setState={setPassword}
      type="password"
      placeholder="password"
      required={true}
      />
      <InputComponent
      state={confirmPassword}
      setState={setConfirmPassword}
      type="password"
      placeholder="confirmPassword"
      required={true}
      />
    <FileInputComponent
    accept="image/*"
    id="image-file"
    fileHandleFn={HandleProfileImage}
    text="AudiFile"
    />
      <ButtonComponent  text="Sign Up" onClick={handleSignUp} disabled={loading?true:false}/>
     {loading && <Loader/>}
    </>
  )
}

export default SignUpForm

