"use client";

import { Scale, Users, ChevronDown } from "lucide-react";
import { memo, useState, useCallback } from "react";

interface Criterion {
  label: string;
  content: string;
}

interface Perspective {
  title: string;
  perspective: string;
  criteria: Criterion[];
}

interface RightOption {
  id: string;
  label: string;
  icon: string;
}

interface ComparisonData {
  western: Perspective;
  vietnam: Perspective;
}

interface ComparisonSectionProps {
  western: Perspective;
  vietnam: Perspective;
}

const rightsOptions: RightOption[] = [
  { id: "speech", label: "Tự do ngôn luận", icon: "🗣️" },
  { id: "work", label: "Quyền có việc làm", icon: "💼" },
  { id: "education", label: "Quyền được học tập", icon: "📚" },
  { id: "property", label: "Quyền sở hữu tài sản", icon: "🏠" },
];

const comparisons: Record<string, ComparisonData> = {
  speech: {
    western: {
      title: "Quan điểm Phương Tây",
      perspective: "Chú trọng Cá nhân",
      criteria: [
        {
          label: "Trọng tâm",
          content: "Tự do ngôn luận là quyền tuyệt đối của cá nhân. Ít giới hạn.",
        },
        {
          label: "Tiếp cận",
          content: "Bảo vệ ngôn luận khỏi sự can thiệp của chính phủ.",
        },
        {
          label: "Bản chất",
          content: "Quyền tự nhiên, được coi là nền tảng của dân chủ.",
        },
      ],
    },
    vietnam: {
      title: "Quan điểm Việt Nam",
      perspective: "Chú trọng Cộng đồng",
      criteria: [
        {
          label: "Trọng tâm",
          content: "Tự do ngôn luận trong khuôn khổ pháp luật. Cân bằng với lợi ích cộng đồng.",
        },
        {
          label: "Tiếp cận",
          content: "Nhà nước đảm bảo và tạo điều kiện cho người dân biểu đạt ý kiến.",
        },
        {
          label: "Bản chất",
          content: "Quyền đi đôi với trách nhiệm, không xâm phạm quyền lợi người khác.",
        },
      ],
    },
  },
  work: {
    western: {
      title: "Quan điểm Phương Tây",
      perspective: "Chú trọng Cá nhân",
      criteria: [
        {
          label: "Trọng tâm",
          content: "Quyền làm việc và tự do lựa chọn nghề nghiệp là cá nhân.",
        },
        {
          label: "Tiếp cận",
          content: "Thị trường lao động tự điều chỉnh, ít sự can thiệp của nhà nước.",
        },
        {
          label: "Bản chất",
          content: "Hợp đồng lao động tự do giữa người lao động và chủ sử dụng.",
        },
      ],
    },
    vietnam: {
      title: "Quan điểm Việt Nam",
      perspective: "Chú trọng Cộng đồng",
      criteria: [
        {
          label: "Trọng tâm",
          content: "Nhà nước có chính sách tạo việc làm, bảo đảm quyền lợi người lao động.",
        },
        {
          label: "Tiếp cận",
          content: "Nhà nước quản lý, điều tiết thị trường lao động, bảo vệ người lao động.",
        },
        {
          label: "Bản chất",
          content: "Quyền làm việc gắn liền với phát triển kinh tế và an sinh xã hội.",
        },
      ],
    },
  },
  education: {
    western: {
      title: "Quan điểm Phương Tây",
      perspective: "Chú trọng Cá nhân",
      criteria: [
        {
          label: "Trọng tâm",
          content: "Giáo dục là quyền cá nhân, phụ thuộc vào khả năng chi trả.",
        },
        {
          label: "Tiếp cận",
          content: "Tư nhân hóa giáo dục, sự lựa chọn của phụ huynh và học sinh.",
        },
        {
          label: "Bản chất",
          content: "Giáo dục như hàng hóa, cạnh tranh giữa các trường học.",
        },
      ],
    },
    vietnam: {
      title: "Quan điểm Việt Nam",
      perspective: "Chú trọng Cộng đồng",
      criteria: [
        {
          label: "Trọng tâm",
          content: "Giáo dục là quyền của công dân và trách nhiệm của nhà nước.",
        },
        {
          label: "Tiếp cận",
          content: "Nhà nước bảo đảm phổ cập giáo dục, miễn học phí công lập.",
        },
        {
          label: "Bản chất",
          content: "Giáo dục phục vụ phát triển đất nước và bình đẳng cơ hội.",
        },
      ],
    },
  },
  property: {
    western: {
      title: "Quan điểm Phương Tây",
      perspective: "Chú trọng Cá nhân",
      criteria: [
        {
          label: "Trọng tâm",
          content: "Quyền sở hữu tư nhân là thiêng liêng, gần như tuyệt đối.",
        },
        {
          label: "Tiếp cận",
          content: "Nhà nước hạn chế can thiệp vào quyền sở hữu.",
        },
        {
          label: "Bản chất",
          content: "Sở hữu tư nhân là động lực chính của kinh tế thị trường.",
        },
      ],
    },
    vietnam: {
      title: "Quan điểm Việt Nam",
      perspective: "Chú trọng Cộng đồng",
      criteria: [
        {
          label: "Trọng tâm",
          content: "Quyền sở hữu được công nhận nhưng gắn với lợi ích cộng đồng.",
        },
        {
          label: "Tiếp cận",
          content: "Nhà nước có thể quy hoạch, quản lý đất nước vì lợi ích công.",
        },
        {
          label: "Bản chất",
          content: "Sở hữu nhiều thành phần, phục vụ phát triển bền vững.",
        },
      ],
    },
  },
};

export const ComparisonSection = memo(function ComparisonSection({
  western: initialWestern,
  vietnam: initialVietnam,
}: ComparisonSectionProps) {
  const [selectedRight, setSelectedRight] = useState<string>("speech");
  const [isOpen, setIsOpen] = useState(false);

  const currentComparison = comparisons[selectedRight];

  const handleRightChange = useCallback((rightId: string) => {
    setSelectedRight(rightId);
    setIsOpen(false);
  }, []);

  const selectedOption = rightsOptions.find((opt) => opt.id === selectedRight);

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
            So sánh quan niệm về nhân quyền giữa Phương Tây và Việt Nam.
            <br />
            <span className="text-primary font-semibold">Chọn quyền để xem chi tiết!</span>
          </p>
        </div>

        {/* Rights Selector Dropdown */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between gap-3 px-6 py-4 bg-card border-2 border-primary rounded-2xl hover:bg-primary/5 transition-all shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedOption?.icon}</span>
                <span className="font-heading font-bold text-lg">{selectedOption?.label}</span>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border-2 border-border rounded-2xl shadow-xl overflow-hidden z-10 animate-fade-up">
                {rightsOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleRightChange(option.id)}
                    className={`w-full flex items-center gap-3 px-6 py-4 hover:bg-primary/10 transition-colors ${
                      selectedRight === option.id ? "bg-primary/10" : ""
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
                    <h3 className="text-xl font-heading font-bold">{currentComparison.western.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentComparison.western.perspective}</p>
                  </div>
                </div>

                {currentComparison.western.criteria.map((criterion, index) => (
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
                    <h3 className="text-xl font-heading font-bold">{currentComparison.vietnam.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentComparison.vietnam.perspective}</p>
                  </div>
                </div>

                {currentComparison.vietnam.criteria.map((criterion, index) => (
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
