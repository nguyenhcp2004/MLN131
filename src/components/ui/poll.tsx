"use client";

import { memo, useState, useCallback } from "react";
import { BarChart3 } from "lucide-react";

interface PollOption {
  id: string;
  label: string;
  votes: number;
}

interface PollProps {
  question: string;
  options: PollOption[];
  sectionId: string;
}

export const Poll = memo(function Poll({ question, options: initialOptions, sectionId }: PollProps) {
  const [options, setOptions] = useState<PollOption[]>(initialOptions);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = useCallback(
    (optionId: string) => {
      if (!hasVoted) {
        setOptions((prev) =>
          prev.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          )
        );
        setHasVoted(true);
        setSelectedOption(optionId);
      }
    },
    [hasVoted]
  );

  return (
    <div className="glass-card p-6 rounded-2xl mt-8">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-accent" />
        <h3 className="font-bold text-lg">Thăm dò ý kiến</h3>
      </div>
      <p className="text-sm font-semibold mb-4">{question}</p>

      <div className="space-y-3">
        {options.map((option) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isSelected = selectedOption === option.id;

          return (
            <div key={option.id}>
              <button
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary bg-card"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{option.label}</span>
                  {hasVoted && (
                    <span className="text-sm font-bold text-primary">{percentage.toFixed(0)}%</span>
                  )}
                </div>
                {hasVoted && (
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-500 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {hasVoted && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Tổng số phiếu: {totalVotes}
        </p>
      )}
    </div>
  );
});
