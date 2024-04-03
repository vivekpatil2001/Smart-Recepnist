// import React, { useEffect, useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import axios from "axios";
// import showToast from "crunchy-toast";
// // import "./FaceDetection.css";

// function FaceDetection() {
//   const [data, setData] = useState([]);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const loadData = async () => {
//     try {
//       const response = await axios.get("/missingPersons");
//       setData(response?.data?.data);
//     } catch (error) {
//       console.error("Error fetching patient records:", error);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []); // Fetch patient records once when the component mounts

//   useEffect(() => {
//     const loadModelsAndStartWebcam = async () => {
//       try {
//         await Promise.all([
//           faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
//           faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//           faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//           faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//           faceapi.nets.faceExpressionNet.loadFromUri("/models"),
//         ]);
//         startWebcam();
//       } catch (error) {
//         console.error("Error loading models:", error);
//       }
//     };

//     const startWebcam = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: true, audio: false })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((error) => {
//           console.error("Error accessing webcam:", error);
//         });
//     };

//     const recognizeFaces = async () => {
//       const labeledDescriptors = await getLabeledFaceDescriptors();

//       if (labeledDescriptors.length === 0) {
//         console.error("No labeled face descriptors found.");
//         return;
//       }

//       const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

//       let matchFound = false; // Initialize a boolean variable to track if a match has been found

//       videoRef.current.addEventListener("play", async () => {
//         const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//         canvasRef.current.append(canvas);

//         const displaySize = {
//           width: videoRef.current.width,
//           height: videoRef.current.height,
//         };
//         faceapi.matchDimensions(canvas, displaySize);

//         setInterval(async () => {
//           const detections = await faceapi
//             .detectAllFaces(videoRef.current)
//             .withFaceLandmarks()
//             .withFaceDescriptors();

//           const resizedDetections = faceapi.resizeResults(
//             detections,
//             displaySize
//           );

//           resizedDetections.forEach((detection) => {
//             if (!matchFound) {
//               // Check if matchFound is false before executing the if condition
//               const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
//               const box = detection.detection.box;
//               const drawBox = new faceapi.draw.DrawBox(box, {
//                 label: bestMatch.toString(),
//               });
//               drawBox.draw(canvas);

//               if (bestMatch.label !== "unknown") {
//                 const matchedpatient = data.find(
//                   (patient) => patient.name === bestMatch.label
//                 );
//                 if (matchedpatient) {
//                   showToast(
//                     `Matched with patient: ${matchedpatient.name}`,
//                     "success",
//                     3000
//                   );
//                   alert(
//                     `Matched with patient: ${matchedpatient.name}. You want to send patient record.`
//                   );

//                   matchFound = true; // Set matchFound to true after the match is found
//                 }
//               }
//             }
//           });
//         }, 100);
//       });
//     };

//     const getLabeledFaceDescriptors = async () => {
//         const labeledDescriptors = [];
      
//         for (const patient of data) {
//           const descriptions = [];
//           try {
//             const img = await faceapi.fetchImage(patient.image);
//             const detection = await faceapi.detectSingleFace(img)
//               .withFaceLandmarks()
//               .withFaceDescriptor();
//             descriptions.push(detection.descriptor);
//           } catch (error) {
//             console.error('Error fetching image or detecting face:', error);
//           }
      
//           if (descriptions.length > 0) {
//             labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(patient.name.toString(), descriptions));
//             // Ensure patient.name is converted to string using toString() method
//           }
//         }
      
//         return labeledDescriptors;
//       };
      
//     loadModelsAndStartWebcam();
//     recognizeFaces();
//   }, [data]); // Fetch patient records whenever data changes

//   return (
//     <>
//       <div>
//         <div className="container">
//           <video
//             ref={videoRef}
//             id="video"
//             width="600"
//             className="current-image"
//             height="550"
//             autoPlay
//           ></video>
//           <div className="canvas" ref={canvasRef}></div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default FaceDetection;
