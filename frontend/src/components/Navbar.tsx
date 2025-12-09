import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/90">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <span className="font-bold text-base text-gray-900">
              PollingApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/dashboard"
              className="px-3 py-1.5 text-sm rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/create"
              className="px-4 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium shadow-sm ml-2"
            >
              Create Poll
            </Link>

            {/* Profile Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    profileMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setProfileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <div className="flex flex-col space-y-1">
              <Link
                to="/dashboard"
                className="px-3 py-2 text-sm rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="px-3 py-2 text-sm rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/create"
                className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Poll
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 text-sm rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-all font-medium text-left"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
