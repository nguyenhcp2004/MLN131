"use client";

import { MapPin, Users, LucideIcon } from "lucide-react";
import { memo, useState, useCallback } from "react";

interface Highlight {
  label: string;
  value: string;
  description: string;
}

interface Practice {
  id: number;
  sector: string;
  icon: LucideIcon;
  color: string;
  highlights: Highlight[];
}

interface PracticeSectionProps {
  practices: Practice[];
}

export const PracticeSection = memo(function PracticeSection({
  practices,
}: PracticeSectionProps) {
  const [selectedPractice, setSelectedPractice] = useState<number | null>(null);

  const handlePracticeClick = useCallback((practiceId: number) => {
    setSelectedPractice(practiceId);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MapPin className="h-4 w-4" />
            Phần 3
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4">
            Bản đồ Thực tiễn
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Những điểm sáng trong bảo đảm và thực thi quyền con người tại Việt Nam
          </p>
        </div>

        {/* Practice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {practices.map((practice) => {
            const Icon = practice.icon;
            return (
              <div
                key={practice.id}
                className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  selectedPractice === practice.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handlePracticeClick(practice.id)}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${practice.color} text-white mb-4 shadow-lg`}
                >
                  <Icon className="h-8 w-8" />
                </div>

                {/* Sector Title */}
                <h3 className="text-2xl font-heading font-bold mb-4">{practice.sector}</h3>

                {/* Highlights */}
                <div className="space-y-3">
                  {practice.highlights.map((highlight, index) => (
                    <div key={index} className="bg-secondary/50 p-3 rounded-xl">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-sm text-muted-foreground">{highlight.label}</span>
                        <span className="text-xl font-bold text-primary">{highlight.value}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Principle Card */}
        <div className="mt-12 glass-card p-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-heading font-bold mb-2">Nguyên tắc hoạt động</h4>
              <p className="text-muted-foreground leading-relaxed">
                Dân biết - Dân bàn - Dân làm - Dân kiểm tra - Dân thụ hưởng. Đây là
                phương châm xuyên suốt trong công cuộc bảo đảm quyền con người, đặt người
                dân vào vị trí trung tâm của sự phát triển.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
