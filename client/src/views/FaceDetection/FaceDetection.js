
// // import React, { useEffect, useRef, useState } from 'react';
// // import * as faceapi from 'face-api.js';
// // import './FaceDetection.css';

// // function FaceDetection() {

// //     const [detectionResult, setDetectionResult] = useState([]);
// //     const videoRef = useRef(null);
// //     const canvasRef = useRef(null);
// //     let resizedDetections;
// //     let faceMatcher;
// //     let canvas;

// //     useEffect(() => {
// //         // Load face detection models and start webcam
// //         const loadModelsAndStartWebcam = async () => {
// //             try {
// //                 await Promise.all([
// //                     faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
// //                     faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
// //                     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
// //                     faceapi.nets.faceRecognitionNet.loadFromUri('/models')
// //                     // faceapi.nets.faceExpressionNet.loadFromUri('/models')
// //                 ]);
// //                 startWebcam();
// //                 fetchFaceRecognitionData();
// //             } catch (error) {
// //                 console.error('Error loading models:', error);
// //             }
// //         };

// //         // Start webcam
// //         const startWebcam = () => {
// //             navigator.mediaDevices.getUserMedia({ video: true, audio: false })
// //                 .then((stream) => {
// //                     videoRef.current.srcObject = stream;
// //                 })
// //                 .catch((error) => {
// //                     console.error('Error accessing webcam:', error);
// //                 });
// //         };

// //         // Detect and match faces
// //         const detectAndMatchFaces = async () => {
// //             videoRef.current.addEventListener('play', async () => {
// //                 try {
// //                     // Fetch labeled face descriptors
// //                     const labeledFaceDescriptors = await getLabeledFaceDescriptors();
// //                     faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

// //                     canvas = faceapi.createCanvasFromMedia(videoRef.current);
// //                     canvasRef.current.append(canvas);

// //                     const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
// //                     faceapi.matchDimensions(canvas, displaySize);

// //                     setInterval(async () => {
// //                         const detections = await faceapi.detectAllFaces(videoRef.current)
// //                             .withFaceLandmarks()
// //                             .withFaceDescriptors();

// //                         resizedDetections = faceapi.resizeResults(detections, displaySize);
// //                         setDetectionResult(resizedDetections); // Update detection result state

// //                         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

// //                         if (resizedDetections && resizedDetections.length > 0) {
// //                             resizedDetections.forEach(detection => {
// //                                 const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
// //                                 const box = detection.detection.box;
// //                                 const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.toString() });
// //                                 drawBox.draw(canvas);

// //                                 // If a face is detected, send an email
// //                                 if (bestMatch.label !== 'unknown') {
// //                                     sendEmail(bestMatch.label, labeledFaceDescriptors); // Pass labeled face descriptors to sendEmail
// //                                 }
// //                             });
// //                         }
// //                     }, 100);
// //                 } catch (error) {
// //                     console.error('Error detecting and matching faces:', error);
// //                 }
// //             });
// //         };

// //         // Fetch labeled face descriptors
// //         const getLabeledFaceDescriptors = async () => {
// //             try {
// //                 // Fetch labeled face descriptors from your backend server or any other source
// //                 const response = await fetch('/find-face-recognition-data'); // Assuming this endpoint returns the labeled face descriptors
// //                 const data = await response.json();
// //                 return data; // Return the fetched labeled face descriptors
// //             } catch (error) {
// //                 console.error('Error fetching labeled face descriptors:', error);
// //                 throw error; // Throw the error to handle it elsewhere if needed
// //             }
// //         };

// //         // Send email
// //         const sendEmail = async (personName, labeledFaceDescriptors) => {
// //             try {
// //                 await fetch('http://localhost:3001/send-email', {
// //                     method: 'POST',
// //                     headers: {
// //                         'Content-Type': 'application/json'
// //                     },
// //                     body: JSON.stringify({
// //                         name: personName,
// //                         email: 'bandinikohare16@gmail.com',
// //                         data: labeledFaceDescriptors
// //                     })
// //                 });
// //             } catch (error) {
// //                 console.error('Error sending email:', error);
// //             }
// //         };

// //         // Call necessary functions
// //         loadModelsAndStartWebcam();
// //         detectAndMatchFaces();
// //     }, []);
    
// // const fetchFaceRecognitionData = async (image) => {
// //     try {
// //         const response = await fetch('/find-face-recognition-data', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             },
// //             body: JSON.stringify({ image: image })
// //         });
// //         const data = await response.json();
// //         return data;
// //     } catch (error) {
// //         console.error('Error fetching face recognition data:', error);
// //         throw error;
// //     }
// // };

// //     return (
// //         <div className="container">
// //             <video ref={videoRef} id="video" width="600" className="current-image" height="450" autoPlay></video>
// //             <div className="canvass" ref={canvasRef}></div>
// //         </div>
// //     );
// // }

// // export default FaceDetection;


// import React, { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import './FaceDetection.css';

// function FaceDetection() {
//     const [detectionResult, setDetectionResult] = useState([]);
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     let canvas;

//     useEffect(() => {
//         const loadModelsAndStartWebcam = async () => {
//             try {
//                 await Promise.all([
//                     faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
//                     faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//                     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//                     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//                     faceapi.nets.faceExpressionNet.loadFromUri('/models')
//                 ]);
//                 startWebcam();
//             } catch (error) {
//                 console.error('Error loading models:', error);
//             }
//         };

//         const startWebcam = () => {
//             navigator.mediaDevices.getUserMedia({ video: true, audio: false })
//                 .then((stream) => {
//                     videoRef.current.srcObject = stream;
//                 })
//                 .catch((error) => {
//                     console.error('Error accessing webcam:', error);
//                 });
//         };

//         const detectAndMatchFaces = async (imageData) => {
//             try {
//                 const response = await fetch('/match-faces', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ image: imageData })
//                 });
//                 const matchedData = await response.json();
//                 console.log('Matched faces:', matchedData);
//                 // Handle matched faces data as needed
//             } catch (error) {
//                 console.error('Error matching faces:', error);
//             }
//         };

//         const detectFaces = async () => {
//             videoRef.current.addEventListener('play', async () => {
//                 canvas = faceapi.createCanvasFromMedia(videoRef.current);
//                 canvasRef.current.append(canvas);

//                 const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
//                 faceapi.matchDimensions(canvas, displaySize);

//                 setInterval(async () => {
//                     const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//                         .withFaceLandmarks()
//                         .withFaceExpressions()
//                         .withFaceDescriptors()

//                     setDetectionResult(detections);

//                     const image = canvas.toDataURL(); // Convert canvas to base64 image
//                     detectAndMatchFaces(image);
                    
//                     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//                     faceapi.draw.drawDetections(canvas, faceapi.resizeResults(detections, displaySize));
//                     // faceapi.draw.drawFaceLandmarks(canvas, faceapi.resizeResults(detections, displaySize));
//                     // faceapi.draw.drawFaceExpressions(canvas, faceapi.resizeResults(detections, displaySize));
//                 }, 100);
//             });
//         };

//         loadModelsAndStartWebcam();
//         detectFaces();
//     }, []);

//     return (
//         <div className="container">
//             <video ref={videoRef} id="video" width="600" className="current-image" height="450" autoPlay></video>
//             <div className="canvas" ref={canvasRef}></div>
//         </div>
//     );
// }

// export default FaceDetection;















import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import showToast from 'crunchy-toast';
import "./FaceDetection.css"

function FaceDetection() {
  const [data, setData] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const loadData = async () => {
    const response = await axios.post('/criminalrecords');

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
          // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    
          resizedDetections.forEach(detection => {
            const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
            const box = detection.detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.toString() });
            drawBox.draw(canvas);
    
            // Check if the face matches any criminal
            if (bestMatch.label !== 'unknown') {
           
              const matchedCriminal = data.find(criminal => criminal.name === bestMatch.label);
              if (matchedCriminal) {
                showToast(`Matched with criminal: ${matchedCriminal.name}`, 'success', 3000);
              
                  // loadData(matchedCriminal);
              
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
          labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(criminal.name, descriptions));
        }
      }

      return labeledDescriptors;
    };

    loadModelsAndStartWebcam();
    recognizeFaces();

  }, [data]);




  return (
    <div className="container">
     <div>
     <video ref={videoRef} id="video" width="300" className="current-image" height="250" autoPlay></video>
      <div className="canvas" ref={canvasRef}></div>
     </div>
    
    </div>
  );
}

export default FaceDetection;
