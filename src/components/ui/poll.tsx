"use client";

import { memo, useState, useCallback } from "react";
import { BarChart3, Users, Eye, EyeOff } from "lucide-react";
import { usePersona } from "@/contexts/persona-context";

interface PollOption {
  id: string;
  label: string;
  votes: number;
  breakdown?: {
    students: number;
    workers: number;
    officials: number;
  };
}

interface PollProps {
  question: string;
  options: PollOption[];
  sectionId: string;
}

export const Poll = memo(function Poll({ question, options: initialOptions, sectionId }: PollProps) {
  const { persona } = usePersona();
  const [options, setOptions] = useState<PollOption[]>(initialOptions);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = useCallback(
    (optionId: string) => {
      if (!hasVoted) {
        setOptions((prev) =>
          prev.map((opt) =>
            opt.id === optionId
              ? { ...opt, votes: opt.votes + 1, breakdown: { ...opt.breakdown, students: (opt.breakdown?.students || 0) + (persona?.position?.includes("Sinh viên") ? 1 : 0), workers: (opt.breakdown?.workers || 0) + (persona?.position?.includes("Công nhân") ? 1 : 0), officials: (opt.breakdown?.officials || 0) + (persona?.position?.includes("Cán bộ") ? 1 : 0) } }
              : opt
          )
        );
        setHasVoted(true);
        setSelectedOption(optionId);
      }
    },
    [hasVoted, persona]
  );

  return (
    <div className="glass-card p-6 rounded-2xl mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-accent" />
          <h3 className="font-bold text-lg">Thăm dò ý kiến</h3>
        </div>
        {hasVoted && (
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-sm text-primary hover:text-accent flex items-center gap-1 transition-colors"
          >
            {showBreakdown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showBreakdown ? "Ẩn" : "Mở"} theo nhóm
          </button>
        )}
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

              {/* Persona Breakdown */}
              {hasVoted && showBreakdown && option.breakdown && (
                <div className="mt-2 pl-6 space-y-1 animate-fade-up">
                  <p className="text-xs text-muted-foreground font-semibold mb-2">
                    Phân tích theo nhóm:
                  </p>
                  {[
                    { label: "Học sinh/Sinh viên", value: option.breakdown.students, percentage: option.breakdown.students / option.votes * 100, color: "bg-blue-500" },
                    { label: "Công nhân/Nhân viên", value: option.breakdown.workers, percentage: option.breakdown.workers / option.votes * 100, color: "bg-teal-500" },
                    { label: "Cán bộ/Công chức", value: option.breakdown.officials, percentage: option.breakdown.officials / option.votes * 100, color: "bg-purple-500" },
                  ]
                    .filter((g) => g.value > 0)
                    .map((group) => (
                      <div key={group.label} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${group.color}`} />
                        <span className="text-xs flex-1">{group.label}: {group.value} phiếu ({group.percentage.toFixed(0)}%)</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasVoted && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">Tổng số phiếu: {totalVotes}</p>
            {!showBreakdown && (
              <button
                onClick={() => setShowBreakdown(true)}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Users className="h-3 w-3" />
                Xem phân tích theo nhóm
              </button>
            )}
          </div>

          {/* Personalized Message */}
          {persona && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              <span className="font-semibold text-primary">{persona.position}</span> đã bỏ {selectedOption ? options.find((o) => o.id === selectedOption)?.label : ""}
              .  Bạn có muốn thay đổi lựa chọn không?
            </p>
          )}
        </div>
      )}
    </div>
  );
});
