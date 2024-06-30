import React, { useState } from 'react'
import Header from '../../Components/Header';
import SignUpForm from '../../SignUpComponents/SignUpForm';
import LoginForm from '../../SignUpComponents/LoginForm';
function SignUp() {
const [flag,setFlag]=useState(false);


  return (
    <div>
      <Header/>
      <div className='placeholder'></div>
      <div className='page-container'>
      <div className='form-container'>
     {!flag ? <h1>Sign Up</h1>:<h1>Login</h1>} 
     {!flag ? <SignUpForm/>:<LoginForm/>}
     {!flag ?(<p style={{cursor:"pointer", color:"var(--dark)"}} onClick={()=>setFlag(!flag)}>If you have already Signed Up please click here to login</p>):(<p  style={{cursor:"pointer",color:"var(--dark)"}} onClick={()=>{setFlag(!flag)}}>Don't have an account ?Please click here to  Sign Up</p>)}
      </div>
      </div>
      </div>
      

      
    
  )
}

export default SignUp;
