// import React from "react";
// import "./PatientData.css"
// import { MdDelete } from "react-icons/md";
// import showToast from "crunchy-toast";
// import { FaEdit } from "react-icons/fa";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import Navbar from "../../component/Navbar/Navbar";

// function PatientData() {
//   const [data, setData] = useState([]);
//   console.log(data);
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

//   return (
//     <>
//       <Navbar />
//       <h2 className="text-blue-700 text-center text-4xl my-3">
//         All Patient's Data
//       </h2>

//       <div className="data-container">
//         {data?.map((obj, index) => {
//           const { Name, image, _id, dob, age, gender, address, state } = obj;

//           return (
//             <div className="data-card space-y-2 ">
//  <img src={image} className="w-[100%] mx-auto mb-2" alt="Criminal" />
//               <p>
//                 {" "}
//                 <b>Name : </b> {Name}{" "}
//               </p>
//               <p>
//                 {" "}
//                 <b>Gender : </b> {gender}
//               </p>
//               {/* <p> <b>DOB : </b> {dob}</p> */}
//               <p>
//                 {" "}
//                 <b>Age : </b> {age}
//               </p>
//               <p>
//                 <b> State : </b> {state}{" "}
//               </p>
//               <p>
//                 {" "}
//                 <b>Address : </b> {address}
//               </p>
//               <MdDelete
//                 className="text-blue-500 text-[28px] ms-auto "
//                 onClick={() => del(_id)}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default PatientData;






import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import "./PatientData.css"
import axios from 'axios';
import showToast from 'crunchy-toast';
import { MdDelete } from 'react-icons/md';


function CriminalData() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  async function searchData(){
    const searchData = await axios.get(`/patient/search?q=${search}`)

    setData(searchData?.data?.data)
    console.log(setData);
  }

  useEffect(()=>{
    searchData()
  },[search])
  
  const loadData = async () => {
        const response = await axios.get('/missingPersons');
    
        setData(response?.data?.data)
      }
    
      useEffect(() => {
        loadData();
      }, []);

  useEffect(() => {
    const loadModelsAndStartWebcam = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        startWebcam();
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    const startWebcam = () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    };

    const recognizeFaces = async () => {
      const labeledDescriptors = await getLabeledFaceDescriptors();
    
      if (labeledDescriptors.length === 0) {
        console.error('No labeled face descriptors found.');
        return;
      }
    
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    
      videoRef.current.addEventListener('play', async () => {
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        canvasRef.current.append(canvas);
    
        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvas, displaySize);
    
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(videoRef.current)
            .withFaceLandmarks()
            .withFaceDescriptors();
    
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    
          resizedDetections.forEach(detection => {
            const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
            const box = detection.detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.toString() });
            drawBox.draw(canvas);
    
            // Check if the face matches any criminal
            if (bestMatch.label !== 'unknown') {
              const matchedCriminal = data.find(criminal => criminal.Name === bestMatch.label);
              if (matchedCriminal) {
                showToast(`Matched with patient: ${matchedCriminal.Name}`, 'success', 3000);
              }
            }
          });
        }, 100);
      });
    };
    
   

    const getLabeledFaceDescriptors = async () => {
      const labeledDescriptors = [];

      for (const criminal of data) {
        const descriptions = [];
        try {
          const img = await faceapi.fetchImage(criminal.image);
          const detection = await faceapi.detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detection.descriptor);
        } catch (error) {
          console.error('Error fetching image or detecting face:', error);
        }

        if (descriptions.length > 0) {
          labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(criminal.Name, descriptions));
        }
      }

      return labeledDescriptors;
    };

    loadModelsAndStartWebcam();
    recognizeFaces();
  }, [data]);



  const del = async (_id) => {
    try {
      const response = await axios.delete(`/missingPersons/${_id}`);
      if (response?.data?.message) {
        showToast(response?.data?.message, 'warning', 4000);
        loadData();
      }
    } catch (error) {
      console.error('Error deleting criminal record:', error);
    }
  };

  return (
    <>
    <h2 className='text-blue-700 text-center text-4xl my-2'>All Patients Data</h2>
    <div
     className='text-blue-700 text-center text-4xl my-2'>
      <input type='text' 
      placeholder='Search patient'
      className='search-bar'
      value={search}
      onChange={(e)=>{
        setSearch(e.target.value)
      }}
      />
      </div>
    <div className="container">

      
    <video ref={videoRef} id="video" width="600" className="current-image" height="450" autoPlay></video>
      <div className="canvas" ref={canvasRef}></div>
      
    


      
      
   
      <div className='data-container'>
        {
          data?.map((obj, index) => {
            const { Name, _id, image, patientId, age, gender, address, state } = obj;

            return (
              <div className='data-card space-y-2' key={index}>
                <img src={image} className="w-[100%] mx-auto mb-2" alt={Name} Patient />
                <p> <b>Name : </b> {Name} </p>
                <p> <b>Patient Id : </b>{patientId}</p>
                <p> <b>gender : </b> {gender}</p>
                <p> <b>Age : </b> {age}</p>
                <p> <b>Address : </b> {address}</p>
                <p> <b>State : </b> {state}</p>
              

                <MdDelete className="text-blue-500 text-[30px] ms-auto " onClick={() => del(_id)} />
              </div>
            );
          })
        }
      </div>
    </div>
    </>
  );
}

export default CriminalData;
