"use client";

import { Target, ChevronRight } from "lucide-react";
import { memo, useState, useCallback } from "react";

interface Milestone {
  id: number;
  era: string;
  period: string;
  description: string;
  color: string;
  icon: string;
}

interface TimelineSectionProps {
  milestones: Milestone[];
}

export const TimelineSection = memo(function TimelineSection({
  milestones,
}: TimelineSectionProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  const handleMilestoneClick = useCallback((milestoneId: number) => {
    setSelectedMilestone(milestoneId);
  }, []);

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
            Khám phá sự phát triển của khái niệm nhân quyền qua các chế độ xã hội
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
                    Xem chi tiết <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
