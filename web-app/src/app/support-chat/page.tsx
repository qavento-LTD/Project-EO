"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
};

export default function SupportChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "مرحباً بك! أنا المساعد الذكي لمتجر هديتي. كيف يمكنني مساعدتك اليوم؟", sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText("");

    // Simulate Bot Response
    setTimeout(() => {
      const botResponses = [
        "شكراً لتواصلك معنا. سيقوم أحد موظفي خدمة العملاء بالرد عليك قريباً.",
        "يمكنك تتبع طلبك من خلال صفحة 'تتبع الطلب' في القائمة العلوية.",
        "نحن نوفر خيارات دفع متعددة بما في ذلك الدفع عند الاستلام.",
        "جميع منتجاتنا أصلية 100% ومغلفة بعناية.",
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden max-w-4xl mx-auto w-full">
        {/* Chat Header */}
        <div className="bg-[var(--color-secondary)] p-4 text-white flex items-center gap-4">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <i className="fas fa-robot text-xl"></i>
          </div>
          <div>
            <h2 className="font-bold text-lg">المساعد الذكي</h2>
            <p className="text-sm opacity-80 text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> متصل الآن
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.sender === "user" 
                  ? "bg-[var(--color-primary)] text-white rounded-br-none" 
                  : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-white/70" : "text-gray-400"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Create Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              placeholder="اكتب رسالتك هنا..." 
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button 
              type="submit" 
              className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all shadow-md transform hover:scale-105"
              disabled={!inputText.trim()}
            >
              <i className="fas fa-paper-plane rtl:rotate-180"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
