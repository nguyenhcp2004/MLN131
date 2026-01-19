"use client";

import { Award, ChevronRight } from "lucide-react";
import { memo, useState, useCallback, useMemo } from "react";

interface QuizOption {
  id: number;
  text: string;
  correct: boolean;
  explanation: string;
}

interface Quiz {
  id: number;
  question: string;
  scenario: string;
  options: QuizOption[];
}

interface QuizSectionProps {
  quizzes: Quiz[];
}

export const QuizSection = memo(function QuizSection({
  quizzes,
}: QuizSectionProps) {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizAnswer = useCallback(
    (optionId: number) => {
      setSelectedAnswer(optionId);
      const selectedOption = quizzes[currentQuiz].options.find((opt) => opt.id === optionId);

      if (selectedOption?.correct) {
        setQuizScore((prev) => prev + 1);
      }
      setShowResult(true);
    },
    [currentQuiz, quizzes]
  );

  const handleNextQuiz = useCallback(() => {
    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [currentQuiz, quizzes.length]);

  const handleResetQuiz = useCallback(() => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizScore(0);
  }, []);

  const getResultMessage = useMemo(() => {
    if (quizScore === quizzes.length) {
      return "Xuất sắc! Bạn đã nắm vững kiến thức về nhân quyền.";
    }
    if (quizScore >= quizzes.length / 2) {
      return "Khá tốt! Hãy tiếp tục tìm hiểu thêm về nhân quyền.";
    }
    return "Hãy đọc lại các nội dung để hiểu rõ hơn về nhân quyền.";
  }, [quizScore, quizzes.length]);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Award className="h-4 w-4" />
            Phần 4
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4">
            Thách thức & Hành động
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kiểm tra kiến thức của bạn qua các tình huống thực tế
          </p>
        </div>

        {/* Quiz Card */}
        <div className="glass-card p-8 rounded-3xl">
          {currentQuiz < quizzes.length ? (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-sm text-muted-foreground">
                  Câu hỏi <span className="font-bold text-primary">{currentQuiz + 1}</span> /{" "}
                  {quizzes.length}
                </div>
                <div className="flex gap-2">
                  {quizzes.map((_, index) => (
                    <div
                      key={index}
                      className={`w-8 h-2 rounded-full ${
                        index <= currentQuiz ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className="bg-secondary/50 p-6 rounded-2xl mb-6">
                <h3 className="text-xl font-heading font-bold mb-3">
                  {quizzes[currentQuiz].question}
                </h3>
                <p className="text-sm text-muted-foreground">
                  📋 {quizzes[currentQuiz].scenario}
                </p>
              </div>

              {/* Options */}
              {!showResult ? (
                <div className="space-y-3">
                  {quizzes[currentQuiz].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleQuizAnswer(option.id)}
                      className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full border-2 border-primary flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {quizzes[currentQuiz].options.map((option) => {
                    const isSelected = selectedAnswer === option.id;
                    return (
                      <div
                        key={option.id}
                        className={`p-4 rounded-xl border-2 ${
                          option.correct
                            ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                            : isSelected
                            ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                            : "border-border bg-muted/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {option.correct && <div className="text-green-600">✓</div>}
                          {!option.correct && isSelected && (
                            <div className="text-red-600">✗</div>
                          )}
                          <span className="font-medium">{option.text}</span>
                        </div>
                        {(option.correct || isSelected) && (
                          <p className="text-sm text-muted-foreground mt-2 pl-6">
                            {option.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={handleNextQuiz}
                    className="w-full mt-6 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {currentQuiz < quizzes.length - 1 ? (
                      <>
                        Câu hỏi tiếp theo
                        <ChevronRight className="h-5 w-5" />
                      </>
                    ) : (
                      "Xem kết quả"
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results */
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
                <Award className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4">Hoàn thành thử thách!</h3>
              <div className="text-6xl font-bold text-primary mb-4">
                {quizScore}/{quizzes.length}
              </div>
              <p className="text-lg text-muted-foreground mb-8">{getResultMessage}</p>
              <button
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all duration-200"
              >
                Làm lại thử thách
                <Award className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
