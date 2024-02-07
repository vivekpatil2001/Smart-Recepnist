import React from 'react'
import { useState,useEffect } from 'react';
import showToast from "crunchy-toast";
import axios from 'axios';
import { Link } from 'react-router-dom'
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import Lock from "./lock.png"


export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const loginBtn= async()=>{
   
    if (!email) {
        alert("email is required")
        return;
    }
    if (!password) {
        alert("password is required")
        return;
    }
  
     
  const response = await axios.post('/login',{
  
    email:email,
    password:password
  
    });

    // console.log(user.email)

    if (response?.data?.success) {
      showToast(response.data.message, "success", 4000);
      localStorage.setItem("user", JSON.stringify(response?.data.data));
      window.location.href = "/";
    }
     else {
      showToast(response.data.message, "warning", 4000);
    }

  
}

// const checkvalidity = ()=>{
//   const response =JSON.parse(localStorage.getItem("user"))
//   if(response){
//       alert('you  have already logged in ')
//       // showToast('you have already logged in', "success", 4000);
//       window.location.href='/'
//   }


// }
// useEffect(()=>{
//   checkvalidity()
// },[])


  
  return (
    <>
<Navbar/>
        <div className='signup-form'>
        <h1 className='text-center'>Login</h1>
   
        <div>
                {/* <label htmlFor="name">Email</label> */}
                <input type="email"
                    placeholder="Enter Email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>

            <div>
                {/* <label htmlFor="password">Password</label> */}
                <input type="password"
                    placeholder="Password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
       
       
        <button type='button'className="bg-slate-950 hover:bg-blue-800 text-white  py-2 px-5 my-4 rounded-lg text-xl block mx-auto" onClick={loginBtn} >LogIn</button>
        <Link to='/signup'  className='link'>Don't have account ? SignUp</Link>

    </div>
    <Footer/>
    </>

  )
}