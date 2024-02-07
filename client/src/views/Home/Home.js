import React from "react";
import "./Home.css"
import Navbar from "../../component/Navbar/Navbar";
import Img from "./home-page-image.jpg";
import Img02 from "./facial_recognition.02jpg.jpg";
import { FaDatabase } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";
import { FaFaceGrinWide } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { BsRocketTakeoff } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div class="container ">
        <div class="md:w-1/2 p-4">
          <h1 class="text-4xl font-bold mb-4">
            Welcome to <span className="text-pink-600">Smart Receptionist !</span>
          </h1>
          <p class="text-gray-700 mb-4">
            At SmartReceptionist™, we make sure to understand your business so that we can be far more than just an answering service. In fact, all of the following is available when you work with us.
            {/* A smart receptionist refers to a digital or automated system designed to handle tasks typically performed by a human receptionist. */}
            {/* Our mission to identify the criminals in any investigation department from images of the criminals in our database along with his details and those images are segmented into many slices say eyes, hairs, lips, nose, etc. */}
          </p>
          <div className=" ">
            <Link to="/login">
              {" "}
              <button className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded-lg">
                <div className="flex justify-center items-center gap-x-2 font-bold">
                  <span>Get Started</span>{" "}
                  <span>
                    <BsRocketTakeoff />
                  </span>
                </div>
              </button>{" "}
            </Link>
          </div>
        </div>

        {/* <div class="md:w-1/2 p-2">
            <img
              data-aos="fade-left"
              data-aos-offset="400"
              data-aos-easing="ease-in-sine"
              src={Img}
              alt="Right Side Image"
              class="h-[300px] w-300px rounded-md block mx-auto"
            />
          </div> */}
      </div>

      <section>
        <div className="container mx-auto my-1 sm:my-1 ">
          <div class="container flex  items-center  min-[320px]:flex-col md:flex-row justify-evenly">
            <div class="md:w-1/2 p-1">
              <img
                data-aos="fade-left"
                data-aos-offset="400"
                data-aos-easing="ease-in-sine"
                src={Img}

                class="h-[300px] w-[600px] rounded-md block mx-auto"
              />
            </div>

            <div className="left w-50 ms-2 ">
              <div className="flex  justify-evenly  min-[320px]:flex-col md:flex-row sm:mt-4 gap-x-3 gap-y-3 items-center mb-3  ">
                {/* <div className="card w-80 py-11 bg-slate-50 border-2 hover:border-sky-500 duration-400 rounded-lg  shadow-md 
                 relative">
                  <FaClipboardList className="text-blue-500 border-2 p-[5px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4" />
                  <p className="absolute bottom-2 text-[19px ] font-bold left-16">
                    {" "}
                    <a href="/criminalData" className="no-underline text-black">   Get Criminal Information</a>
                  </p>
                </div> */}
                <div className="card w-80 py-11 bg-slate-50 border-2 hover:border-sky-500 duration-400 rounded-lg  shadow-md relative">
                  <FaClipboardList className="text-blue-500 border-2 p-[4px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4" />

                  <p className="absolute bottom-5 text-[20px]  font-bold left-20">
                    {" "}
                    <a href="/missingPersonData" className="no-underline text-black">Person's Info </a>
                  </p>
                </div>
              </div><br/>
              
              
                
              <div className="flex justify-evenly min-[320px]:flex-col  md:flex-row gap-x-3 boxes  items-center mb-5  ">

              <div className="card w-80 py-11 bg-slate-50 border-2 hover:border-sky-500 duration-400 rounded-lg  shadow-md relative">
                  <FaFaceGrinWide className="text-blue-500 border-2 p-[6px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4" />
                  <p className="absolute bottom-5 text-[20px] font-bold left-20">
                    {" "}
                    Face Recongnition
                  </p>
                </div><br/>
                
                <div className="card w-80 py-11 bg-slate-50 border-2 hover:border-sky-500 duration-400 rounded-lg  shadow-md relative">
                  < FaDatabase className="text-blue-500 border-2 p-[6px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4" />
                  <p className="absolute bottom-5 text-[18px] font-bold left-20">
                    {" "}
                    All Data of recongnition
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;