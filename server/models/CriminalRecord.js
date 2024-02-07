import { Schema, model } from "mongoose";

const CriminalRecordSchema = new Schema({
 criminalID: {
        type: Number,
        required: true,
        unique: true
    },
     address: {
        type: String,
        required: true
    },

    Name: {
        type: String,
        required: true
    },
   
   state: {
        type: String,
        required: true
    },
   
    dob: {
        type: String,
        
    },

  arrestedDate: {
        type: String,
        required: true
        
    },

    crimeInvloved: {
        type: String,
        required: true
        
    },

    image: {
        type:String,
    },


    age: {
        type: Number,
        required: true
    }, 
    gender: {
        type: String,
    }
}, {
    timestamps: true 
});

const CriminalRecord = model("CriminalRecord", CriminalRecordSchema);

export default CriminalRecord;
