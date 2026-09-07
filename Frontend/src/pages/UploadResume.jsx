import { useState } from "react";
import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaFilePdf,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import ResumeAnalysisView from "../components/ResumeAnalysisView";
import { uploadResume } from "../services/resumeServices";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setError("");
    setSuccess("");
    setAnalysisResult(null);

    if (!selectedFile) {
      return;
    }

    // Check file type
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.endsWith(".pdf")) {
      setError("Please upload a PDF file only.");
      setFile(null);
      return;
    }

    // Check file size - maximum 5 MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setFile(null);
    setError("");
    setSuccess("");
  };

  // Handle upload & AI Analysis
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await uploadResume(file);
      setAnalysisResult(data);
      setSuccess("Resume parsed and analyzed successfully by AI!");
    } catch (err) {
      const message = err.message || "Failed to analyze resume. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysisResult(null);
    setError("");
    setSuccess("");
  };

  // If analysis is ready, show rich results
  if (analysisResult) {
    return (
      <div className="container mt-4 mb-5">
        <ResumeAnalysisView data={analysisResult} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-6">
          🤖 AI Resume Analyzer
        </h1>
        <p className="text-muted lead">
          Upload your resume to get instant ATS scoring, keyword extraction, and AI-powered recommendations.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow-sm p-5 text-center border-0 rounded-4">
            {/* Upload Icon */}
            <div className="mb-4">
              <FaCloudUploadAlt size={75} className="text-primary" />
            </div>

            <h3 className="fw-bold mb-2">Upload your resume</h3>
            <p className="text-muted mb-1">Supported format: <strong>PDF</strong></p>
            <p className="text-muted small">Maximum file size: 5 MB</p>

            {/* File Selector */}
            <label className="btn btn-primary btn-lg mt-3 px-4 py-2 rounded-pill shadow-sm">
              <FaCloudUploadAlt className="me-2" />
              Choose PDF Resume
              <input
                type="file"
                accept=".pdf,application/pdf"
                hidden
                onChange={handleFileChange}
              />
            </label>

            {/* Selected File Card */}
            {file && (
              <div className="card mt-4 border bg-light">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <FaFilePdf size={35} className="text-danger me-3" />
                    <div className="text-start">
                      <h6 className="mb-1 fw-bold text-dark">{file.name}</h6>
                      <small className="text-muted">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </small>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm rounded-circle"
                    onClick={handleRemoveFile}
                    disabled={loading}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger mt-4 text-start">
                <strong>Error: </strong> {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="alert alert-success mt-4 text-start d-flex align-items-center">
                <FaCheckCircle className="me-2" /> {success}
              </div>
            )}

            {/* Upload & Analyze Action Button */}
            {file && (
              <button
                type="button"
                className="btn btn-success btn-lg mt-4 w-100 rounded-pill shadow-sm d-flex align-items-center justify-content-center"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="spinner-border spinner-border-sm me-2" />
                    Analyzing with AI Engine...
                  </>
                ) : (
                  "Analyze Resume Now"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadResume;