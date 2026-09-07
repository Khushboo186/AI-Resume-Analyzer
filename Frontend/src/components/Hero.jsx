import { FaArrowRight, FaCheckCircle, FaCloudUploadAlt, FaRocket, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="hero-section">
      <div className="container">
        {/* Pro Pill Badge */}
        <div className="hero-badge-wrapper">
          <span className="hero-badge">
            <FaRocket className="me-2 text-primary" />
            AI-Powered ATS Optimization & Skill Extraction
          </span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title">
          Analyze & Optimize Your <span className="hero-gradient-text">Resume with AI</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Upload your resume to get an instant ATS score, identify missing skills,
          and receive actionable AI recommendations to land more job interviews.
        </p>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-4">
          <Link
            to={isAuthenticated ? "/upload" : "/register"}
            className="btn btn-primary btn-lg hero-cta-btn"
          >
            <FaCloudUploadAlt className="me-2 fs-5" />
            {isAuthenticated ? "Upload Resume Now" : "Get Started Free"}
          </Link>

          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="btn btn-outline-secondary btn-lg hero-secondary-btn"
          >
            {isAuthenticated ? "Open Dashboard" : "Sign In"}
            <FaArrowRight className="ms-2" />
          </Link>
        </div>

        {/* Key Trust Highlights */}
        <div className="hero-highlights d-flex justify-content-center align-items-center flex-wrap gap-4 pt-3">
          <div className="d-flex align-items-center text-muted small">
            <FaCheckCircle className="text-success me-2" />
            <span>Instant ATS Score</span>
          </div>
          <div className="d-flex align-items-center text-muted small">
            <FaCheckCircle className="text-success me-2" />
            <span>Key Skill Detection</span>
          </div>
          <div className="d-flex align-items-center text-muted small">
            <FaShieldAlt className="text-primary me-2" />
            <span>100% Private & Secure</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;