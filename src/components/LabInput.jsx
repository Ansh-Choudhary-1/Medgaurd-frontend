import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useParams, Link } from "react-router-dom";

function LabInput() {
  const { user } = useAuth();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [preview, setPreview] = useState(null); // State for image preview

  // Watch file input for real-time updates
  const file = watch("xrayImage");

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setPrediction(null);

    const formData = new FormData();
    formData.append("viewPosition", data.viewPosition);
    formData.append("xrayImage", data.xrayImage[0]); // Upload first selected file

    try {
      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Image Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("xrayImage", e.target.files); // Manually update file state
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Chest X-ray Disease Predictor</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ID Field */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">ID</label>
          <input
            type="text"
            value={id}
            {...register("id", { required: "ID is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            readOnly
          />
          {errors.id && <p className="text-red-500 text-sm mt-1">❌ {errors.id.message}</p>}
        </div>

        {/* View Position */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">View Position:</label>
          <select
            {...register("viewPosition", { required: "Please select a view position" })}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="PA">PA</option>
            <option value="AP">AP</option>
          </select>
          {errors.viewPosition && <p className="text-red-500 text-sm mt-1">❌ {errors.viewPosition.message}</p>}
        </div>

        {/* X-ray Upload */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Upload X-ray Image:</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register("xrayImage", { required: "Please upload an X-ray image" })}
            onChange={handleFileChange} // Handle file change for preview
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.xrayImage && <p className="text-red-500 text-sm mt-1">❌ {errors.xrayImage.message}</p>}

          {/* Image Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-gray-700 font-medium">Preview:</p>
              <img src={preview} alt="X-ray Preview" className="mt-2 w-full max-h-64 object-contain border rounded-lg shadow" />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Link to="/result-lab">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition-all disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Predict"}
          </button>
        </Link>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">❌ {error}</p>}

      {/* Prediction Result */}
      {prediction && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold text-blue-900 text-center">Prediction Result:</h3>
          <p className="mt-2">
            <strong>Diseases Detected:</strong> {prediction.diseases || "None"}
          </p>
          <p>
            <strong>Confidence Score:</strong> {prediction.confidence || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}

export default LabInput;
