import React from "react";
import "./Home.css";
import Navbar from "../../component/Navbar/Navbar";
import Img from "./hospital-logo.jpg";
import Img02 from "./facial_recognition.02jpg.jpg";
import { FaDatabase } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";
import { FaFaceGrinWide } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { MdSettingsVoice } from "react-icons/md";
import { BsRocketTakeoff } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div class="container flex justify-between">
        <div class="md:w-1/2 p-4 ">
          <h1 class="text-4xl font-bold mb-3">
            Welcome to{" "}
            <span className="text-pink-600">Smart Receptionist !</span>
          </h1>
          <p class="text-gray-700 mb-">
            At SmartReceptionist™, we make sure to understand your business so
            that we can be far more than just an answering service. In fact, all
            of the following is available when you work with us.
            {/* A smart receptionist refers to a digital or automated system designed to handle tasks typically performed by a human receptionist. */}
            {/* Our mission to identify the criminals in any investigation department from images of the criminals in our database along with his details and those images are segmented into many slices say eyes, hairs, lips, nose, etc. */}
          </p>
          <br />
          <div className=" ">
            <Link to="/patientform">
              {" "}
              <button className="bg-pink-600 cursor-pointer hover:bg-pink-800 text-white font-bold py-2 px-4 rounded-lg">
                <div className="flex justify-center items-center gap-x-2 font-bold">
                  <span>Get Started</span>{" "}
                  <span>
                    <BsRocketTakeoff />
                  </span>
                </div>
              </button>{" "}
            </Link>
          </div>
          <div>
            <section>
              <div className="img">
                <img
                  data-aos="fade-left"
                  data-aos-offset="400"
                  data-aos-easing="ease-in-sine"
                  src={Img}
                  class="h-[300px] w-[600px] rounded-3  "
                />
              </div>
            </section>
          </div>
        </div>

        <div class="md:w-1/2 p-5 box-container mb-10">
          <div className="left w-70 ms-2 main-container second-box">
            <div className="second-box">
              <div className="card w-90 py-11 bg-slate-50 border-2 hover:border-pink-500 duration-400 rounded-lg box shadow-md relative">
                <FaClipboardList className="text-pink-500 border-2 p-[4px]  shadow-md border-pink-500 text-[45px] rounded block mx-auto absolute top-4 left-9" />
                <p className="absolute bottom-5 text-[22px] pl-5  font-bold  left-20">
                  {" "}
                  <a
                    href="/missingPersonData"
                    className="no-underline text-black"
                  >
                   <Link to="/patientdata" className="text"> Patient's Info{" "}</Link>
                  </a>
                </p>
              </div>
            </div>

            <div className="second-box">
              <div className="card w-90 py-11 bg-slate-50 border-2 hover:border-pink-500 duration-400 rounded-lg box shadow-md relative">
                <FaFaceGrinWide className="text-pink-500 border-2 p-[4px]  shadow-md border-pink-500 text-[45px] rounded block mx-auto absolute top-4 left-9" />
                <p className="absolute bottom-4 text-[22px] font-bold pl-5 left-20">
                  {" "}
                  Face Recongnition
                </p>
              </div>
            </div>

            <div className="second-box">
              <div className="card w-90 py-11 bg-slate-50 border-2 hover:border-pink-500 duration-400 rounded-lg box shadow-md relative">
                <MdSettingsVoice className="text-pink-500 border-2 p-[4px]  shadow-md border-pink-500 text-[45px] rounded block mx-auto absolute top-4 left-9" />
                <p className="absolute bottom-4 text-[22px] font-bold left-20 pl-5">
                  {" "}
                  Voice interaction
                </p>
              </div>
            </div>

            <div className="second-box">
              <div className="card w-90 py-11 bg-slate-50 border-2 hover:border-pink-500 duration-400 rounded-lg box  shadow-md relative">
                <FaDatabase className="text-pink-500 border-2 p-[6px]  shadow-md border-pink-500 text-[45px] rounded block mx-auto absolute top-4 left-9" />
                <p className="absolute bottom-4 text-[22px] font-bold pl-5 left-20">
                  {" "}
                  All Data of recongnition
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
