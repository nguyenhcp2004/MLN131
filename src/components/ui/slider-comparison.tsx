"use client";

import { memo, useState, useCallback } from "react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

interface SliderComparisonProps {
  western: any;
  vietnam: any;
}

export const SliderComparison = memo(function SliderComparison({
  western,
  vietnam,
}: SliderComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedView, setSelectedView] = useState<"western" | "vietnam" | null>(null);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  }, []);

  const handleQuickSelect = useCallback((position: number) => {
    setSliderPosition(position);
  }, []);

  const revealPercentage = sliderPosition;

  return (
    <div className="w-full">
      {/* Quick Select Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => handleQuickSelect(20)}
          className="px-6 py-2 rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all text-sm font-medium"
        >
          Phương Tây {`←`}
        </button>
        <button
          onClick={() => handleQuickSelect(80)}
          className="px-6 py-2 rounded-full border-2 border-teal-500 hover:bg-teal-500 hover:text-white transition-all text-sm font-medium"
        >
          {`→`} Việt Nam
        </button>
        <button
          onClick={() => handleQuickSelect(50)}
          className="px-6 py-2 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all text-sm font-medium"
        >
          So sánh 50/50
        </button>
      </div>

      {/* Slider Container */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border-2 border-border">
        {/* Western Perspective (Background) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-blue-700 dark:text-blue-300">
                {western.title}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">{western.perspective}</p>
            </div>
          </div>

          {western.criteria.map((criterion: any, index: number) => (
            <div key={index} className="bg-white/50 dark:bg-blue-950/20 p-4 rounded-xl mb-3 backdrop-blur-sm">
              <div className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                {criterion.label}
              </div>
              <p className="text-sm text-blue-900 dark:text-blue-200">{criterion.content}</p>
            </div>
          ))}
        </div>

        {/* Vietnam Perspective (Overlay with clip-path) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/30 p-6 flex flex-col justify-center transition-all duration-300"
          style={{
            clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-teal-700 dark:text-teal-300">
                {vietnam.title}
              </h3>
              <p className="text-sm text-teal-600 dark:text-teal-400">{vietnam.perspective}</p>
            </div>
          </div>

          {vietnam.criteria.map((criterion: any, index: number) => (
            <div key={index} className="bg-white/50 dark:bg-teal-950/20 p-4 rounded-xl mb-3 backdrop-blur-sm">
              <div className="font-semibold text-teal-700 dark:text-teal-400 mb-2">
                {criterion.label}
              </div>
              <p className="text-sm text-teal-900 dark:text-teal-200">{criterion.content}</p>
            </div>
          ))}
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary shadow-2xl cursor-col-resize z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-xl border-4 border-primary flex items-center justify-center">
            <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Percentage Labels */}
        <div className="absolute bottom-4 left-4 text-xs font-bold text-blue-600 dark:text-blue-400">
          {100 - Math.round(sliderPosition)}% Phương Tây
        </div>
        <div className="absolute bottom-4 right-4 text-xs font-bold text-teal-600 dark:text-teal-400">
          {Math.round(sliderPosition)}% Việt Nam
        </div>
      </div>

      {/* Range Input (Hidden but functional) */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="w-full opacity-0 absolute -top-96"
      />

      {/* Keyboard Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setSliderPosition((p) => Math.max(0, p - 10))}
          className="p-3 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all"
          aria-label="Move slider left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="px-4 py-3 font-bold text-primary">
          Kéo thanh trượt để so sánh
        </span>
        <button
          onClick={() => setSliderPosition((p) => Math.min(100, p + 10))}
          className="p-3 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all"
          aria-label="Move slider right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Follow-up Question */}
      {showQuestion ? (
        <div className="mt-8 glass-card p-6 rounded-2xl animate-fade-up">
          <h4 className="text-lg font-bold mb-4 text-center">
            Sau khi so sánh, quan điểm nào bạn đồng tình hơn?
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedView("western")}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedView === "western"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-border hover:border-blue-500"
              }`}
            >
              <div className="font-semibold text-blue-700 dark:text-blue-400">
                {western.title}
              </div>
              <div className="text-sm text-muted-foreground">{western.perspective}</div>
            </button>
            <button
              onClick={() => setSelectedView("vietnam")}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedView === "vietnam"
                  ? "border-teal-500 bg-teal-500/10"
                  : "border-border hover:border-teal-500"
              }`}
            >
              <div className="font-semibold text-teal-700 dark:text-teal-400">
                {vietnam.title}
              </div>
              <div className="text-sm text-muted-foreground">{vietnam.perspective}</div>
            </button>
          </div>
          {selectedView && (
            <div className="mt-4 text-center text-sm text-primary animate-fade-up">
              ✓ Cảm ơn bạn đã chọn! Lựa chọn của bạn đã được ghi nhận.
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowQuestion(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            Cho chúng tôi biết quan điểm của bạn →
          </button>
        </div>
      )}
    </div>
  );
});
