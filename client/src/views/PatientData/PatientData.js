
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./PatientData.css";
import axios from "axios";
import showToast from "crunchy-toast";
import { MdDelete } from "react-icons/md";
import Header from "../../component/Header/Header";
import Navbar from "./../../component/Navbar/Navbar"

function CriminalData() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false); // Add state to track model loading

  async function searchData() {
    const searchData = await axios.get(`/patient/search?q=${search}`);

    setData(searchData?.data?.data);
    console.log(setData);
  }

  useEffect(() => {
    searchData();
  }, [search]);

  const loadData = async () => {
    const response = await axios.get("/missingPersons");

    setData(response?.data?.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const loadModelsAndStartWebcam = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]);
        setModelLoaded(true); // Set modelLoaded to true when models are loaded
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModelsAndStartWebcam();
  }, []); // Load models only once when the component mounts

  useEffect(() => {
    if (modelLoaded) {
      // Perform face recognition when modelLoaded is true
      startWebcam();
    }
  }, [modelLoaded]); // Run this effect when modelLoaded changes

  const startWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        recognizeFaces(); // Call recognizeFaces after the webcam starts
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  };

  const recognizeFaces = async () => {
    const labeledDescriptors = await getLabeledFaceDescriptors();

    if (labeledDescriptors.length === 0) {
      console.error("No labeled face descriptors found.");
      return;
    }

    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

    videoRef.current.addEventListener("play", async () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      canvasRef.current.append(canvas);

      const displaySize = {
        width: videoRef.current.width,
        height: videoRef.current.height,
      };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoRef.current)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        resizedDetections.forEach((detection) => {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          const box = detection.detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: bestMatch.toString(),
          });
          drawBox.draw(canvas);

          // Check if the face matches any criminal
          if (bestMatch.label !== "unknown") {
            const matchedCriminal = data.find(
              (criminal) => criminal.Name === bestMatch.label
            );
            if (matchedCriminal) {
              showToast(
                `Matched with patient: ${matchedCriminal.Name}`,
                "success",
                3000
              );
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
        const detection = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detection.descriptor);
      } catch (error) {
        console.error("Error fetching image or detecting face:", error);
      }

      if (descriptions.length > 0) {
        labeledDescriptors.push(
          new faceapi.LabeledFaceDescriptors(criminal.Name, descriptions)
        );
      }
    }

    return labeledDescriptors;
  };

  const del = async (_id) => {
    try {
      const response = await axios.delete(`/missingPersons/${_id}`);
      if (response?.data?.message) {
        showToast(response?.data?.message, "warning", 4000);
        loadData();
      }
    } catch (error) {
      console.error("Error deleting criminal record:", error);
    }
  };

  return (
    <>
         <Navbar/>
         <h2 className="text-blue-700 text-center text-4xl my-2">
            All Patients Data
          </h2>
           <br></br>
          <div className="text-blue-700 text-center text-4xl my-2">
           <input
              type="text"
              placeholder="Search patient"
              className="search-bar"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="">
            {/* <div className="video-container">
              <video
                ref={videoRef}
                id="video"
                width="600"
                className="current-image"
                height="450"
                autoPlay
              ></video>
              <div className="canvas" ref={canvasRef}></div>
            </div> */}
            <br/>
           <div className="con">
            <div>
              <Header />
            </div><hr/>
            <br/>
            <div className="row1">
              {data?.map((obj, index) => {
                const { Name, _id, image, patientId, age, gender, address, state } =
                  obj;
    
                return (
                  <div className="d-flex justify-content-evenly content " key={index}>
                    {/* <div className="data">{patientId} </div> */}
                    <div className="data">{patientId} </div>
                    <img src={image} className="data" height="80px" alt={Name} Patient />
                    <div className="data">{Name} </div>
                    <div className="data">{age}</div>
                    <div className="data">{gender}</div>
                    <div className="data">{address}</div>
                    <div className="data">{state}</div>
    
                    <MdDelete
                      className="text-blue-500 text-[30px] data"
                      onClick={() => del(_id)}
                    />
                  </div>
                
                
                );
              })}
            </div>
            </div>
          </div>
    
        </>  );
}

export default CriminalData;

