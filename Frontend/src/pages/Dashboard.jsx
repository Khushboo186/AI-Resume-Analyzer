import {
  FaChartLine,
  FaFileAlt,
  FaFileUpload,
  FaHistory,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mt-5">

      {/* Welcome Section */}
     <div className="d-flex justify-content-between align-items-center mb-5">
  <div>
    <h1 className="fw-bold">
      Welcome Back 👋
    </h1>

    <p className="text-muted mb-0">
      Manage your resumes and improve your chances of getting hired.
    </p>
  </div>

  <Link
    to="/profile"
    className="btn btn-outline-primary"
  >
    <FaUser className="me-2" />
    My Profile
  </Link>
</div>

      {/* Quick Actions */}
      <div className="row g-4 mb-5">

        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4">
            <FaFileUpload size={35} className="text-primary mb-3" />

            <h4>Upload Resume</h4>

            <p className="text-muted">
              Upload your resume and get started with AI analysis.
            </p>

            <Link
              to="/upload"
              className="btn btn-primary"
            >
              Upload Resume
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4">
            <FaChartLine size={35} className="text-success mb-3" />

            <h4>Analyze Resume</h4>

            <p className="text-muted">
              Check your ATS score and discover areas for improvement.
            </p>

            <Link
              to="/upload"
              className="btn btn-success"
            >
              Analyze Resume
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4">
            <FaHistory size={35} className="text-warning mb-3" />

            <h4>Resume History</h4>

            <p className="text-muted">
              View your previously analyzed resumes.
            </p>

            <Link
              to="/history"
              className="btn btn-warning"
            >
              View History
            </Link>
          </div>
        </div>

      </div>

      {/* Statistics */}
      <h3 className="fw-bold mb-3">
        Your Statistics
      </h3>

      <div className="row g-4 mb-5">

        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <FaFileAlt size={30} className="text-primary mb-2" />
            <h2>0</h2>
            <p className="text-muted mb-0">
              Resumes Analyzed
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <FaChartLine size={30} className="text-success mb-2" />
            <h2>0%</h2>
            <p className="text-muted mb-0">
              Average ATS Score
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <FaUser size={30} className="text-warning mb-2" />
            <h2>0</h2>
            <p className="text-muted mb-0">
              Skills Identified
            </p>
          </div>
        </div>

      </div>

      {/* Recent Activity */}
      <div className="card shadow-sm p-4 mb-5">

        <h3 className="fw-bold">
          Recent Activity
        </h3>

        <p className="text-muted mt-3 mb-0">
          No resume analysis available yet.
          Upload your first resume to get started.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;