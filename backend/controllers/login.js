//login with phone && (mpin || otp);
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import dotenv from 'dotenv';
dotenv.config();

const loginUser = async (req, res) => {
  try {
    const { phone, mpin, otp } = req.body;
    // console.log(phone);
    // console.log(mpin);
    // console.log(otp);

    if (!phone || (!mpin && !otp)) {
      return res.status(400).json({ message: "Phone number and either MPIN or OTP are required" });
    }

    // Find user
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //  with MPIN
    if (mpin) {
      const isMatch = await bcrypt.compare(mpin, user.mpin);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid MPIN" });
      }
    }

    // with OTP
    if (otp) {
      if (user.otp !== otp || new Date() > user.otpExpires) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
      // clear OTP after successful login
      user.otp = null;
      user.otpExpires = null;
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: "60d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { phone: user.phone, state: user.state },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Failed to log in", error: error.message });
  }
};

export default loginUser;