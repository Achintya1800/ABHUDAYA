import Scheme from "../models/schemeSchema.js";

const stateCount = async (req, res) => {
    console.log("Request received");
    try {
        const { state } = req.query;
        if (!state) {
            return res.status(400).json({ error: "State is required" });
        }
        
        const schemesCount = await Scheme.countDocuments({ state });
        // const schemes = await Scheme.find({});
        // console.log("All schemes:", schemes);
        console.log(`Count for state ${state}:`, schemesCount);
        
        return res.json({ count: schemesCount });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ error: err.message });
    }
};

export default stateCount;
