// import React, { useState, useEffect, useRef } from "react";
// import "./PatientForm.css";
// import "../CriminalForm/CriminalForm.css";
// import axios from "axios";
// import Navbar from "../../component/Navbar/Navbar";
// // import Footer from '../../component/Footer/Footer';
// import { MdDelete } from "react-icons/md";
// import showToast from "crunchy-toast";
// import { Link } from "react-router-dom";
// import Webcam from 'react-webcam';

// const PatientForm = () => {
//   const [face, setFace] = useState("");
//   const [Name, setName] = useState("");
//   const [weight, setWeight] = useState("");
//   const [contact, setContact] = useState("")
//   const [dob, setDob] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [image, setImage] = useState("");
//   const [address, setAddress] = useState("");
//   const [state, setState] = useState("");
//   const [data, setData] = useState([]);

//   const webcamRef = useRef(null); // Reference to the webcam component

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImage(imageSrc);
//   };

//   const PatientData = async () => {
//     const response = await axios.post("/missingPerson", {
//       Name,
//       dob,
//       age,
//       gender,
//       address,
//       state,
//       image,
//     });
//     if (response?.data?.success) {
//       showToast(response?.data?.message, "success", 4000);
//     } else {
//       showToast(response?.data?.message, "warning", 4000);
//     }
//     loadData();

//     setName("");
//     setDob("");
//     setAge("");
//     setGender("");
//     setImage("");
//     setAddress("");
//     setState("");
//   };

//   const loadData = async () => {
//     const response = await axios.get("/missingPersons");

//     setData(response?.data?.data);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const del = async (_id) => {
//     const response = await axios.delete(`missingperson/${_id}`);
//     if (response?.data?.message) {
//       showToast(response?.data?.message, "warning", 4000);
//       loadData();
//     }
//   };

//   // useEffect(()=>{
//   //   const storageUser = JSON.parse(localStorage.getItem("user") || '{}');

//   //   if(storageUser?.email){
//   //     alert("Successfully Saved Criminal Data");
//   //     window.location.href = "/";
//   //   }

//   // }, [])

//   return (
//     <>
//       <Navbar />
//       <h2 className="text-pink-700 text-center text-4xl my-6">
//         Patient Information Form
//       </h2>
//       <div className="form-container">
//         <form>
//           <div className="form-container-2">
//             <div className="form-section">
//               <div className="form-group">
//                 <label className="font-semibold text-lg"> Name:</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your  name"
//                   id="name"
//                   className="input-box"
//                   value={Name}
//                   onChange={(e) => {
//                     setName(e.target.value);
//                   }}
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="font-semibold text-lg">Date of Birth:</label>
//                 <input
//                   type="date"
//                   placeholder="Enter your birth date"
//                   id="dob"
//                   className="input-box"
//                   value={dob}
//                   onChange={(e) => {
//                     setDob(e.target.value);
//                   }}
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="font-semibold text-lg">Age:</label>
//                 <input
//                   type="number"
//                   className="input-box"
//                   placeholder="Enter your age"
//                   id="age"
//                   value={age}
//                   onChange={(e) => {
//                     setAge(e.target.value);
//                   }}
//                 />
//               </div>

//               {/* <div>
//           <input type="radio"
//                 id='male'
//                 name='gender'
//                 className='gender'
//                 checked={gender === "male"}
//                 onClick={()=>{
//                   setGender("male");
//                 }}
//                 />
//           <label htmlFor='male'>Male</label>

//           <input type="radio"
//                 id='female'
//                 name='gender'
//                 className='gender'
//                 checked={gender === "female"}
//                 onClick={()=>{
//                   setGender("female");
//                 }}
//                 />
//           <label htmlFor='female'>Female</label>
//         </div> */}
//               <div className="gender-container">
//                 <label className="font-semibold text-lg mt-2 mr-2">
//                   Gender:
//                 </label>
//                 {/* <label htmlFor='male' className='gender-label '>Male</label> */}
//                 Male{"  "}{" "}
//                 <input
//                   type="radio"
//                   id="male"
//                   name="gender"
//                   className="gender-input me-4 "
//                   checked={gender === "male"}
//                   onChange={() => {
//                     setGender("male");
//                   }}
//                 />
//                 {/* <label htmlFor='female' className='gender-label'>Female</label> */}
//                 Female{" "}
//                 <input
//                   type="radio"
//                   id="female"
//                   name="gender"
//                   className="gender-input "
//                   checked={gender === "female"}
//                   onChange={() => {
//                     setGender("female");
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="form-section">
//               <div className="form-group">
//                 <label className="font-semibold text-lg">Address:</label>
//                 <input
//                   type="text"
//                   className="input-box"
//                   placeholder="Enter your Address"
//                   id="address"
//                   value={address}
//                   onChange={(e) => {
//                     setAddress(e.target.value);
//                   }}
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="font-semibold text-lg">State:</label>
//                 <input
//                   type="text"
//                   className="input-box"
//                   id="state"
//                   value={state}
//                   onChange={(e) => {
//                     setState(e.target.value);
//                   }}
//                 />
//               </div>

//               {/* <div className="form-group">
//                 <label className="font-semibold text-lg">Image URL:</label>
//                 <input
//                   type="text"
//                   className="input-box"
//                   id="image"
//                   value={image}
//                   onChange={(e) => {
//                     setImage(e.target.value);
//                   }}
//                 />
//               </div> */}
//               <div className="form-group">
//                <label className='font-semibold text-lg'>Capture Image:</label>
//               <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 className='webcam-preview'
//               />
//                <button onClick={capture} className="bg-pink-600 hover:bg-pink-800 text-white font-bold mt-2 py-2 px-5 block rounded-lg" type='button'>Capture</button>
//             </div>

//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={PatientData}
//             className="bg-pink-600 hover:bg-pink-800 text-white font-bold mt-5 py-2 px-5 block mx-auto rounded-lg"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//       '
//       <button
//         type="button"
//         className="bg-pink-600 hover:bg-pink-800 text-white  py-2 px-5 my-4 rounded-lg text-xl block mx-auto"
//       >
//         <Link to="/patientdata" className="text-white no-underline">
//           {" "}
//           Get Patient's Data →
//         </Link>
//       </button>
//       {/* <Footer /> */}
//     </>
//   );
// };

// export default PatientForm;

import React, { useState, useEffect, useRef } from "react";
import "./../CriminalForm/CriminalForm.css";
import { MdDelete } from "react-icons/md";
import showToast from "crunchy-toast";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Navbar from "../../component/Navbar/Navbar";
// import Footer from '../../component/Footer/Footer';
import { Link } from "react-router-dom";
import Webcam from "react-webcam";

const PatientForm = () => {
  const [Name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [arrestedDate, setArrestedDate] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [crimeInvloved, setCrimeInvloved] = useState("");
  const [patientId, setpatientId] = useState("");
  const [data, setData] = useState([]);

  const webcamRef = useRef(null); // Reference to the webcam component

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const loadData = async () => {
    const response = await axios.get("/criminalRecords");

    setData(response?.data?.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveCriminalData = async () => {
    // Use the captured image data in your Axios request
    try {
      const response = await axios.post("/missingPerson", {
        patientId,
        address,
        Name,
        state,
        image, // Use the captured image data here
        crimeInvloved,
        dob,
        arrestedDate,
        age,
        gender,
      });

      if (response?.data?.success) {
        // alert(response?.data?.message)
        showToast(response?.data?.message, "success", 4000);
        // window.location.href = "/login";
      } else {
        showToast("data saved succefully");
      } 

      loadData();

      setName("");
      setCrimeInvloved("");
      setpatientId("");
      setDob("");
      setAge("");
      setGender("");
      setImage("");
      setAddress("");
      setState("");
    } catch (err) {
      console.log(err.message);
    }
  };

  const del = async (_id) => {
    const response = await axios.delete(`/criminalRecord/${_id}`);
    if (response?.data?.message) {
      showToast(response?.data?.message, "warning", 4000);
      loadData();
    }
  };

  // const UpdateCriminalData = async (_id) => {
  //   // if (!amount) {
  //   //   showToast("amount is required", "alert", 4000);
  //   //   return;
  //   // }
  //   // if (!transactionType) {
  //   //   showToast("Transaction Type is required", "alert", 4000);
  //   //   return;
  //   // }

  //   const updateDetails = {
  //     patientId,
  //     address,
  //     Name,
  //     state,
  //     photo,
  //     crimeInvloved,
  //     dob,
  //     arrestedDate,
  //     age,
  //     gender
  //   };

  //   const response = await axios.put(
  //     `criminalRecord/${_id}`,
  //     updateDetails
  //   );
  //   if (response?.data?.message) {
  //     showToast(response?.data?.message, "warning", 4000);
  //     loadData();
  //   }
  // };

  return (
    <>
      <Navbar />

      <h2 className="text-pink-600 text-center text-4xl my-6">
        Patient Registration Form
      </h2>
      <div className="form-container">
        <form role="form" encType="multipart/form-data">
          <div className="form-container-2">
            <div className="form-section">
              <div className="form-group">
                <label className="font-semibold text-lg">
                  Patient ID (Adhar/PAN):
                </label>
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter your Adhar ID"
                  id="patientId"
                  value={patientId}
                  onChange={(e) => {
                    setpatientId(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="font-semibold text-lg"> Name:</label>
                <input
                  type="text"
                  placeholder="Enter your  name"
                  id="name"
                  className="input-box"
                  value={Name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              {/* <div className="form-group">
            <label className='font-semibold text-lg'>Alias Name:</label>
            <input type="text"
            placeholder= 'Enter your alias'
            id="aliasName" 
            className='input-box'
            value={aliasName} 
            onChange={(e) => {
              setAliasName(e.target.value);
            }}
            />
          </div> */}

              <div className="form-group">
                <label className="font-semibold text-lg">Date of Birth:</label>
                <input
                  type="date"
                  placeholder="Enter your birth date"
                  id="dob"
                  className="input-box"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="font-semibold text-lg">Age:</label>
                <input
                  type="number"
                  className="input-box"
                  placeholder="Enter your age"
                  id="age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>

              <div className="gender-container">
                <label className="font-semibold text-lg mt-4">Gender:</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  className="gender-input"
                  checked={gender === "male"}
                  onChange={() => {
                    setGender("male");
                  }}
                />
                Male
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="gender-input ml-3"
                  checked={gender === "female"}
                  onChange={() => {
                    setGender("female");
                  }}
                />
                Female
              </div>
            </div>
            <div className="form-section">
              <div className="form-group">
                <label className="font-semibold text-lg">City Address:</label>
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter your Address"
                  id="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="font-semibold text-lg">State:</label>
                <input
                  type="text"
                  className="input-box"
                  id="state"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </div>

              {/* <div className="form-group">
                <label className='font-semibold text-lg'>Date:</label>
                <input type="date" name="arrestedDate" className='input-box'
                  value={arrestedDate} 
                  onChange={(e) => {
                    setArrestedDate(e.target.value);
                  }}
                />
              </div> */}

              {/* <div className="form-group">
                <label className='font-semibold text-lg'>Crime Involved In:</label>
                <input type="text" name="crimeInvolved" className='input-box'
                  value={crimeInvloved}
                  onChange={(e) => {
                    setCrimeInvloved(e.target.value);
                  }}
                />
              </div> */}

              {/* <div className="form-group">
            <label className='font-semibold text-lg'>Image Path:</label>
            <input type="text" name="imagePath" className='input-box'/>
          </div> */}

              <div className="form-group">
                <label className="font-semibold text-lg">Capture Image:</label>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="webcam-preview"
                />
                <button
                  onClick={capture}
                  className="bg-pink-600 hover:bg-pink-800 text-white font-bold mt-2 py-2 px-5 block rounded-lg"
                  type="button"
                >
                  Capture
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={saveCriminalData}
            className="bg-pink-600 hover:bg-pink-800 text-white font-bold mt-5 py-2 px-5 block mx-auto rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>

      <button
        type="button"
        className="bg-pink-600 hover:bg-pink-800 text-white  py-2 px-5 my-4 rounded-lg text-xl block mx-auto"
      >
        <Link to="/patientData" className="text-white no-underline">
          {" "}
          Get Patient Data →
        </Link>
      </button>

      {/* <Footer /> */}
    </>
  );
};

export default PatientForm;
