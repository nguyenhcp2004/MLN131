"use client";

import { memo, useState, useCallback, useEffect } from "react";
import { Play, Pause, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";

interface TimelineData {
  year: number;
  cases: number;
  recovered: number;
  label: string;
  color: string;
}

interface TimelineScrubberProps {
  data: TimelineData[];
}

export const TimelineScrubber = memo(function TimelineScrubber({ data }: TimelineScrubberProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentItem = data[currentIndex];

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(data.length - 1, prev + 1));
  }, [data.length]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleTimelineClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const index = Math.floor(percentage * data.length);
    setCurrentIndex(Math.min(data.length - 1, Math.max(0, index)));
  }, [data.length]);

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= data.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, data.length]);

  return (
    <div className="w-full space-y-8">
      {/* Main Display */}
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isPlaying ? "bg-primary animate-pulse" : "bg-primary/10"
              }`}
            >
              {isPlaying ? <Pause className="h-8 w-8 text-primary-foreground" /> : <Play className="h-8 w-8 text-primary" />}
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-1">{currentItem.year}</div>
              <div className="text-lg text-muted-foreground">{currentItem.label}</div>
            </div>
          </div>
          <button
            onClick={togglePlay}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            {isPlaying ? "Tạm dừng" : "Tự động chạy"}
            <RotateCw className={`h-5 w-5 ${isPlaying ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className={`p-6 rounded-xl ${currentItem.color} bg-opacity-10`}>
            <div className="text-4xl font-bold mb-2">{currentItem.cases}</div>
            <div className="text-sm font-semibold">Vụ xử lý</div>
            <div className="text-xs text-muted-foreground mt-1">+{(currentItem.cases * 0.23).toFixed(0)}% so với trước</div>
          </div>
          <div className="bg-green-500/10 p-6 rounded-xl">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {currentItem.recovered} Tỷ
            </div>
            <div className="text-sm font-semibold text-green-700">Đồng thu hồi</div>
            <div className="text-xs text-green-600 mt-1">+{(currentItem.recovered * 0.45).toFixed(0)}% so với trước</div>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Scrubber */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-3 rounded-full border-2 border-primary hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous year"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Custom Timeline */}
          <div
            className="flex-1 mx-4 h-16 bg-secondary rounded-2xl relative cursor-pointer group"
            onClick={handleTimelineClick}
          >
            {/* Progress Bar */}
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-primary to-accent rounded-2xl transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / data.length) * 100}%` }}
            />

            {/* Timeline Points */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              {data.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative z-10 transition-all duration-300 ${
                    index === currentIndex
                      ? "scale-125"
                      : index < currentIndex
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  {/* Year Label */}
                  <div
                    className={`text-xs font-bold mb-1 text-center ${
                      index === currentIndex ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.year}
                  </div>
                  {/* Dot */}
                  <div
                    className={`w-4 h-4 rounded-full mx-auto transition-all ${
                      index === currentIndex
                        ? "bg-white scale-125 shadow-lg"
                        : index < currentIndex
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                  {/* Hidden Facts Indicator */}
                  {index === currentIndex && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-white text-xs px-3 py-1 rounded-full animate-fade-up">
                      Xem chi tiết ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === data.length - 1}
            className="p-3 rounded-full border-2 border-primary hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next year"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Instructions */}
        <p className="text-center text-sm text-muted-foreground">
          ← Kéo hoặc click vào thanh thời gian để khám phá số liệu từng năm →
        </p>
      </div>

      {/* Hidden Facts Panel */}
      <div className="glass-card p-6 rounded-2xl animate-fade-up">
        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
          💡 Hidden Fact - Năm {currentItem.year}
        </h4>
        <p className="text-muted-foreground leading-relaxed">
          Năm {currentItem.year}, Việt Nam đạt được những thành tựu nổi bật trong công cuộc phòng chống
          tham nhũng. Số vụ việc được xử lý tăng{" "}
          <span className="font-bold text-primary">
            {((currentItem.cases - data[0]?.cases) / data[0]?.cases * 100).toFixed(0)}%
          </span>{" "}
          so với năm 2021. Điều này thể hiện quyết tâm chính trị trong việc làm sạch đội ngũ cán bộ.
        </p>
      </div>

      {/* Year Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {data.map((item, index) => (
          <button
            key={item.year}
            onClick={() => setCurrentIndex(index)}
            className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
              index === currentIndex
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary bg-card"
            }`}
          >
            {item.year}
          </button>
        ))}
      </div>
    </div>
  );
});
