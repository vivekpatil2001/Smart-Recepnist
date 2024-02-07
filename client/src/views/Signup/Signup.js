import React, { useState } from "react";
import './Signup.css';
import showToast from "crunchy-toast";
import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("female");

    const SignUpBtn = async () => {
        if (!name) {
            alert("name is required")
            return;
        }
        if (!email) {
            alert("email is required")
            return;
        }
        if (!password) {
            alert("password is required")
            return;
        }
        if (!mobile) {
            alert("mobile is required")
            return;
        }
        if (!address) {
            alert("address is required")
            return;
        }
   

    const responce = await axios.post('/signup',
        {
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            address: address,
            gender: gender
        }
    
    ); 

    if (responce?.data?.success) {
        
        showToast(responce.data.message, "success", 4000);
        window.location.href = "/login";
    } else {
        showToast(responce.data.message, "warning", 4000);
    }

    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setAddress("");

}


return(
    <div>
        <Navbar/>
        <form className="signup-form">  <h1 className="text-center">SignUp</h1>


            <div>
                {/* <label htmlFor="name">Name</label> */}
                <input type="text"
                    placeholder="Enter Name"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>

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

            <div>
                {/* <label htmlFor="mobile">Mobile</label> */}
                <input type="text"
                    placeholder="Enter Mobile"
                    id="mobile"
                    className="form-control"
                    value={mobile}
                    onChange={(e) => {
                        setMobile(e.target.value);
                    }}
                />
            </div>

            <div>
                {/* <label htmlFor="address">Address</label> */}
                <input type="text"
                    placeholder="Address"
                    id="address"
                    className="form-control"
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                />
            </div>

            {/* <div className="radio-input">
                <input type="radio"
                    name="gender"
                    checked={gender === "male"}
                    onClick={() => {
                        setGender('male')
                    }}
                /> Male

                <input type="radio"
                    name="gender"
                    checked={gender === "female"}
                    onClick={() => {
                        setGender('female')
                    }}
                /> Female

            </div> */}

           
       <button type="button" onClick={SignUpBtn} className="bg-slate-950 hover:bg-blue-800 text-white  py-2 px-5 mt-4 rounded-lg text-xl block mx-auto">SignUp</button>
              <br/>

            <Link to="/login" className="link">  Already have an account ?</Link>
         

        </form>
        <Footer/>
    </div>
   
)
};