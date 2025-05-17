import React, { useState } from "react";
import axios from "axios";
import StepSymptoms from "./StepSymptoms";
import StepPatientInfo from "./StepPatientInfo";
import StepAnalysisResult from "./StepAnalysisResult";
import StepIndicator from "./StepIndicator";

const SymptomChecker = () => {
  const steps = ["Enter Symptoms", "Patient Information", "Analysis Results"];
  const [activeStep, setActiveStep] = useState(0);
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [patientInfo, setPatientInfo] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    smoking: false,
    alcohol: "none",
    exercise: "light",
    diet: "balanced",
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const formattedPatientInfo = {
        ...patientInfo,
        medicalHistory: patientInfo.medicalHistory
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        currentMedications: patientInfo.currentMedications
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        allergies: patientInfo.allergies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/analyze-symptoms`,
        {
          symptoms,
          patientInfo: formattedPatientInfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setAnalysis(data);
      handleNext();
    } catch (err) {
      if (err.response.data.details) {
        setError("Free api limit is reached");
      } else {
        setError("An error occurred while analyzing symptoms", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h1 className="text-3xl font-bold  text-blue-600 mb-6 flex  justify-center gap-2">
        Symptom Checker
      </h1>
      <StepIndicator steps={steps} currentStep={activeStep} />
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      {activeStep === 0 && (
        <StepSymptoms
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          onNext={handleNext}
        />
      )}
      {activeStep === 1 && (
        <StepPatientInfo
          patientInfo={patientInfo}
          setPatientInfo={setPatientInfo}
          onBack={handleBack}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
      {activeStep === 2 && (
        <StepAnalysisResult
          analysis={analysis}
          onRestart={() => {
            setActiveStep(0);
            setSymptoms("");
            setAnalysis(null);
          }}
        />
      )}
    </div>
  );
};

export default SymptomChecker;
