import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
  state: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag1: { type: String },
  tag2: { type: String },
  tag3: { type: String },
  tag4: { type: String },
  tag5: { type: String },
  Category: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Any"], required: true },
  caste: { type: String, default: "any" },
  ministry: { type: String, required: true },
  disabilityPercentage: { type: Number, default: 0 },
  BPL: { type: String, enum: ["yes", "no"], required: true },
  eligibility: { type: String, required: true },
  gov_emp: { type: String, enum: ["yes", "no"], required: true },
  emp_status: { type: String, default: "any" },
  student: { type: String, enum: ["yes", "no"], required: true },
  occupation: { type: String, required: true },
  appMode: { type: String, enum: ["online", "offline"], required: true },
  docReq: { type: String, required: true },
  benefits: { type: Number, required: true },
  DBT: { type: String, enum: ["yes", "no"], required: true },
  benefit_type: { type: String, required: true },
  marital_status: { type: String, enum: ["married", "unmarried", "any"], required: true },
  differently_abled: { type: String, enum: ["yes", "no"], required: true },
}, { collection: "scheme" }); 

const Scheme = mongoose.model("Scheme", schemeSchema);

export default Scheme;
