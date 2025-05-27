import dotenv from "dotenv";
import User from "../models/userSchema.js";
dotenv.config();

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone number and OTP are required" });
    }

    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = null; // remove OTP after verification
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Failed to verify OTP", error: error.message });
  }
};

export default verifyOtp ;
