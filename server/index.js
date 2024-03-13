import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import * as faceapi from 'face-api.js';
import dotenv from "dotenv";
dotenv.config();

// import CriminalRecord from './models/CriminalRecord.js';
import FaceRecognitionData from './models/CriminalRecord.js';
import MissingPersonRecord from "./models/MissingPerson.js";

// import multer from "multer";
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
// import { matchFaces } from 'faceRecognition';
// import cors from "cors";


const app = express();
app.use(bodyParser.json());
// app.use(cors());

async function connectMongoDB() {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log("Connected to MongoDB📦");
    }
}
connectMongoDB();




async function loadModelsAndStartWebcam() {
    try {
        await Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        startWebcam();
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

// Start webcam and perform face detection
function startWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
            videoRef.current.srcObject = stream;

            videoRef.current.addEventListener('play', async () => {
                // Create canvas for drawing
                canvas = faceapi.createCanvasFromMedia(videoRef.current);
                canvasRef.current.append(canvas);

                // Match canvas dimensions with video dimensions
                const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
                faceapi.matchDimensions(canvas, displaySize);

                // Perform face detection in a loop
                setInterval(async () => {
                    const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                        // .withFaceLandmarks()
                        .withFaceExpressions();

                    // Draw results on canvas
                    if (detections) {
                        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                        faceapi.draw.drawDetections(canvas, faceapi.resizeResults([detections], displaySize));
                        // faceapi.draw.drawFaceLandmarks(canvas, faceapi.resizeResults([detections], displaySize));
                        faceapi.draw.drawFaceExpressions(canvas, faceapi.resizeResults([detections], displaySize));
                    }
                }, 100);
            });
        })
        .catch((error) => {
            console.error('Error accessing webcam:', error);
        });
    // This function should start the webcam and perform face detection
}

// Match faces with image using data from the database
async function matchFacesWithImage(currentImage) {
    try {
        // Perform face detection on the current image
        const detections = await faceapi.detectSingleFace(currentImage).withFaceDescriptor();

        // Fetch face recognition data from the database
        const savedDescriptors = await FaceRecognitionData.find({}, 'faceDescriptor');

        // Compare current face descriptor with saved descriptors
        for (const savedDescriptor of savedDescriptors) {
            const distance = faceapi.euclideanDistance(detections.descriptor, savedDescriptor.faceDescriptor);
            if (distance < 0.6) { // Adjust the threshold as needed
                return { success: true, message: 'Face match found' };
            }
        }
        return { success: false, message: 'No match found' };
    } catch (error) {
        console.error('Error matching faces with image:', error);
        return { success: false, message: 'Internal server error' };
    }
}

// API endpoint to find face recognition data
app.post('/find-face-recognition-data', async (req, res) => {
    try {
        const currentImage = req.body.image; // Assuming the image is sent in the request body

        // Call function to match faces with image using data from the database
        const matchResult = await matchFacesWithImage(currentImage);

        if (matchResult.success) {
            res.status(200).json({ success: true, message: 'Face match successful' });
        } else {
            res.status(200).json({ success: false, message: 'No match found' });
        }
    } catch (error) {
        console.error('Error finding face recognition data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


// user signup 
app.post('/signup', async (req, res) => {
    const { name, address, mobile, email, password, gender } = req.body;
    try {
        const newUser = new User({
            name,
            address,
            mobile,
            email,
            password,
            gender

        })

        const savedUser = await newUser.save();

        res.json({
            success: true,
            data: savedUser,
            message: 'successfully SignUp'
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })

    }
});


// user login
app.post('/login', async (req, res) => {
    const { email, password, mobile, name } = req.body;

    const user = await User.findOne({ email, password }).select('email name mobile');

    if (user == null) {
        return res.json({
            success: false,
            message: "Login failed..!"
        }
        )
    }
    res.json({
        success: true,
        data: user,
        message: "Login successfully..!"
    }
    )
});

// criminal form api

// app.post("/criminalRecord", async (req, res) => {
    app.post('/criminalRecords', async (req, res) => {
        try {
            const {
                criminalID,
                address,
                Name,
                state,
                image,
                crimeInvloved,
                dob,
                arrestedDate,
                age,
                gender
            } = req.body;
    
            // Assuming FaceRecognitionData is your Mongoose model
            const faceRecognitionData = new FaceRecognitionData({
                criminalID,
                address,
                Name,
                state,
                image,
                crimeInvloved,
                dob,
                arrestedDate,
                age,
                gender
            });
    
            // Save the face recognition data to the database
            await faceRecognitionData.save();
    
            res.status(201).json({ message: 'Face recognition data saved successfully' });
        } catch (error) {
            console.error('Error saving face recognition data:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    
// get criminal record 

app.get('/criminalRecords', async (req, res) => {
    const criminalRecords = await FaceRecognitionData.find();

    res.json({
        success: true,
        data: criminalRecords,
        message: 'Criminal Record fetched successfully'
    })
});


// delete criminal data 

app.delete('/criminalRecord/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        await FaceRecognitionData.deleteOne({ _id: _id });

        res.json({
            success: true,
            message: `Successfully deleted Criminal data`
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }

});

// update criminal data

app.put('/criminalRecord/:_id', async (req, res) => {
    const { _id } = req.params;
    const { criminalID, address, Name, state, photo, crimeInvloved, dob, arrestedDate, age, gender } = req.body;

    await FaceRecognitionData.updateOne({ _id: _id },
        {
            $set: { criminalID, address, Name, state, photo, crimeInvloved, dob, arrestedDate, age, gender },
        }
    );

    try {
        const updateCriminalData = await FaceRecognitionData.findOne({ _id: _id });
        return res.status(200).json({
            success: true,
            data: updateCriminalData,
            message: "Criminal Data updated successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});


// missing person form api

app.post("/missingPerson", async (req, res) => {
    const {
      address,
      Name,
      state,
      image,
      dob,
      age,
      gender
    } = req.body;
  
    const missingPersonRecord = new MissingPersonRecord({
      address,
      Name,
      state,
      image,
      dob,
      age,
      gender
    });
  
    try {
      const savedMissingPersonRecord = await missingPersonRecord.save();
  
      // Handle image upload
      const newImage = new Image({
        data: Buffer.from(image, 'base64'), // Assuming image is base64 encoded
        contentType: 'image/*'
      });
      await newImage.save();
  
      res.json({
        success: true,
        data: savedMissingPersonRecord,
        message: "Missing person Record saved successfully"
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message
      });
    }
  });

// get missing person record 

app.get('/missingPersons', async (req, res) => {
    const missingPerson = await MissingPersonRecord.find();

    res.json({
        success: true,
        data: missingPerson,
        message: 'Missing person Record fetched successfully'
    })
});


// delete missing person 

app.delete('/missingPersons/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        await MissingPersonRecord.deleteOne({ _id: _id });

        res.json({
            success: true,
            message: `Successfully deleted missing person's data`
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }

})






// // API endpoint to find data using the current image
// app.post('/find-face-recognition-data', async (req, res) => {
//     try {
//         const currentImage = req.body.image; // Assuming the image is sent in the request body

//         // Call a function to match the current image with images in the database
//         const matchedData = await matchFacesWithImage(currentImage); // This function should query the database based on the provided image

//         if (matchedData) {
//             // If a match is found, send the matched data
//             res.status(200).json({ success: true, data: matchedData, message: 'Match found' });
//         } else {
//             res.status(200).json({ success: false, message: 'No match found' });
//         }
//     } catch (error) {
//         console.error('Error finding data:', error);
//         res.status(500).json({ success: false, error: 'Internal server error' });
//     }
// });

// // Function to match current image with stored images in the database
// async function matchFacesWithImage(currentImage) {
//     try {
//         // Query the database to find data using the current image
//         const matchedData = await FaceRecognitionData.findOne({ image: currentImage });
//         return matchedData; // Return the matched data if found
//     } catch (error) {
//         console.error('Error matching faces with image:', error);
//         return null; // Return null if there's an error or no match found
//     }
// }







// // API endpoint to receive current image
// app.post('/match-image', async (req, res) => {
//     try {
//       const currentImage = req.body.image; // Assuming the image is sent in the request body
  
//       // Call a function to match the current image with images in the database
//       const matchResult = await matchFaces(currentImage); // This function should perform face matching
  
//       if (matchResult.matchFound) {
//         // If a match is found, send an email
//         sendEmail(matchResult.matchedPersonName);
//         res.status(200).json({ message: 'Match found. Email sent.' });
//       } else {
//         res.status(200).json({ message: 'No match found.' });
//       }
//     } catch (error) {
//       console.error('Error matching image:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });





  
// Function to send email
function sendEmail(personName) {
   
// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'your_email_service_provider',
    auth: {
      user: 'your_email_address',
      pass: 'your_email_password'
    }
  });
  
  // Endpoint to send email
  app.post('/send-email', (req, res) => {
    const { name, email, data } = req.body;
  
    // Construct email message
    const mailOptions = {
        from: 'bandinikohare16@gmail.com',
        to: 'bandinikohare30@gmail.com',
        subject: 'Face Detected!',
      text: `Hello ${name}, Face Detected! Here's the data: ${data}`
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });

  }

  app.get('/patient/search', async (req, res) => {
    const { q } = req.query;

    const patient = await MissingPersonRecord.find({ Name: { $regex: q, $options: "i" } })

    res.json({
        success: true,
        data:patient,
        message: 'patient searched'
    })
});


  











const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The server is Running on Port ${PORT} 🚀`);
});



