"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Heart, GraduationCap, Shield } from "lucide-react";
import dynamic from "next/dynamic";

// Layout components
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

// Section components
import { HeroSection } from "@/components/sections/hero";
import { TimelineSection } from "@/components/sections/timeline";
import { ComparisonSection } from "@/components/sections/comparison";
import { PracticeSection } from "@/components/sections/practice";

// Dynamic import for Quiz section (bundle optimization)
const QuizSection = dynamic(() => import("@/components/sections/quiz").then(m => ({ default: m.QuizSection })), {
  loading: () => (
    <div className="py-20 px-4 flex items-center justify-center">
      <div className="glass-card p-8 rounded-3xl text-center">
        <div className="animate-pulse text-primary">Đang tải...</div>
      </div>
    </div>
  ),
  ssr: false,
});

// Data
const milestones = [
  {
    id: 1,
    era: "Xã hội Chiếm hữu Nô lệ",
    period: "Cổ đại",
    description: "Quyền con người bị chà đạp. Nô lệ được coi là tài sản, công cụ biết nói, không có bất kỳ quyền công dân nào.",
    color: "from-red-500 to-red-600",
    icon: "⛓️",
  },
  {
    id: 2,
    era: "Xã hội Phong kiến",
    period: "Trung đại",
    description: "Quyền con người bị phân hóa theo đẳng cấp. Đặc quyền quý tộc, nông dân chịu nhiều thuế và dịch vụ.",
    color: "from-amber-500 to-amber-600",
    icon: "🏰",
  },
  {
    id: 3,
    era: "Xã hội Tư bản",
    period: "Hiện đại",
    description: "Tuyên ngôn Nhân quyền và Dân quyền (1789). Quyền công dân được ghi nhận nhưng phụ thuộc vào tài sản.",
    color: "from-blue-500 to-blue-600",
    icon: "⚖️",
  },
  {
    id: 4,
    era: "Xã hội Xã hội chủ nghĩa",
    period: "Đương đại",
    description: "Quyền con người thực chất, công bằng, bình đẳng. Thống nhất giữa quyền và nghĩa vụ. Phát triển toàn diện con người.",
    color: "from-teal-500 to-teal-600",
    icon: "🌟",
  },
];

const comparisonData = {
  western: {
    title: "Quan điểm Phương Tây",
    perspective: "Chú trọng Cá nhân",
    criteria: [
      {
        label: "Trọng tâm",
        content: "Quyền cá nhân là tối thượng. Nhấn mạnh tự do cá nhân, quyền riêng tư.",
      },
      {
        label: "Tiếp cận",
        content: "Đối lập giữa cá nhân và nhà nước. Giới hạn quyền lực nhà nước.",
      },
      {
        label: "Bản chất",
        content: "Quyền tự nhiên, bẩm sinh. Ít đề cập đến nghĩa vụ đi kèm.",
      },
    ],
  },
  vietnam: {
    title: "Quan điểm Việt Nam",
    perspective: "Chú trọng Cộng đồng",
    criteria: [
      {
        label: "Trọng tâm",
        content: "Cá nhân trong cộng đồng. Cân bằng quyền cá nhân và lợi ích cộng đồng.",
      },
      {
        label: "Tiếp cận",
        content: "Nhà nước bảo đảm, tôn trọng quyền con người. Dân biết, dân bàn, dân làm.",
      },
      {
        label: "Bản chất",
        content: "Thống nhất giữa quyền và nghĩa vụ. Quyền đi đôi với trách nhiệm.",
      },
    ],
  },
};

const practices = [
  {
    id: 1,
    sector: "Y tế",
    icon: Heart,
    color: "bg-rose-500",
    highlights: [
      { label: "Độ phủ vắc-xin", value: "95%+", description: "Tỷ lệ tiêm chủng mở rộng cao" },
      { label: "Bảo hiểm y tế", value: "92%", description: "Dân số tham gia BHYT" },
      { label: "Tuổi thọ", value: "75.5", description: "Tuổi thọ trung bình" },
    ],
  },
  {
    id: 2,
    sector: "Giáo dục",
    icon: GraduationCap,
    color: "bg-blue-500",
    highlights: [
      { label: "Phổ cập giáo dục", value: "100%", description: "Tiểu học và THCS" },
      { label: "Tỷ lệ biết chữ", value: "97%", description: "Người từ 15 tuổi trở lên" },
      { label: "Đào tạo nghề", value: "65%", description: "Lao động đã qua training" },
    ],
  },
  {
    id: 3,
    sector: "An sinh xã hội",
    icon: Shield,
    color: "bg-green-500",
    highlights: [
      { label: "Giảm nghèo", value: "2.23%", description: "Tỷ lệ hộ nghèo năm 2024" },
      { label: "Trợ giúp xã hội", value: "5.2M+", description: "Người được trợ cấp hàng tháng" },
      { label: "Việc làm mới", value: "1.6M+", description: "Năm 2024" },
    ],
  },
];

const quizzes = [
  {
    id: 1,
    question: "Bạn phát hiện hành vi tham nhũng tại cơ quan. Bạn sẽ làm gì?",
    scenario: "Một cán bộ đang nhận tiền để 'bơm thầu' dự án công.",
    options: [
      {
        id: 1,
        text: "Im lặng vì sợ ảnh hưởng công việc",
        correct: false,
        explanation: "Không đúng. Im lặng là tiếp tay cho tham nhũng.",
      },
      {
        id: 2,
        text: "Phản ánh qua đường dây nóng, tin báo tố giác",
        correct: true,
        explanation: "Đúng! Đây là trách nhiệm của công dân theo Luật Tiếp công dân và Luật Phòng chống tham nhũng.",
      },
      {
        id: 3,
        text: "Đăng tin lên mạng xã hội để 'bóc phốt'",
        correct: false,
        explanation: "Chưa đầy đủ. Cần phản ánh qua kênh chính thống và có bằng chứng xác thực.",
      },
    ],
  },
  {
    question: "Về quyền tự do ngôn luận, quan điểm nào là đúng?",
    scenario: "Trong bối cảnh xây dựng Chủ nghĩa xã hội.",
    options: [
      {
        id: 1,
        text: "Được phép nói mọi thứ trên mạng xã hội",
        correct: false,
        explanation: "Sai. Tự do ngôn luận không có nghĩa là được tung tin giả, tin đồn.",
      },
      {
        id: 2,
        text: "Tự do ngôn luận trong khuôn khổ pháp luật",
        correct: true,
        explanation: "Đúng! Tự do ngôn luận phải tuân thủ pháp luật, không xâm phạm quyền lợi người khác.",
      },
      {
        id: 3,
        text: "Chỉ được nói những gì nhà nước cho phép",
        correct: false,
        explanation: "Sai. Công dân có quyền đóng góp ý kiến, phản biện xã hội.",
      },
    ],
  },
  {
    question: "Đối với người khuyết tật, xã hội cần làm gì?",
    scenario: "Thực hiện nguyên tắc bình đẳng, không phân biệt đối xử.",
    options: [
      {
        id: 1,
        text: "Cung cấp trợ cấp, không cần làm gì thêm",
        correct: false,
        explanation: "Chưa đầy đủ. Cần tạo điều kiện để họ tự chủ.",
      },
      {
        id: 2,
        text: "Tạo cơ hội giáo dục, việc làm, hòa nhập cộng đồng",
        correct: true,
        explanation: "Đúng! Đảm bảo quyền con người là tạo cơ hội phát triển toàn diện.",
      },
      {
        id: 3,
        text: "Để gia đình tự lo liệu",
        correct: false,
        explanation: "Sai. Nhà nước và xã hội có trách nhiệm hỗ trợ.",
      },
    ],
  },
];

const navItems = [
  { id: "hero", label: "Trang chủ" },
  { id: "timeline", label: "Hành trình lịch sử" },
  { id: "comparison", label: "Lăng kính nhân quyền" },
  { id: "practice", label: "Thực tiễn" },
  { id: "quiz", label: "Thử thách" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  // Scroll handler - optimized with useCallback
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          for (const sectionId of navItems.map((item) => item.id)) {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 100 && rect.bottom >= 100) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handler - memoized with useCallback
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation
        navItems={navItems}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Hero Section */}
      <HeroSection
        onStartJourney={() => scrollToSection("timeline")}
        onStartQuiz={() => scrollToSection("quiz")}
      />

      {/* Timeline Section */}
      <TimelineSection milestones={milestones} />

      {/* Comparison Section */}
      <ComparisonSection western={comparisonData.western} vietnam={comparisonData.vietnam} />

      {/* Practice Section */}
      <PracticeSection practices={practices} />

      {/* Quiz Section - Dynamically loaded */}
      <QuizSection quizzes={quizzes} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
