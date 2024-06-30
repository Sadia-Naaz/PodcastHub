import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Components/Header';
import ButtonComponent from '../../Components/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader/Loader';
import "./style.css"
const Profile = () => {
    const user = useSelector((state)=>state.user.user);
    console.log(user);
    if(!user){
      <Loader/>
    }
    const HandleLogOut=()=>{
        signOut(auth).then(()=>{
            toast.success("Logout Success");
        }).catch((error)=>{
            toast.error(error.message);
        })
    }
  return (
  <div>
       <Header/>
       <div className='page-container'>
      <div className='profile-container'>
      <h1 >Profile</h1>
      <img src={user.profileImg}/>
      <p>{user.email}</p>
      <p>{user.uid}</p>
      <ButtonComponent text="Logout" onClick={HandleLogOut}/>
      </div>
    </div>
    </div>
  )
}

export default Profile
