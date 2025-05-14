import {getMedicalAnalysis} from "./services/rapidapi_service";


import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.post("/api/analyze-symptoms", async (req, res) => {
  try {
    const { symptoms, patientInfo } = req.body;
    if (!symptoms) {
      return res
        .status(400)
        .json({ errors: "Invaild input, Please provide symtoms " });
    }

    const analysis = await getMedicalAnalysis(symptoms, patientInfo);

    res.json(analysis);
  } catch (error) {
    if (error.message.includes("API key")) {
      return res.status(500).json({
        errors: "Server configuration error, Please contact support.",
      });
    }
    res.status(500).json({
      errors:
        "An error occurred while analyzing symptoms, Please try again later.",
      details: error.message,
    });
  }
});

// error handling middlware
app.use((req, res, next, err) => {
  console.error("Undefined error:", err);
  res
    .status(500)
    .json({ error: "An unexpected error occurred, Please try again later." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
