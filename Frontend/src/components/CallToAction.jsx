import { FaArrowRight, FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

function CallToAction() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="cta-section py-5">
      <div className="container">
        <div className="pro-cta-card">
          <div className="row align-items-center justify-content-between g-4">
            <div className="col-lg-8 text-center text-lg-start">
              <h2 className="fw-bold text-white mb-2">
                Ready to Upgrade Your Resume?
              </h2>
              <p className="text-light opacity-75 mb-0 fs-6">
                Get an instant ATS score audit, identify high-value skill gaps, and increase your interview response rate.
              </p>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
              <Link
                to={isAuthenticated ? "/upload" : "/register"}
                className="btn btn-primary btn-lg px-4 py-2 pro-cta-btn"
              >
                <FaCloudUploadAlt className="me-2" />
                {isAuthenticated ? "Upload Resume" : "Get Started Free"}
                <FaArrowRight className="ms-2 small" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;