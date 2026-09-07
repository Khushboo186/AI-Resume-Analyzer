import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaEye,
  FaFileAlt,
  FaFileUpload,
  FaHistory,
  FaLightbulb,
  FaSpinner,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/resumeServices";

function Dashboard() {
  const [stats, setStats] = useState({
    totalResumes: 0,
    averageAtsScore: 0,
    totalSkillsCount: 0,
    recentResumes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data || {
        totalResumes: 0,
        averageAtsScore: 0,
        totalSkillsCount: 0,
        recentResumes: [],
      });
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 65) return "text-primary";
    if (score >= 50) return "text-warning";
    return "text-danger";
  };

  return (
    <div className="container mt-5 mb-5">
      {/* Welcome Section */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
        <div>
          <h1 className="fw-bold display-6 mb-1">Welcome to Your AI Career Hub 👋</h1>
          <p className="text-muted mb-0">
            Track resume performance, optimize ATS scores, and discover tailored skill recommendations.
          </p>
        </div>

        <div className="d-flex gap-2">
          <Link to="/upload" className="btn btn-primary d-flex align-items-center">
            <FaFileUpload className="me-2" /> Upload Resume
          </Link>
          <Link to="/profile" className="btn btn-outline-secondary d-flex align-items-center">
            <FaUser className="me-2" /> My Profile
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4 border-0 rounded-4 transition-card">
            <FaFileUpload size={35} className="text-primary mb-3" />
            <h4 className="fw-bold">Upload Resume</h4>
            <p className="text-muted">
              Upload your PDF resume and get an instant, deep AI ATS audit and recommendations.
            </p>
            <Link to="/upload" className="btn btn-outline-primary mt-auto">
              Upload Resume <FaArrowRight className="ms-1" />
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4 border-0 rounded-4 transition-card">
            <FaChartLine size={35} className="text-success mb-3" />
            <h4 className="fw-bold">ATS Score Insights</h4>
            <p className="text-muted">
              Discover missing keywords, section breakdown, and impact metrics to pass recruiter filters.
            </p>
            <Link to="/upload" className="btn btn-outline-success mt-auto">
              Analyze Now <FaArrowRight className="ms-1" />
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4 border-0 rounded-4 transition-card">
            <FaHistory size={35} className="text-warning mb-3" />
            <h4 className="fw-bold">Resume History</h4>
            <p className="text-muted">
              Access your previous resume evaluations, compare improvements, and download reports.
            </p>
            <Link to="/history" className="btn btn-outline-warning mt-auto">
              View History <FaArrowRight className="ms-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Live Statistics */}
      <h3 className="fw-bold mb-3 d-flex align-items-center">
        <FaChartLine className="text-primary me-2" /> Live Analytics Overview
      </h3>

      {loading ? (
        <div className="text-center py-4">
          <FaSpinner className="spinner-border text-primary" />
        </div>
      ) : (
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm p-4 text-center border-0 rounded-4 bg-light">
              <FaFileAlt size={30} className="text-primary mb-2 mx-auto" />
              <h2 className="fw-bold display-5 mb-0 text-dark">{stats.totalResumes}</h2>
              <p className="text-muted mb-0 fw-semibold">Resumes Analyzed</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-4 text-center border-0 rounded-4 bg-light">
              <FaChartLine size={30} className="text-success mb-2 mx-auto" />
              <h2 className={`fw-bold display-5 mb-0 ${getScoreColor(stats.averageAtsScore)}`}>
                {stats.averageAtsScore}%
              </h2>
              <p className="text-muted mb-0 fw-semibold">Average ATS Score</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-4 text-center border-0 rounded-4 bg-light">
              <FaLightbulb size={30} className="text-warning mb-2 mx-auto" />
              <h2 className="fw-bold display-5 mb-0 text-dark">{stats.totalSkillsCount}</h2>
              <p className="text-muted mb-0 fw-semibold">Total Skills Identified</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="card shadow-sm p-4 mb-5 border-0 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Recent Resumes Analyzed</h4>
          {stats.recentResumes && stats.recentResumes.length > 0 && (
            <Link to="/history" className="text-primary text-decoration-none fw-semibold">
              View All History <FaArrowRight className="ms-1" />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="text-center py-4">
            <FaSpinner className="spinner-border text-primary" />
          </div>
        ) : stats.recentResumes && stats.recentResumes.length > 0 ? (
          <div className="list-group list-group-flush">
            {stats.recentResumes.map((resume) => (
              <div
                key={resume.id}
                className="list-group-item d-flex flex-wrap justify-content-between align-items-center py-3 px-2 border-bottom"
              >
                <div className="d-flex align-items-center">
                  <FaFileAlt size={22} className="text-danger me-3" />
                  <div>
                    <h6 className="mb-0 fw-bold">{resume.fileName}</h6>
                    <small className="text-muted">
                      {resume.createdAt
                        ? new Date(resume.createdAt).toLocaleDateString()
                        : "Recent"} • {resume.skillsCount || 0} skills detected
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 mt-2 mt-sm-0">
                  <span className={`badge ${resume.atsScore >= 70 ? "bg-success" : resume.atsScore >= 50 ? "bg-warning text-dark" : "bg-danger"} px-3 py-2 rounded-pill`}>
                    ATS Score: {resume.atsScore || 0}
                  </span>
                  <Link to="/history" className="btn btn-sm btn-outline-primary">
                    <FaEye className="me-1" /> View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted mb-3">No resume analysis available yet.</p>
            <Link to="/upload" className="btn btn-primary">
              <FaFileUpload className="me-2" /> Upload Your First Resume
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;