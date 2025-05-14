import axios from "axios";

export default getMedicalAnalysis = async (symptoms, patientInfo = {}) => {
  try {
    if (!process.env.RAPIDAPI_KEY) {
      throw new Error("RAPIDAPI_KEY is not configured");
    }

    // convert symptoms into array
    const symptomsArray = Array.isArray(symptoms)
      ? symptoms
      : symptoms.split(",").map((s) => s.trim());

    const data = {
      symptoms: symptomsArray,
      patientInfo: {
        age: patientInfo.age || 30,
        gender: patientInfo.gender || "unknown",
        height: patientInfo.height || 170,
        weight: patientInfo.weight || 70,
        medicalHistory: patientInfo.medicalHistory || [],
        currentMedications: patientInfo.currentMedications || [],
        allergies: patientInfo.allergies || [],
        lifestyle: {
          smoking: patientInfo.smoking || false,
          alcohol: patientInfo.alcohol || "none",
          exercise: patientInfo.exercise || "moderate",
          diet: patientInfo.diet || "balanced",
        },
      },
      lang: "en",
    };

    // option that contain data,api detail,api url
    const options = {
      method: "POST",
      url: "https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose",
      params: { noqueue: "1" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host":
          "ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com",
      },
      data: data,
    };

    // making request
    const response = await axios.request(options);

    if (
      response.data &&
      response.data.status === "success" &&
      response.data.result
    ) {
      const { analysis, educationalResources, meta } = response.data.result;

      // handle the response data
      const possibleConditions = Array.isArray(analysis.possibleConditions)
        ? analysis.possibleConditions
            .map(
              (condition) =>
                condition.name || condition.condition || "Unknown condition"
            )
            .join(", ")
        : "No specific conditions identified";

      // save advice
      const recommendations = [];
      if (
        analysis.generalAdvice &&
        typeof analysis.generalAdvice === "object"
      ) {
        Object.entries(analysis.generalAdvice).forEach(([key, value]) => {
          if (value) recommendations.push(`${key}: ${value}`);
        });
      }

      const preventiveMeasures = Array.isArray(
        educationalResources.preventiveMeasures
      )
        ? educationalResources.preventiveMeasures
        : [];

      const reliableSources = Array.isArray(
        educationalResources.reliableSources
      )
        ? educationalResources.reliableSources
        : [];

      return {
        status: "Success",
        possibleConditions,
        recommendations: [...recommendations, ...preventiveMeasures].join("\n"),
        additionalInfo: `Confidence Level:${
          meta.confidenceLevel
        }\nAnaylis Type:${
          meta.analysisType
        }\n\nEducational Resourses"\n${reliableSources.join("\n")}`,
        serverity: meta.confidenceLevel.toLowerCase(),
        requiresPhysicianConsult: meta.confidenceLevel === "High",
        disclaimer: response.data.result.disclaimer,
      };
    }
    throw new Error("Unexpected response from API");
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch symptoms data" });
  }
};
