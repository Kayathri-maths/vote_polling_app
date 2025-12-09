import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 text-white"
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
              <span className="font-bold text-lg text-gray-900">
                PollingApp
              </span>
            </Link>

            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-3 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              Real-time Polling Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Create Engaging Polls
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Get Instant Feedback
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Build interactive polls in seconds, share with your audience, and
              watch real-time results come to life.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                to="/register"
                className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Create Poll
              </Link>
              <button className="px-6 py-3 bg-white text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-md border border-gray-200">
                View Examples
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                Lightning Fast
              </h3>
              <p className="text-sm text-gray-600">
                Create and deploy polls in seconds with our intuitive interface.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-purple-600"
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
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                Live Results
              </h3>
              <p className="text-sm text-gray-600">
                Watch responses pour in with beautiful real-time visualizations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                Easy Sharing
              </h3>
              <p className="text-sm text-gray-600">
                Share your polls instantly with a simple link or embed code.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-1">10K+</div>
                <div className="text-sm text-blue-100">Active Polls</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">100K+</div>
                <div className="text-sm text-blue-100">Total Votes Cast</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">5K+</div>
                <div className="text-sm text-blue-100">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
