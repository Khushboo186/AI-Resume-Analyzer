import { useState } from "react";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaTimes,
} from "react-icons/fa";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setError("");
    setSuccess("");

    if (!selectedFile) {
      return;
    }

    // Check file type
    if (selectedFile.type !== "application/pdf") {
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

  // Handle upload
  const handleUpload = () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    // Temporary upload simulation
    setTimeout(() => {
      setLoading(false);
      setSuccess("Resume selected successfully! Backend upload will be connected next.");
    }, 1000);
  };

  return (
    <div className="container mt-5 mb-5">

      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          Upload Your Resume
        </h1>

        <p className="text-muted">
          Upload your resume and let AI analyze your skills,
          experience, and ATS compatibility.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">

          <div className="card shadow-sm p-5 text-center">

            {/* Upload Icon */}
            <FaCloudUploadAlt
              size={75}
              className="text-primary mb-4"
            />

            <h3 className="fw-bold">
              Upload your resume
            </h3>

            <p className="text-muted">
              Supported format: PDF
            </p>

            <p className="text-muted small">
              Maximum file size: 5 MB
            </p>

            {/* File Selector */}
            <label className="btn btn-primary mt-3">
              <FaCloudUploadAlt className="me-2" />
              Choose Resume

              <input
                type="file"
                accept=".pdf,application/pdf"
                hidden
                onChange={handleFileChange}
              />
            </label>

            {/* Selected File */}
            {file && (
              <div className="card mt-4 border">

                <div className="card-body d-flex align-items-center justify-content-between">

                  <div className="d-flex align-items-center">

                    <FaFilePdf
                      size={35}
                      className="text-danger me-3"
                    />

                    <div className="text-start">

                      <h6 className="mb-1">
                        {file.name}
                      </h6>

                      <small className="text-muted">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </small>

                    </div>

                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleRemoveFile}
                  >
                    <FaTimes />
                  </button>

                </div>

              </div>
            )}

            {/* Error */}
            {error && (
              <div className="alert alert-danger mt-4">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="alert alert-success mt-4">
                {success}
              </div>
            )}

            {/* Upload Button */}
            {file && (
              <button
                type="button"
                className="btn btn-success mt-4"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload Resume"}
              </button>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}

export default UploadResume;