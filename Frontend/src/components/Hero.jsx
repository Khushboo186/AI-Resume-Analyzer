import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-3 fw-bold">
        Improve Your Resume with AI
      </h1>

      <p className="lead mt-3">
        Analyze your resume, calculate ATS score,
        identify missing skills, and receive
        personalized suggestions instantly.
      </p>

      <div className="mt-4">
        <Link to="/register" className="btn btn-primary btn-lg me-3">
          Get Started
        </Link>

        <Link to="/login" className="btn btn-outline-dark btn-lg">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Hero;