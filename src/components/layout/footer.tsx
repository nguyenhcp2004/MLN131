"use client";

import { BookOpen } from "lucide-react";
import { memo } from "react";

export const Footer = memo(function Footer() {
  return (
    <footer className="py-12 px-4 bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-heading font-bold text-lg">Hành trình Nhân quyền</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">
          Website giáo dục tương tác về nhân quyền trong tiến trình xây dựng Chủ nghĩa
          xã hội
        </p>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">© 2024 - Dự án giáo dục chính trị</p>
      </div>
    </footer>
  );
});
