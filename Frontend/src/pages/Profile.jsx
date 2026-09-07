import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaEnvelope,
  FaFileUpload,
  FaHistory,
  FaIdBadge,
  FaShieldAlt,
  FaSpinner,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/userService";

function Profile() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUserProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message || "Failed to load user profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-6">My Profile</h1>
        <p className="text-muted">
          Manage your account credentials, view uploaded resume insights, and track your career growth.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger max-w-600 mx-auto mb-4">
          <strong>Error: </strong> {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <FaSpinner className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} />
          <p className="text-muted mt-2">Loading profile details...</p>
        </div>
      ) : (
        <div className="row justify-content-center g-4">
          {/* User Info Card */}
          <div className="col-lg-5">
            <div className="card shadow-sm p-4 border-0 rounded-4 text-center h-100">
              <div className="mb-3">
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto shadow"
                  style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                >
                  {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : <FaUser />}
                </div>
              </div>

              <h3 className="fw-bold mb-1">{profile?.fullName || "User"}</h3>
              <p className="text-muted mb-3 d-flex align-items-center justify-content-center">
                <FaEnvelope className="me-2" /> {profile?.email || authUser?.email}
              </p>

              <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill mx-auto mb-4">
                <FaCheckCircle className="me-1" /> Verified Account
              </span>

              <hr className="my-3" />

              <div className="text-start">
                <div className="mb-3">
                  <small className="text-muted d-block">Account ID</small>
                  <strong className="text-dark d-flex align-items-center">
                    <FaIdBadge className="text-secondary me-2" /> #{profile?.id || "N/A"}
                  </strong>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block">Member Since</small>
                  <strong className="text-dark d-flex align-items-center">
                    <FaCalendarAlt className="text-secondary me-2" />
                    {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Recently"}
                  </strong>
                </div>

                <div>
                  <small className="text-muted d-block">Security Status</small>
                  <strong className="text-success d-flex align-items-center">
                    <FaShieldAlt className="text-success me-2" /> JWT Token Authenticated
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Activity & Stats Card */}
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 border-0 rounded-4 h-100">
              <h4 className="fw-bold mb-4">Resume Analytics Summary</h4>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="p-3 bg-light rounded-4 text-center">
                    <h3 className="fw-bold text-primary mb-1">{profile?.totalResumes || 0}</h3>
                    <small className="text-muted">Total Resumes Uploaded</small>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 bg-light rounded-4 text-center">
                    <h3 className="fw-bold text-success mb-1">
                      {profile?.averageAtsScore || 0}%
                    </h3>
                    <small className="text-muted">Average ATS Score</small>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold mb-3">Quick Navigation</h5>
              <div className="d-grid gap-2">
                <Link to="/upload" className="btn btn-outline-primary py-2 d-flex align-items-center justify-content-between">
                  <span>
                    <FaFileUpload className="me-2" /> Upload New Resume
                  </span>
                  <span>&rarr;</span>
                </Link>

                <Link to="/history" className="btn btn-outline-secondary py-2 d-flex align-items-center justify-content-between">
                  <span>
                    <FaHistory className="me-2" /> View Resume History
                  </span>
                  <span>&rarr;</span>
                </Link>

                <Link to="/dashboard" className="btn btn-outline-success py-2 d-flex align-items-center justify-content-between">
                  <span>
                    <FaChartLine className="me-2" /> Go to Dashboard
                  </span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;