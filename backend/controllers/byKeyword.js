import mongoose from "mongoose";
import Scheme from "../models/schemeSchema.js";

const getSchemesByKeyword = async (req, res) => {
    try {
        const { keyword, page = 1, limit = 5 } = req.query;

        if (!keyword) {
            return res.status(400).json({ error: "Keyword is required" });
        }

        // Dynamic search across multiple fields
        const query = {
            $or: [
                { tag1: keyword },
                { tag2: keyword },
                { tag3: keyword },
                { tag4: keyword },
                { tag5: keyword },
                { Category: keyword },
                { DBT: keyword },
                { ministry: keyword },
                {state : keyword},
                {caste : keyword},
            ]
        };

        // Pagination logic
        const schemes = await Scheme.find(query)
            .select("ministry benefits title description tag1 tag2 tag3 tag4 tag5 -_id")
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        if (schemes.length === 0) {
            return res.status(404).json({ message: "No schemes found" });
        }

        return res.json(schemes);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


export default getSchemesByKeyword;
