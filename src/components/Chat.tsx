import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, User, Bot, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "undefined" || apiKey === "MY_GEMINI_API_KEY") {
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Olá! Sou o assistente do Ivaldo. Como posso te ajudar hoje?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    const ai = getAI();
    if (!ai) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          role: "bot", 
          text: "O assistente de IA está temporariamente indisponível. Para ativá-lo, é necessário configurar a GEMINI_API_KEY no ambiente." 
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await ai.models.generateContent({ 
        model: "gemini-3-flash-preview",
        contents: [
            ...messages.map(m => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.text }] })),
            { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: "Você é o assistente virtual do portfólio de Ivaldo Pontes Figueiredo. Ivaldo é um desenvolvedor front-end de São Luís, Maranhão, especializado em HTML5, CSS3, JavaScript, WordPress e Elementor. Ele utiliza ferramentas de IA para otimizar seu fluxo de trabalho. Responda de forma profissional, criativa e muito concisa em português. IMPORTANTE: Use quebras de linha duplas entre parágrafos. Se a resposta for longa, separe em ideias distintas. Seus links principais são github.com/Ivaldo44, x.com/IvaldoF77627, linkedin.com/in/ivaldo-figueiredo/ e seu e-mail é ivaldopfg@gmail.com.",
        }
      });

      const fullResponse = response.text || "";
      
      // Split by double line breaks or bullets to create multiple messages
      const messageParts = fullResponse
        .split(/\n\n+/)
        .map(part => part.trim())
        .filter(part => part.length > 0);

      for (let i = 0; i < messageParts.length; i++) {
        if (i > 0) {
          setIsLoading(true);
          // Add a small artificial delay between messages
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        setMessages((prev) => [...prev, { role: "bot", text: messageParts[i] }]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro no Chat:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Ocorreu um erro na conexão. Tente novamente mais tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.div
        className="fixed bottom-6 right-6 z-[90] flex items-center gap-3"
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="bg-accent text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl hidden md:block"
        >
          Precisa de ajuda?
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-accent text-black rounded-full shadow-2xl flex items-center justify-center glass border-none relative group"
        >
          <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20 group-hover:block hidden" />
          <MessageSquare size={24} />
        </motion.button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[500px] bg-black/90 rounded-[2.5rem] flex flex-col z-[100] border border-accent/20 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-accent/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-black">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-white">Ivaldo Bot</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-void/50">
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-[11px] leading-relaxed font-medium tracking-wide ${m.role === "user" ? "bg-accent text-black rounded-tr-none uppercase" : "bg-white/5 border border-white/10 text-white rounded-tl-none whitespace-pre-wrap"}`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={16} className="text-accent animate-spin" />
                    <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Digitando...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-void/80">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="DIGITE SUA MENSAGEM..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white uppercase tracking-widest focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-12 h-12 bg-accent text-black rounded-xl flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
