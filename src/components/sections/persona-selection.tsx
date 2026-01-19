"use client";

import { memo, useState, useCallback } from "react";
import { User, Briefcase, GraduationCap, Building, ArrowRight, Sparkles } from "lucide-react";
import { usePersona } from "@/contexts/persona-context";

interface Persona {
  position: string;
  age: string;
  occupation: string;
}

interface PersonaSelectionProps {
  onStart: () => void;
}

const positions = [
  { id: "student", label: "Học sinh/Sinh viên", icon: GraduationCap },
  { id: "worker", label: "Công nhân/Nhân viên", icon: Briefcase },
  { id: "official", label: "Cán bộ/Công chức", icon: Building },
  { id: "other", label: "Khác", icon: User },
];

const ageGroups = [
  { id: "under18", label: "Dưới 18 tuổi" },
  { id: "18-25", label: "18-25 tuổi" },
  { id: "26-35", label: "26-35 tuổi" },
  { id: "36-50", label: "36-50 tuổi" },
  { id: "over50", label: "Trên 50 tuổi" },
];

export const PersonaSelection = memo(function PersonaSelection({ onStart }: PersonaSelectionProps) {
  const { setPersona } = usePersona();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedOccupation, setSelectedOccupation] = useState<string>("");

  const handlePositionSelect = useCallback((positionId: string) => {
    setSelectedPosition(positionId);
    setStep(2);
  }, []);

  const handleAgeSelect = useCallback((ageId: string) => {
    setSelectedAge(ageId);
    setStep(3);
  }, []);

  const handleComplete = useCallback(() => {
    const position = positions.find((p) => p.id === selectedPosition);
    const age = ageGroups.find((a) => a.id === selectedAge);

    const persona: Persona = {
      position: position?.label || "",
      age: age?.label || "",
      occupation: selectedOccupation || "Chưa specifies",
    };

    setPersona(persona);
    onStart();
  }, [selectedPosition, selectedAge, selectedOccupation, setPersona, onStart]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          Bắt đầu hành trình của bạn
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4">
          Chọn nhân vật của bạn
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Website sẽ điều chỉnh trải nghiệm dựa trên lựa chọn của bạn. Không cần đăng ký, chỉ cần chọn
          và bắt đầu!
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all duration-300 ${
              step >= s ? "w-12 bg-primary" : "w-8 bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Position Selection */}
      {step === 1 && (
        <div className="animate-fade-up">
          <h3 className="text-2xl font-bold text-center mb-8">
            Bạn hiện đang là?
            <span className="text-primary"> {selectedPosition && positions.find((p) => p.id === selectedPosition)?.label}</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {positions.map((position) => {
              const Icon = position.icon;
              return (
                <button
                  key={position.id}
                  onClick={() => handlePositionSelect(position.id)}
                  className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    selectedPosition === position.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/50"
                      : "border-border hover:border-primary bg-card"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                        selectedPosition === position.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      }`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <span className="font-semibold text-sm text-center">{position.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Age Selection */}
      {step === 2 && (
        <div className="animate-fade-up">
          <button
            onClick={() => setStep(1)}
            className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1 transition-colors"
          >
            ← Quay lại
          </button>
          <h3 className="text-2xl font-bold text-center mb-8">
            Độ tuổi của bạn?
            <span className="text-primary"> {selectedAge && ageGroups.find((a) => a.id === selectedAge)?.label}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {ageGroups.map((age) => (
              <button
                key={age.id}
                onClick={() => handleAgeSelect(age.id)}
                className={`px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedAge === age.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary bg-card"
                }`}
              >
                <span className="font-medium text-sm">{age.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Occupation (Optional) */}
      {step === 3 && (
        <div className="animate-fade-up">
          <button
            onClick={() => setStep(2)}
            className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1 transition-colors"
          >
            ← Quay lại
          </button>
          <h3 className="text-2xl font-bold text-center mb-8">
            Nghề nghiệp của bạn (Tùy chọn)
          </h3>
          <input
            type="text"
            value={selectedOccupation}
            onChange={(e) => setSelectedOccupation(e.target.value)}
            placeholder="Nhập nghề nghiệp của bạn..."
            className="w-full px-6 py-4 border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-colors mb-6"
          />

          <button
            onClick={handleComplete}
            className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-[1.02]"
          >
            Bắt đầu hành trình
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Hoặc nhấn Enter để bỏ qua và bắt đầu ngay
          </p>
        </div>
      )}
    </div>
  );
});
