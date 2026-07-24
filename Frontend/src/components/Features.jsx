import { FaChartLine, FaFileAlt, FaRobot } from "react-icons/fa";

function Features() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 fw-bold">
        Why Choose AI Resume Analyzer?
      </h2>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100 text-center p-4">
            <FaFileAlt size={50} className="text-primary mb-3 mx-auto" />
            <h4>Resume Analysis</h4>
            <p>
              Upload your resume and analyze it instantly.
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100 text-center p-4">
            <FaChartLine size={50} className="text-success mb-3 mx-auto" />
            <h4>ATS Score</h4>
            <p>
              Check how ATS-friendly your resume is.
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100 text-center p-4">
            <FaRobot size={50} className="text-danger mb-3 mx-auto" />
            <h4>AI Suggestions</h4>
            <p>
              Receive AI-powered recommendations to improve your resume.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Features;