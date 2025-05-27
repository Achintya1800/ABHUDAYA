import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    dob: { type: Number, required: true } // Format: DDMMYYYY
});

const UserNew = mongoose.model("UserNew", userSchema, "user"); // Explicitly specify the collection name

export default UserNew;
