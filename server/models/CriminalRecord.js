import { Schema, model } from "mongoose";

const FaceRecognitionDataSchema = new Schema({
    criminalID: {
        type: String,
        required: true,
        unique: true
    },

     address: {
        type: String
    },

    Name: {
        type: String
    },
   
   state: {
        type: String
    },
   
    dob: {
        type: String
        
    },

  arrestedDate: {
        type: String
        
    },

    crimeInvloved: {
        type: String
        
    },

    image: {
        // data: Buffer, // Store binary image data
        // contentType: String // Store content type (e.g., image/jpeg, image/png)
        type: String
    },


    age: {
        type: Number
    }, 
    gender: {
        type: String
    }
}, {
    timestamps: true
});

const FaceRecognitionData = model("FaceRecognitionData", FaceRecognitionDataSchema);

export default FaceRecognitionData;



