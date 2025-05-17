import React from "react";

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={label} className="flex-1 text-center relative">
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 text-sm font-medium
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </div>
            <p
              className={`text-sm ${
                isActive ? "font-semibold text-blue-600" : "text-gray-600"
              }`}
            >
              {label}
            </p>
            {index < steps.length - 1 && (
              <div className="absolute top-4 left-full w-full h-1 bg-gray-300">
                <div
                  className={`h-1 ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={{ width: "100%" }}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
