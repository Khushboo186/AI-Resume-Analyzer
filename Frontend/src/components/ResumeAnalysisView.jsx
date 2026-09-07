import {
  FaArrowLeft,
  FaAward,
  FaCheckCircle,
  FaDownload,
  FaEnvelope,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaLightbulb,
  FaPhoneAlt,
  FaRedo,
  FaTools,
} from "react-icons/fa";
import "../styles/ResumeAnalysis.css";

function ResumeAnalysisView({ data, onReset }) {
  if (!data) return null;

  const getScoreTheme = (score) => {
    if (score >= 80) return { class: "score-excellent", color: "#10b981", badge: "bg-success", text: "Excellent" };
    if (score >= 65) return { class: "score-good", color: "#3b82f6", badge: "bg-primary", text: "Good" };
    if (score >= 50) return { class: "score-average", color: "#f59e0b", badge: "bg-warning text-dark", text: "Average" };
    return { class: "score-low", color: "#ef4444", badge: "bg-danger", text: "Needs Improvement" };
  };

  const theme = getScoreTheme(data.atsScore || 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="analysis-container py-4">
      {/* Top Action Bar */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2 no-print">
        {onReset && (
          <button onClick={onReset} className="btn btn-outline-secondary d-flex align-items-center">
            <FaArrowLeft className="me-2" /> Upload Another Resume
          </button>
        )}
        <div className="d-flex gap-2">
          <button onClick={handlePrint} className="btn btn-primary d-flex align-items-center">
            <FaDownload className="me-2" /> Download / Print Report
          </button>
        </div>
      </div>

      {/* Main Score & Summary Card */}
      <div className="card score-card p-4 p-md-5 mb-4 border-0">
        <div className="row align-items-center g-4">
          <div className="col-md-4 text-center">
            <div className={`score-circle ${theme.class} mb-3`}>
              <div className="score-value">{data.atsScore || 0}</div>
              <div className="score-label">ATS Score</div>
            </div>
            <span className={`badge ${theme.badge} px-3 py-2 fs-6`}>
              {data.rating || theme.text}
            </span>
          </div>

          <div className="col-md-8">
            <h2 className="fw-bold mb-2 text-white d-flex align-items-center">
              <FaFileAlt className="me-2 text-primary" /> {data.fileName || "Resume Analysis"}
            </h2>
            <p className="text-light mb-4 opacity-75">
              {data.wordCount ? `${data.wordCount} words detected • ` : ""}
              {data.fileSize ? `${(data.fileSize / 1024).toFixed(1)} KB • ` : ""}
              ATS Compatibility Evaluation
            </p>

            {/* Section Breakdown Bars */}
            <div className="row g-3">
              {data.sectionScores && (
                <>
                  <div className="col-6 col-md-4">
                    <small className="text-light opacity-75 d-block mb-1">Contact Info</small>
                    <div className="section-bar-bg">
                      <div
                        className="section-bar-fill bg-info"
                        style={{ width: `${data.sectionScores.contactScore || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <small className="text-light opacity-75 d-block mb-1">Structure & Sections</small>
                    <div className="section-bar-bg">
                      <div
                        className="section-bar-fill bg-primary"
                        style={{ width: `${data.sectionScores.structureScore || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <small className="text-light opacity-75 d-block mb-1">Skills Richness</small>
                    <div className="section-bar-bg">
                      <div
                        className="section-bar-fill bg-success"
                        style={{ width: `${data.sectionScores.skillsScore || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <small className="text-light opacity-75 d-block mb-1">Action & Impact Verbs</small>
                    <div className="section-bar-bg">
                      <div
                        className="section-bar-fill bg-warning"
                        style={{ width: `${data.sectionScores.impactScore || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <small className="text-light opacity-75 d-block mb-1">Length & Readability</small>
                    <div className="section-bar-bg">
                      <div
                        className="section-bar-fill bg-light"
                        style={{ width: `${data.sectionScores.contentScore || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column: Skills & Contact */}
        <div className="col-lg-6">
          {/* Extracted Skills */}
          <div className="card shadow-sm p-4 mb-4 border-0 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0 text-dark d-flex align-items-center">
                <FaAward className="text-primary me-2" /> Extracted Skills
              </h4>
              <span className="badge bg-primary rounded-pill">
                {data.skills ? data.skills.length : 0} Found
              </span>
            </div>

            {data.skills && data.skills.length > 0 ? (
              <div className="d-flex flex-wrap">
                {data.skills.map((skill, index) => (
                  <span key={index} className="skill-chip">
                    <FaCheckCircle className="text-success me-1 small" /> {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted mb-0">No technical skills detected in the document.</p>
            )}

            {/* Missing In-Demand Skills */}
            {data.missingSkills && data.missingSkills.length > 0 && (
              <div className="mt-4 pt-3 border-top">
                <h5 className="fw-bold text-danger mb-2 d-flex align-items-center">
                  <FaExclamationTriangle className="me-2" /> Recommended Missing Skills
                </h5>
                <p className="text-muted small mb-2">
                  Adding these in-demand skills to your projects or skillset can boost your ATS match:
                </p>
                <div className="d-flex flex-wrap">
                  {data.missingSkills.map((skill, index) => (
                    <span key={index} className="skill-chip missing">
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Suggestions & Extracted Sections */}
        <div className="col-lg-6">
          {/* AI Improvement Suggestions */}
          <div className="card shadow-sm p-4 mb-4 border-0 h-100">
            <h4 className="fw-bold mb-3 text-dark d-flex align-items-center">
              <FaLightbulb className="text-warning me-2" /> AI Recommendations
            </h4>

            {data.suggestions && data.suggestions.length > 0 ? (
              <div className="suggestions-list">
                {data.suggestions.map((sugg, index) => (
                  <div key={index} className={`suggestion-item priority-${sugg.priority}`}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold text-dark">{sugg.type}</span>
                      <span
                        className={`badge ${
                          sugg.priority === "HIGH"
                            ? "bg-danger"
                            : sugg.priority === "MEDIUM"
                            ? "bg-warning text-dark"
                            : "bg-info text-dark"
                        }`}
                      >
                        {sugg.priority} PRIORITY
                      </span>
                    </div>
                    <p className="mb-0 text-secondary small">{sugg.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-success mb-0">
                <FaCheckCircle className="me-2" /> Great job! Your resume follows high ATS standards.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Extracted Details Breakdown */}
      <div className="card shadow-sm p-4 mt-4 border-0">
        <h4 className="fw-bold mb-4 text-dark d-flex align-items-center">
          <FaTools className="text-secondary me-2" /> Parsed Profile & Contact Snapshot
        </h4>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-3 bg-light rounded">
              <h6 className="fw-bold text-muted mb-2">Contact Details</h6>
              <p className="mb-1">
                <FaEnvelope className="text-primary me-2" />
                {data.email ? <strong>{data.email}</strong> : <span className="text-muted">Not detected</span>}
              </p>
              <p className="mb-0">
                <FaPhoneAlt className="text-success me-2" />
                {data.phone ? <strong>{data.phone}</strong> : <span className="text-muted">Not detected</span>}
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 bg-light rounded">
              <h6 className="fw-bold text-muted mb-2">Education Detected</h6>
              <p className="mb-0 text-secondary">
                {data.education || "No specific education degree parsed."}
              </p>
            </div>
          </div>

          {data.experience && (
            <div className="col-12">
              <div className="p-3 bg-light rounded">
                <h6 className="fw-bold text-muted mb-2">Experience Snippet</h6>
                <p className="mb-0 text-secondary small" style={{ maxHeight: "120px", overflowY: "auto" }}>
                  {data.experience}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalysisView;
