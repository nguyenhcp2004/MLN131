"use client";

import { Target, Award, ChevronRight } from "lucide-react";
import { memo } from "react";

interface HeroSectionProps {
  onStartJourney: () => void;
  onStartQuiz: () => void;
}

export const HeroSection = memo(function HeroSection({
  onStartJourney,
  onStartQuiz,
}: HeroSectionProps) {
  const stats = [
    { value: "4", label: "Giai đoạn lịch sử", color: "text-primary" },
    { value: "3", label: "Lĩnh vực thực tiễn", color: "text-accent" },
    { value: "3", label: "Tình huống thử thách", color: "text-primary" },
    { value: "∞", label: "Kiến thức nhân quyền", color: "text-accent" },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Target className="h-4 w-4" />
            Khám phá hành trình lịch sử
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Bạn hiểu gì về<br />
            quyền con người?
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Hành trình từ những khái niệm đầu tiên đến thực tiễn bảo đảm nhân quyền
            trong tiến trình xây dựng Chủ nghĩa xã hội.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartJourney}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Bắt đầu hành trình
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={onStartQuiz}
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/80 transition-all duration-200"
            >
              <Award className="h-5 w-5" />
              Thử thách ngay
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-scale-in">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card p-4 rounded-xl">
              <div className={`text-3xl font-heading font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
