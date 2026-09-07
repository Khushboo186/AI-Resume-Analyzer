import {
  FaChartLine,
  FaExchangeAlt,
  FaHistory,
  FaRobot,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authServices";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      navigate("/");
    }
  };

  const handleSwitchAccount = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Switch account error:", error);
    } finally {
      logout();
      navigate("/login");
    }
  };

  const handleRegisterNewAccount = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Register new account error:", error);
    } finally {
      logout();
      navigate("/register");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top py-3 shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <FaRobot className="text-primary me-2 fs-4" />
          <span className="brand-text">AI Resume Analyzer</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive("/") ? "active text-primary fw-bold" : ""}`} to="/">
                Home
              </Link>
            </li>

            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link px-3 ${isActive("/login") ? "active text-primary fw-bold" : ""}`} to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-primary btn-sm px-3 py-2" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link px-3 ${isActive("/dashboard") ? "active text-primary fw-bold" : ""}`}
                    to="/dashboard"
                  >
                    <FaChartLine className="me-1" /> Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link px-3 ${isActive("/history") ? "active text-primary fw-bold" : ""}`}
                    to="/history"
                  >
                    <FaHistory className="me-1" /> History
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link px-3 ${isActive("/profile") ? "active text-primary fw-bold" : ""}`}
                    to="/profile"
                  >
                    <FaUser className="me-1" /> Profile
                  </Link>
                </li>

                {/* User Dropdown */}
                <li className="nav-item dropdown ms-lg-2">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserCircle className="me-1 fs-5 text-primary" />
                    <span>{user?.email ? user.email.split("@")[0] : "Account"}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 py-2 mt-2">
                    <li className="px-3 py-2 border-bottom">
                      <small className="text-muted d-block">Signed in as</small>
                      <strong className="text-dark small text-truncate d-block" style={{ maxWidth: "200px" }}>
                        {user?.email || "User"}
                      </strong>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/dashboard">
                        <FaChartLine className="me-2 text-primary" /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to="/profile">
                        <FaUser className="me-2 text-secondary" /> My Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider my-1" />
                    </li>
                    <li>
                      <button className="dropdown-item py-2 text-dark" onClick={handleSwitchAccount}>
                        <FaExchangeAlt className="me-2 text-info" /> Switch Account
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item py-2 text-dark" onClick={handleRegisterNewAccount}>
                        <FaUserPlus className="me-2 text-success" /> Register Another Account
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider my-1" />
                    </li>
                    <li>
                      <button className="dropdown-item text-danger py-2" onClick={handleLogout}>
                        <FaSignOutAlt className="me-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;