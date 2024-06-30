import React from 'react'
import {  Outlet, useNavigate } from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from '../../firebase';
import Loader from '../Loader/Loader';
const PrivateRoute = () => {
const[user,loading,error]=useAuthState(auth);
const navigate =useNavigate();
if(loading){
    return <Loader/>
}
else if(!user||error){
return navigate("/");
}
else{
 return <Outlet/>
}
}

export default PrivateRoute
