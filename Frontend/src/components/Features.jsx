import {
  FaChartLine,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaFileAlt,
  FaLightbulb,
  FaRobot,
} from "react-icons/fa";
import "../styles/Home.css";

function Features() {
  return (
    <section className="features-section py-5">
      <div className="container">
        {/* Core Features Header */}
        <div className="text-center mb-5">
          <h2 className="section-title fw-bold mb-2">Essential AI Capabilities</h2>
          <p className="text-muted section-desc mx-auto">
            Targeted insights engineered to pass Applicant Tracking Systems and impress recruiters.
          </p>
        </div>

        {/* 4 Essential Feature Cards */}
        <div className="row g-4 mb-5 pb-3">
          <div className="col-md-6 col-lg-3">
            <div className="pro-feature-card">
              <div className="feature-icon-wrapper bg-primary-subtle text-primary">
                <FaChartLine size={24} />
              </div>
              <h5 className="fw-bold mb-2">ATS Score Audit</h5>
              <p className="text-muted small mb-0">
                Receive an objective 0–100 compatibility rating based on industry ATS screening algorithms.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="pro-feature-card">
              <div className="feature-icon-wrapper bg-success-subtle text-success">
                <FaCheckCircle size={24} />
              </div>
              <h5 className="fw-bold mb-2">Skills Extraction</h5>
              <p className="text-muted small mb-0">
                Instantly identify and catalog all technical frameworks, programming languages, and soft skills.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="pro-feature-card">
              <div className="feature-icon-wrapper bg-warning-subtle text-warning">
                <FaLightbulb size={24} />
              </div>
              <h5 className="fw-bold mb-2">Skill Gap Detection</h5>
              <p className="text-muted small mb-0">
                Pinpoint high-impact missing industry keywords required for top candidate consideration.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="pro-feature-card">
              <div className="feature-icon-wrapper bg-info-subtle text-info">
                <FaRobot size={24} />
              </div>
              <h5 className="fw-bold mb-2">Smart Suggestions</h5>
              <p className="text-muted small mb-0">
                Get targeted recommendations on action verbs, experience formatting, and quantifiable bullet points.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-4 pt-4">
          <h2 className="section-title fw-bold mb-2">How It Works</h2>
          <p className="text-muted section-desc mx-auto">
            Three simple steps to optimize your resume for your next career move.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="pro-step-box">
              <div className="pro-step-num">1</div>
              <h5 className="fw-bold mb-2">Upload PDF Resume</h5>
              <p className="text-muted small mb-0">
                Securely upload your existing PDF resume with one click.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="pro-step-box">
              <div className="pro-step-num">2</div>
              <h5 className="fw-bold mb-2">Automated AI Parsing</h5>
              <p className="text-muted small mb-0">
                The AI extracts experience, skills, and evaluates formatting compliance.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="pro-step-box">
              <div className="pro-step-num">3</div>
              <h5 className="fw-bold mb-2">Review & Optimize</h5>
              <p className="text-muted small mb-0">
                View your detailed ATS score report and apply actionable suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;