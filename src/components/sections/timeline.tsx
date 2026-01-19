"use client";

import { Target, ChevronRight, X, User, Crown, Briefcase, Users } from "lucide-react";
import { memo, useState, useCallback } from "react";

interface Milestone {
  id: number;
  era: string;
  period: string;
  description: string;
  color: string;
  icon: string;
  quiz: {
    question: string;
    options: { id: string; label: string; icon: any; hasRights: boolean }[];
  };
}

interface TimelineSectionProps {
  milestones: Milestone[];
}

export const TimelineSection = memo(function TimelineSection({
  milestones,
}: TimelineSectionProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const handleMilestoneClick = useCallback(
    (milestoneId: number) => {
      setSelectedMilestone(milestoneId);
      setShowQuiz(true);
      setSelectedClass(null);
    },
    []
  );

  const handleClassSelect = useCallback(
    (classId: string, hasRights: boolean) => {
      setSelectedClass(classId);
      // Show result with animation
    },
    []
  );

  const closeModal = useCallback(() => {
    setShowQuiz(false);
    setSelectedMilestone(null);
    setSelectedClass(null);
  }, []);

  const currentMilestone = milestones.find((m) => m.id === selectedMilestone);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Target className="h-4 w-4" />
            Phần 1
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4">
            Hành trình Lịch sử
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá sự phát triển của khái niệm nhân quyền qua các chế độ xã hội.
            <br />
            <span className="text-primary font-semibold">Click vào từng mốc để trải nghiệm!</span>
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden lg:block timeline-line" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="group"
                onClick={() => handleMilestoneClick(milestone.id)}
              >
                <div
                  className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    selectedMilestone === milestone.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${milestone.color} text-white text-3xl mb-4 shadow-lg`}
                  >
                    {milestone.icon}
                  </div>

                  {/* Period Badge */}
                  <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                    {milestone.period}
                  </div>

                  {/* Era */}
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                    {milestone.era}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {milestone.description}
                  </p>

                  {/* CTA */}
                  <button className="mt-4 text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Trải nghiệm <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Quiz Modal */}
      {showQuiz && currentMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-up">
          <div className="glass-card max-w-2xl w-full p-8 rounded-3xl shadow-2xl animate-scale-in">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-accent rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Era Title */}
            <div className="text-center mb-6">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${currentMilestone.color} text-white text-4xl mb-4 shadow-lg mx-auto`}
              >
                {currentMilestone.icon}
              </div>
              <h3 className="text-2xl font-heading font-bold mb-2">{currentMilestone.era}</h3>
              <p className="text-sm text-accent uppercase tracking-wider">{currentMilestone.period}</p>
            </div>

            {/* Quiz Question */}
            <div className="bg-secondary/50 p-6 rounded-2xl mb-6">
              <h4 className="text-lg font-bold mb-3">{currentMilestone.quiz.question}</h4>
              <p className="text-sm text-muted-foreground">Chọn giai cấp của bạn để xem quyền!</p>
            </div>

            {/* Class Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {currentMilestone.quiz.options.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedClass === option.id;
                const showResult = selectedClass !== null;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleClassSelect(option.id, option.hasRights)}
                    disabled={showResult}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      showResult && option.hasRights
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : showResult && !option.hasRights && isSelected
                        ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                        : isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary bg-card"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon className="h-8 w-8" />
                      <span className="font-medium text-sm">{option.label}</span>
                      {showResult && (
                        <span className={`text-xs font-semibold ${option.hasRights ? "text-green-600" : "text-red-600"}`}>
                          {option.hasRights ? "✓ Có quyền" : "✗ Không có quyền"}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {selectedClass && (
              <div className="bg-primary/5 p-4 rounded-xl animate-fade-up">
                <p className="text-sm text-muted-foreground text-center">
                  <strong className="text-primary">Thực tế lịch sử:</strong> Trong thời kỳ{" "}
                  {currentMilestone.era.toLowerCase()}, quyền con người bị giới hạn theo đẳng cấp.
                  Chỉ một nhóm nhỏ được hưởng đầy đủ quyền lợi, trong khi đa số người dân bị đối
                  xử bất công.
                </p>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="w-full mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </section>
  );
});
