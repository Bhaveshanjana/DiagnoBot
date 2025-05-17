import React from "react";
import { HeartPulse, AlertCircle } from "lucide-react";

const StepAnalysisResult = ({ analysis, onRestart }) => {
  if (!analysis) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
        <HeartPulse className="w-5 h-5" />
        Analysis Results
      </h2>

      {analysis.disclaimer && (
        <div className="bg-blue-50 text-blue-800 p-3 rounded mb-4 border border-blue-200">
          {analysis.disclaimer}
        </div>
      )}

      <div className="space-y-4">
        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm">
          <h3 className="font-semibold text-blue-600 mb-1">
            Possible Conditions
          </h3>
          <p>{analysis.possibleConditions}</p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm">
          <h3 className="font-semibold text-blue-600 mb-1">
            Recommended Actions
          </h3>
          <p className="whitespace-pre-line">{analysis.recommendations.recommendedActions}</p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm">
          <h3 className="font-semibold text-blue-600 mb-1">
            Additional Information
          </h3>
          <p className="whitespace-pre-line ">{analysis.additionalInfo}</p>
        </div>

        {analysis.requiresPhysicianConsult && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded border border-yellow-200 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <span>
              This analysis suggests consulting a healthcare professional for
              proper evaluation.
            </span>
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={onRestart}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-200 cursor-pointer"
          >
            Start New Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepAnalysisResult;