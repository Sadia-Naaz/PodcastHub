import React from 'react'
import ButtonComponent from '../Components/Button';
import { useState } from 'react';
import InputComponent from './InputComponent';
import { signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { auth, db } from '../firebase';
import { createUser } from '../Slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader/Loader';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[loading,setIsloading]=useState(false);
    const handleForgetPassword = async()=>{
      if(!email){
        toast.error("Please enter your email address");
      }
      try{
        await sendPasswordResetEmail(auth,email);
        toast.success("Password reset link sent to your email");
      }catch(error){
        toast.error(error.message);
      }
    }
    const handleLogin=async()=>{
      setIsloading(true);
       try{
        const userCredentials = await signInWithEmailAndPassword(
          auth,email,password);
          const user =userCredentials.user;

          const userdoc = await getDoc(doc(db,"users",user.uid));
          const userData = userdoc.data();
          console.log(userData);
          dispatch(createUser({
            name:userData.name,
            email:user.email,
            uid:user.uid,
            profilePic:userData.profilePic,
          }))
          toast.success("login successfully!");
          navigate("/profile");
       }
       catch(error){
        console.log(error);
       }
     
    }
  return (
   <><InputComponent
      state={email}
      setState={setEmail}
      type="email"
      placeholder="email"
      required={true}
      />
      <InputComponent
      state={password}
      setState={setPassword}
      type="Password"
      placeholder="password"
      required={true}
      />
      <ButtonComponent text="Login" onClick={handleLogin}/>
      <ButtonComponent text="Forget Password" onClick={handleForgetPassword}/>
      {loading && <Loader/>}</>
  
  )
}

export default LoginForm
