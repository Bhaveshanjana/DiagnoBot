import React from "react";
import { ClipboardList } from "lucide-react";

const StepSymptoms = ({ symptoms, setSymptoms, onNext }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
        <ClipboardList className="w-5 h-5" />
        Describe Your Symptoms
      </h2>
      <textarea
        className="w-full border border-gray-300 rounded p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
        placeholder="Example: severe headache, fever, fatigue, sensitivity to light"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700  disabled:opacity-50 transition-all duration-200 cursor-pointer disabled:cursor-no-drop"
        onClick={onNext}
        disabled={!symptoms.trim()}
      >
        Next: Patient Information
      </button>
    </div>
  );
};

export default StepSymptoms;