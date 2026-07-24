import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <div className="container my-5">
      <div className="bg-primary text-white text-center p-5 rounded shadow">
        <h2 className="fw-bold mb-3">
          Ready to Improve Your Resume?
        </h2>

        <p className="mb-4">
          Upload your resume now and receive an AI-powered ATS analysis in seconds.
        </p>

        <Link to="/register" className="btn btn-light btn-lg me-3">
          Get Started
        </Link>

        <Link to="/login" className="btn btn-outline-light btn-lg">
          Login
        </Link>
      </div>
    </div>
  );
}

export default CallToAction;