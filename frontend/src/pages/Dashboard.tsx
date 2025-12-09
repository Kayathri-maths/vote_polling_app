import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import DashboardNavbar from "../components/Navbar";
import PollCard from "../components/PollCard";
import { connectSocket } from "../utils/socket";

type Poll = {
  _id: string;
  question: string;
  options: Option[];
  createdAt?: string;
};

type Option = { text: string; votes: number };

export default function Dashboard() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const s = connectSocket();
    s.on("connect", () => console.log("socket connected"));
    s.on("polls:update", () => {
      fetchPolls();
    });
    fetchPolls();
    return () => {
      s.off("polls:update");
    };
  }, []);

  const fetchPolls = async () => {
    try {
      const res = await API.get("/polls");
      setPolls(res.data);
    } catch (err) {
      console.error("Failed to fetch polls");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id: string, idx: number) => {
    try {
      await API.post(`/polls/${id}/vote`, { optionIndex: idx });
    } catch (err) {
      console.error("Vote failed");
    }
  };

  const filteredPolls = polls.filter((poll) => {
    const matchesSearch = poll.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    totalPolls: polls.length,
    totalVotes: polls.reduce(
      (sum, poll) => sum + poll.options.reduce((s, o) => s + o.votes, 0),
      0
    ),
    activePolls: polls.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <DashboardNavbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Manage and monitor your polls in real-time
              </p>
            </div>
            <Link
              to="/create"
              className="inline-flex items-center justify-center px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Poll
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Total Polls</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalPolls}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Total Votes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalVotes}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Active Polls</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.activePolls}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search polls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Polls Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <svg
                className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-sm text-gray-600">Loading polls...</p>
            </div>
          </div>
        ) : filteredPolls.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No polls found
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {searchQuery
                ? "Try adjusting your search"
                : "Get started by creating your first poll"}
            </p>
            {!searchQuery && (
              <Link
                to="/create"
                className="inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Poll
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPolls.map((poll) => (
              <PollCard
                key={poll._id}
                poll={poll}
                onVote={(i) => handleVote(poll._id, i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
