import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaFilePdf,
  FaPlus,
  FaSpinner,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ResumeAnalysisView from "../components/ResumeAnalysisView";
import { deleteResume, getResumeById, getUserResumes } from "../services/resumeServices";

function ResumeHistory() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [analyzingId, setAnalyzingId] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUserResumes();
      setResumes(data || []);
    } catch (err) {
      setError(err.message || "Failed to load resume history");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAnalysis = async (resumeId) => {
    setAnalyzingId(resumeId);
    setError("");
    try {
      const data = await getResumeById(resumeId);
      setSelectedAnalysis(data);
    } catch (err) {
      setError(err.message || "Failed to load analysis details");
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) {
      return;
    }

    setDeleteLoadingId(resumeId);
    try {
      await deleteResume(resumeId);
      setResumes(resumes.filter((r) => r.id !== resumeId));
      if (selectedAnalysis?.id === resumeId) {
        setSelectedAnalysis(null);
      }
    } catch (err) {
      setError(err.message || "Failed to delete resume");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return "bg-success";
    if (score >= 65) return "bg-primary";
    if (score >= 50) return "bg-warning text-dark";
    return "bg-danger";
  };

  if (selectedAnalysis) {
    return (
      <div className="container mt-4 mb-5">
        <ResumeAnalysisView
          data={selectedAnalysis}
          onReset={() => setSelectedAnalysis(null)}
        />
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h1 className="fw-bold display-6">Resume History</h1>
          <p className="text-muted mb-0">
            View, track, and manage all your past uploaded resumes and AI ATS analyses.
          </p>
        </div>

        <Link to="/upload" className="btn btn-primary d-flex align-items-center">
          <FaPlus className="me-2" /> Upload New Resume
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger mb-4">
          <strong>Error: </strong> {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <FaSpinner className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }} />
          <p className="text-muted">Loading your resume history...</p>
        </div>
      ) : resumes.length === 0 ? (
        <div className="card shadow-sm p-5 text-center border-0 rounded-4 my-4">
          <FaFilePdf size={60} className="text-muted mb-3" />
          <h4 className="fw-bold">No Resumes Uploaded Yet</h4>
          <p className="text-muted mb-4">
            Upload your first resume to unlock ATS scores, skill extraction, and personalized AI recommendations.
          </p>
          <div>
            <Link to="/upload" className="btn btn-primary px-4 py-2">
              <FaPlus className="me-2" /> Upload Resume Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 ps-4">Resume File</th>
                  <th className="py-3">Uploaded Date</th>
                  <th className="py-3">ATS Score</th>
                  <th className="py-3">Skills Detected</th>
                  <th className="py-3 text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resumes.map((resume) => (
                  <tr key={resume.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <FaFilePdf size={24} className="text-danger me-3" />
                        <div>
                          <h6 className="mb-0 fw-bold">{resume.fileName}</h6>
                          <small className="text-muted">
                            {(resume.fileSize / 1024).toFixed(1)} KB
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center text-muted small">
                        <FaCalendarAlt className="me-1" />
                        {resume.createdAt
                          ? new Date(resume.createdAt).toLocaleDateString()
                          : "Recently"}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${getScoreBadge(
                          resume.atsScore || 0
                        )} px-3 py-2 fs-6 rounded-pill`}
                      >
                        {resume.atsScore || 0} / 100
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                        {resume.skillsCount || 0} Skills
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => handleViewAnalysis(resume.id)}
                        disabled={analyzingId === resume.id}
                      >
                        {analyzingId === resume.id ? (
                          <FaSpinner className="spinner-border spinner-border-sm" />
                        ) : (
                          <>
                            <FaEye className="me-1" /> View Analysis
                          </>
                        )}
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(resume.id)}
                        disabled={deleteLoadingId === resume.id}
                      >
                        {deleteLoadingId === resume.id ? (
                          <FaSpinner className="spinner-border spinner-border-sm" />
                        ) : (
                          <FaTrashAlt />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeHistory;