import mongoose from "mongoose";
import Scheme from "../models/schemeSchema.js";

const getSchemesByGender = async (req, res) => {
    try {
        const { gender } = req.query;

        if (!gender) {
            return res.status(400).json({ error: "Gender is required" });
        }

        const schemes = await Scheme.find({ gender }).select("title description tag1 tag2 tag3 tag4 tag5 -_id");

        if (schemes.length === 0) {
            return res.status(404).json({ message: "No schemes found for this gender" });
        }

        return res.json(schemes);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export default getSchemesByGender;
