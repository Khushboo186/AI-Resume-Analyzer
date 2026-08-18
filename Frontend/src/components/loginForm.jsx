import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";

function LoginForm() {
  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Send login request to Spring Boot
      const response = await loginUser({
        email,
        password,
      });

      // Backend returns { message: "..." }
      const message = response.data?.message;
      if (message === "Login Successful!") {
        // Login successful → Dashboard
        navigate("/dashboard");
      } else {
        setError(message || "Invalid Email or Password!");
      }
    } catch (err) {
      // Server / network error
      if (err.response) {
        const apiError = err.response.data?.message || err.response.data;
        setError(apiError || "Invalid Email or Password!");
      } else {
        setError("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Welcome Back
            </h2>

            <p className="text-center text-muted">
              Login to your AI Resume Analyzer
            </p>

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <div className="input-group">

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;