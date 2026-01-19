"use client";

import { Scale, Users } from "lucide-react";
import { memo } from "react";

interface Criterion {
  label: string;
  content: string;
}

interface Perspective {
  title: string;
  perspective: string;
  criteria: Criterion[];
}

interface ComparisonSectionProps {
  western: Perspective;
  vietnam: Perspective;
}

export const ComparisonSection = memo(function ComparisonSection({
  western,
  vietnam,
}: ComparisonSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Scale className="h-4 w-4" />
            Phần 2
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4">
            Lăng kính Nhân quyền
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            So sánh quan niệm về nhân quyền giữa Phương Tây và Việt Nam
          </p>
        </div>

        <div className="relative">
          {/* Center Divider */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary -translate-x-1/2 z-10" />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Western Perspective */}
            <div className="space-y-4 pr-4">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">{western.title}</h3>
                    <p className="text-sm text-muted-foreground">{western.perspective}</p>
                  </div>
                </div>

                {western.criteria.map((criterion, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl mb-3"
                  >
                    <div className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                      {criterion.label}
                    </div>
                    <p className="text-sm text-muted-foreground">{criterion.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vietnam Perspective */}
            <div className="space-y-4 pl-4">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-teal-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">{vietnam.title}</h3>
                    <p className="text-sm text-muted-foreground">{vietnam.perspective}</p>
                  </div>
                </div>

                {vietnam.criteria.map((criterion, index) => (
                  <div
                    key={index}
                    className="bg-teal-50 dark:bg-teal-950/20 p-4 rounded-xl mb-3"
                  >
                    <div className="font-semibold text-teal-700 dark:text-teal-400 mb-2">
                      {criterion.label}
                    </div>
                    <p className="text-sm text-muted-foreground">{criterion.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-lg border-2 border-primary">
              <span className="text-sm font-bold text-primary">SO SÁNH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
