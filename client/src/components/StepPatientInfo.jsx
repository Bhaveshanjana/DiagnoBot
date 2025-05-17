import React from "react";
import { UserPlus } from "lucide-react";

const StepPatientInfo = ({
  patientInfo,
  setPatientInfo,
  onBack,
  onSubmit,
  loading,
}) => {
  const handleChange = (field) => (e) => {
    const value = field === "smoking" ? e.target.checked : e.target.value;
    setPatientInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
        <UserPlus className="w-5 h-5" />
        Patient Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Age"
          value={patientInfo.age}
          onChange={handleChange("age")}
          className="input"
        />
        <select
          value={patientInfo.gender}
          onChange={handleChange("gender")}
          className="input"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="number"
          placeholder="Height (cm)"
          value={patientInfo.height}
          onChange={handleChange("height")}
          className="input"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={patientInfo.weight}
          onChange={handleChange("weight")}
          className="input"
        />
      </div>

      <textarea
        placeholder="Medical History (Optional)"
        value={patientInfo.medicalHistory}
        onChange={handleChange("medicalHistory")}
        className="input"
      />
      <textarea
        placeholder="Current Medications (Optional)"
        value={patientInfo.currentMedications}
        onChange={handleChange("currentMedications")}
        className="input"
      />
      <textarea
        placeholder="Allergies (Optional)"
        value={patientInfo.allergies}
        onChange={handleChange("allergies")}
        className="input"
      />
      <div>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={patientInfo.smoking}
            onChange={handleChange("smoking")}
          />
          Smoking
        </label>
      </div>

      <label htmlFor="">Alcohol Consumption</label>
      <select
        value={patientInfo.alcohol}
        onChange={handleChange("alcohol")}
        className="input"
      >
        <option value="none">None</option>
        <option value="occasional">Occasional</option>
        <option value="moderate">Moderate</option>
        <option value="heavy">Heavy</option>
      </select>

      <label htmlFor="">Exercise</label>
      <select
        value={patientInfo.exercise}
        onChange={handleChange("exercise")}
        className="input"
      >
        <option value="none">None</option>
        <option value="light">Light</option>
        <option value="moderate">Moderate</option>
        <option value="heavy">Heavy</option>
      </select>

      <label htmlFor="">Diet</label>
      <select
        value={patientInfo.diet}
        onChange={handleChange("diet")}
        className="input"
      >
        <option value="balanced">Balanced</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="keto">Keto</option>
        <option value="other">Other</option>
      </select>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition-all duration-200 cursor-pointer"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-200 cursor-pointer"
        >
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </button>
      </div>
    </form>
  );
};

export default StepPatientInfo;