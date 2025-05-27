import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String, 
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 13,
    },
    state: {
      type: String,
      required: true,
    },
    otp: {
      type: String, 
    },
    otpExpires: {
      type: Date, 
    },
    isVerified: {
      type: Boolean,
      default: false, 
    },
    mpin:{
      type:String,
    }
  },
  { timestamps: true } 
);

const User = mongoose.model("User", userSchema);
export default User;
