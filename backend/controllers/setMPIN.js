import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";

const setMpin = async (req, res) => {
  try {
    const { phone, mpin } = req.body;

    if (!phone || !mpin) {
      return res.status(400).json({ message: "Phone number and MPIN are required" });
    }

    if (mpin.length !== 4 || isNaN(mpin)) {
      return res.status(400).json({ message: "MPIN must be a 4-digit number" });
    }

    const user = await User.findOne({ phone });

    if (!user || !user.isVerified) {
      return res.status(400).json({ message: "User not found or OTP not verified" });
    }

    // Hash MPIN
    const salt = await bcrypt.genSalt(10);
    const hashedMpin = await bcrypt.hash(mpin, salt);

    // Save 
    user.mpin = hashedMpin;
    await user.save();

    res.status(200).json({ message: "MPIN set successfully." });
  } catch (error) {
    console.error("Set MPIN Error:", error);
    res.status(500).json({ message: "Failed to set MPIN", error: error.message });
  }
};

export default setMpin;