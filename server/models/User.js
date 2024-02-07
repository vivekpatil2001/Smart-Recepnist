import {model , Schema} from 'mongoose';

const userSchema = new Schema (
    {
      name :{
        type : String,
        default: "user"
      },
      
      mobile : {
        type : String,
        required : true
      },

      email : {
        type : String,
        unique : true
      },

      password : {
        type : String,
        required : true
      },

      gender :{
        type : String,
        required : true
      }
    }
) ;

const User = model("user" , userSchema);
export default User;