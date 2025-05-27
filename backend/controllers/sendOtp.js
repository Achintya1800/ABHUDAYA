import dotenv from "dotenv";
import twilio from "twilio";
import User from "../models/userSchema.js";
dotenv.config();
const SID = process.env.TWILIO_ACCOUNT_SID ;
const token = process.env.twilio_token ;
// console.log(token);
// console.log(SID);

const twilioClient = twilio(SID, token);
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes
const phoneNumber = "+18143287710";

 const sendOtp = async (req, res) => {
  try {
    const { phone, state } = req.body; 

    if (!phone || !state) {
      return res.status(400).json({ message: "Phone number and state are required" });
    }

    // OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // expiry time
    const otpExpires = new Date(Date.now() + OTP_EXPIRY_TIME);

    // if user exists
    let user = await User.findOne({ phone });

    if (user) {
      // Update existing user OTP
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      // Create new user
      user = await User.create({ phone, state, otp, otpExpires });
    }

    // Send 
    await twilioClient.messages.create({
      body: `Your verification code is: ${otp}`,
      from: phoneNumber,
      to: phone,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP Send Error:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

export default sendOtp;
