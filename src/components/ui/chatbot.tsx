"use client";

import { memo, useState, useCallback, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export const Chatbot = memo(function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Xin chào! Tôi là trợ lý AI về Nhân quyền. Tôi có thể giúp gì cho bạn hôm nay?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();

      if (!inputValue.trim()) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: inputValue,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: getBotResponse(inputValue),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    },
    [inputValue]
  );

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("quyền") && lowerQuery.includes("là gì")) {
      return "Quyền con người là những quyền bẩm sinh, vốn có của con người mà không thể tước bỏ hay xâm phạm. Đây là nền tảng của tự do, công bằng và hòa bình.";
    }

    if (lowerQuery.includes("việt nam")) {
      return "Việt Nam quan niệm nhân quyền gắn liền với trách nhiệm và lợi ích cộng đồng. Nguyên tắc 'Dân biết, Dân bàn, Dân làm, Dân kiểm tra, Dân thụ hưởng' thể hiện rõ điều này.";
    }

    if (lowerQuery.includes("tố cáo") || lowerQuery.includes("kiến nghị")) {
      return "Bạn có thể tố cáo, kiến nghị qua: Đường dây nóng của cơ quan, Cổng thông tin điện tử, hoặc đến trực tiếp cơ quan có thẩm quyền. Đây là quyền của công dân theo Luật Tiếp công dân.";
    }

    if (lowerQuery.includes("tham nhũng")) {
      return "Phòng chống tham nhũng là trách nhiệm của mọi công dân. Bạn có thể báo cáo qua: Đường dây nóng 1111 của Thanh tra Chính phủ, hoặc cơ quan công an, viện kiểm sát.";
    }

    return "Cảm ơn câu hỏi của bạn! Để hiểu rõ hơn, bạn có thể xem các phần: Hành trình lịch sử, Lăng kính nhân quyền, hoặc Thực tiễn trên website này.";
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-all duration-300`}
        aria-label="Mở chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
          <div className="glass-card rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col h-[500px]">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <div>
                  <h3 className="font-bold text-sm">Trợ lý Nhân quyền</h3>
                  <p className="text-xs opacity-80">Online • AI có trách nhiệm</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Đóng chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === "user" ? "opacity-70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 px-4 py-2 border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Gửi tin nhắn"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Chatbot được training từ nguồn chính thống. Không thay thế tư vấn pháp lý.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
});
