import { useState } from "react";

type Option = { text: string; votes: number };
type Poll = {
  _id: string;
  question: string;
  options: Option[];
  createdAt?: string;
};

export default function PollCard({
  poll,
  onVote,
}: {
  poll: Poll;
  onVote?: (i: number) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [voting, setVoting] = useState(false);

  const totalVotes = poll.options.reduce(
    (s: number, o: Option) => s + o.votes,
    0
  );

  const handleVote = async (idx: number) => {
    if (!onVote) return;
    setVoting(true);
    setSelectedOption(idx);
    await onVote(idx);
    setVoting(false);
  };

  const getBarColor = (idx: number) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    return colors[idx % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-base text-gray-900 flex-1">
          {poll.question}
        </h3>
        <div className="flex items-center text-xs text-gray-500 ml-3">
          <svg
            className="w-3.5 h-3.5 mr-1"
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
          {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
        </div>
      </div>

      <div className="space-y-2">
        {poll.options.map((opt: Option, idx: number) => {
          const percentage = totalVotes
            ? Math.round((opt.votes / totalVotes) * 100)
            : 0;
          const isSelected = selectedOption === idx;

          return (
            <div key={idx} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">
                  {opt.text}
                </span>
                <span className="text-xs text-gray-500">{percentage}%</span>
              </div>

              <div className="relative">
                {/* Progress bar background */}
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                  {/* Progress bar fill */}
                  <div
                    className={`h-full ${getBarColor(
                      idx
                    )} transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                {/* Vote button overlay */}
                {onVote && (
                  <button
                    onClick={() => handleVote(idx)}
                    disabled={voting}
                    className={`absolute inset-0 flex items-center justify-between px-3 rounded-lg transition-all ${
                      isSelected
                        ? "bg-blue-500/20 border-2 border-blue-500"
                        : "hover:bg-white/90 border-2 border-transparent hover:border-blue-300"
                    } disabled:cursor-not-allowed`}
                  >
                    <span className="text-xs font-medium text-gray-700">
                      {opt.votes} {opt.votes === 1 ? "vote" : "votes"}
                    </span>
                    {voting && isSelected ? (
                      <svg
                        className="animate-spin h-4 w-4 text-blue-600"
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
                    ) : (
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
