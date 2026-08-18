import { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, getCurrentUser, isAuthenticated } from "../services/authServices";

/**
 * AuthContext - Manages global authentication state
 */
const AuthContext = createContext();

/**
 * AuthProvider - Wraps app to provide auth context
 */
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
  });

  /**
   * Initialize auth state from localStorage
   */
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      const user = getCurrentUser();
      const token = getAuthToken();

      setAuth({
        isAuthenticated: authenticated,
        user: user,
        token: token,
        loading: false,
      });
    };

    checkAuth();
  }, []);

  /**
   * Login handler
   */
  const login = (userData) => {
    const user = getCurrentUser();
    const token = getAuthToken();
    setAuth({
      isAuthenticated: true,
      user: user,
      token: token,
      loading: false,
    });
  };

  /**
   * Logout handler
   */
  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use AuthContext
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthContext;
