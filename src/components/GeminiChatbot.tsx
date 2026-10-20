import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Cpu,
  Zap,
  Layers,
  ChevronDown,
  Copy,
  Check,
  Minimize2,
  Maximize2,
  Terminal,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import { soundEngine } from "../utils/audioEngine";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
  modelUsed?: string;
  roleId?: string;
}

export type ChatbotRoleId =
  | "solutions-consultant"
  | "enterprise-architect"
  | "quick-assistant";

interface RoleConfig {
  id: ChatbotRoleId;
  name: string;
  title: string;
  model: string;
  modelBadge: string;
  description: string;
  icon: LucideIcon;
  color: string;
  suggestedPrompts: string[];
}

const ROLES: RoleConfig[] = [
  {
    id: "solutions-consultant",
    name: "Solutions Consultant",
    title: "General IT Services & Kiduart ERP Advisor",
    model: "gemini-2.0-flash",
    modelBadge: "Balanced",
    description:
      "Best for general tasks, project discovery, service breakdowns, and Kiduart School ERP scoping (kiduart.com).",
    icon: Sparkles,
    color: "#E8A9C2",
    suggestedPrompts: [
      "What modules does Kiduart cover on kiduart.com (admissions to reports)?",
      "How does Trevyk approach custom software vs Kiduart product?",
      "How do I book a Kiduart demo (kiduart.com / +91 92175 34128, +91 88106 64797)?",
    ],
  },
  {
    id: "enterprise-architect",
    name: "Enterprise Architect",
    title: "High-Scale Systems & Distributed Architecture",
    model: "gemini-2.0-flash",
    modelBadge: "Deep analysis",
    description:
      "Specialized for complex architecture, modular systems design, and practical security tradeoffs.",
    icon: Cpu,
    color: "#B9A6D1",
    suggestedPrompts: [
      "How does Kiduart’s modular school journey map to real campus roles?",
      "Explain Trevyk’s Core Block modular architecture philosophy.",
      "What privacy practices does Kiduart publish for school data?",
    ],
  },
  {
    id: "quick-assistant",
    name: "Rapid Assistant",
    title: "Fast Q&A on product & process",
    model: "gemini-2.0-flash",
    modelBadge: "Quick answers",
    description:
      "Quick answers about Kiduart, delivery cadence, and privacy practices we actually ship.",
    icon: Zap,
    color: "#241428",
    suggestedPrompts: [
      "What privacy controls does Kiduart ship for school data (roles, export, encryption)?",
      "Is KIDUORBIT live yet, or still a next-phase label?",
      "Summarize Kiduart’s founding-school charter in 3 bullets.",
    ],
  },
];

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialPrompt?: string;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  isOpen,
  onClose,
  onOpen,
  initialPrompt,
}) => {
  const [selectedRole, setSelectedRole] = useState<ChatbotRoleId>(
    "solutions-consultant",
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "model",
      content:
        "Hello! I am the **Trevyk AI Solutions Consultant**. I can help with **Kiduart School ERP (kiduart.com)**, custom software engagements, delivery process, or architecture questions.\n\nHow can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      modelUsed: "gemini-2.0-flash",
      roleId: "solutions-consultant",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentRole = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

  // Auto-scroll to bottom of conversation thread
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      setInputValue(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const handleRoleChange = (newRole: ChatbotRoleId) => {
    if (newRole === selectedRole) {
      setIsRoleDropdownOpen(false);
      return;
    }
    soundEngine.playClick("soft");
    setSelectedRole(newRole);
    setIsRoleDropdownOpen(false);

    const targetConfig = ROLES.find((r) => r.id === newRole) || ROLES[0];
    const systemNotice: ChatMessage = {
      id: `role-switch-${Date.now()}`,
      role: "model",
      content: `*Switched role to **${targetConfig.name}** (${targetConfig.modelBadge}).*\n\n${targetConfig.description}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      modelUsed: targetConfig.model,
      roleId: newRole,
    };
    setMessages((prev) => [...prev, systemNotice]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    soundEngine.playClick("sharp");
    setErrorMsg(null);
    setInputValue("");

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      roleId: selectedRole,
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      // Send conversation history to backend Gemini endpoint
      const payloadMessages = updatedHistory
        .filter((m) => !m.content.startsWith("*Switched role"))
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
          roleId: selectedRole,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Server responded with status ${res.status}`,
        );
      }

      const data = await res.json();
      soundEngine.playClick("soft");

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: data.modelUsed,
        roleId: selectedRole,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error("Chat request error:", err);
      setErrorMsg(
        err.message ||
          "Unable to reach Trevyk AI right now. Please check your connection or try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    soundEngine.playClick("soft");
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        role: "model",
        content: `Conversation reset. You are now speaking with the **${currentRole.name}**. How can I help you?`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: currentRole.model,
        roleId: selectedRole,
      },
    ]);
    setErrorMsg(null);
  };

  const handleCopyMessage = (id: string, text: string) => {
    soundEngine.playClick("soft");
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  return (
    <>
      {/* 1. Floating Chatbot Launcher Button (Bottom Right) */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            id="open-gemini-chat-btn"
            onClick={() => {
              soundEngine.playClick("hero");
              onOpen();
            }}
            aria-label="Trevyk AI — Online. Ask about products and delivery"
            className="group relative flex items-center space-x-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#2A1830] via-[#1E1024] to-[#2A1830] border border-[#6B4A87]/55 hover:border-[#8558A5] shadow-[0_0_28px_rgba(107,74,135,0.40)] hover:shadow-[0_0_36px_rgba(107,74,135,0.55)] transition-all hover:scale-105 active:scale-95 cursor-pointer interactive-target text-left"
            data-cursor-label="CHAT"
          >
            {/* Glowing isometric cube badge icon */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#6B4A87] to-[#8558A5] flex items-center justify-center text-white font-bold shadow-inner">
              <Bot className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#52D172] rounded-full border-2 border-[#6B4A87] animate-pulse" />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold font-heading text-[#F8F6FB] tracking-wider uppercase">
                  Trevyk AI
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-accent bg-[#E8A9C2]/20 text-[#E8A9C2]">
                  Online
                </span>
              </div>
              <span className="text-[11px] text-[#B9A6D1] block">
                Ask about products &amp; delivery
              </span>
            </div>
          </button>
        </motion.div>
      )}

      {/* 2. Interactive Multi-Turn Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className={`fixed z-50 flex flex-col overflow-hidden bg-[#1E1024]/95 backdrop-blur-2xl border border-[#6B4A87]/60 shadow-[0_20px_60px_rgba(107,74,135,0.16),0_0_40px_rgba(107,74,135,0.3)] ${
              isExpanded
                ? "inset-3 sm:inset-6 md:inset-10 rounded-2xl sm:rounded-3xl"
                : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[460px] h-[min(600px,88vh)] max-h-[88vh] rounded-2xl sm:rounded-3xl"
            }`}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Window Header */}
            <div className="relative px-5 py-4 border-b border-[#6B4A87]/40 bg-[#2A1830]/80 flex items-center justify-between">
              {/* Role Switcher Selector */}
              <div className="relative">
                <button
                  id="chat-role-dropdown-btn"
                  onClick={() => {
                    soundEngine.playClick("soft");
                    setIsRoleDropdownOpen(!isRoleDropdownOpen);
                  }}
                  className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-[#1E1024]/80 border border-[#6B4A87]/50 hover:border-[#E8A9C2] transition-colors interactive-target text-left"
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${currentRole.color}25`,
                      color: currentRole.color,
                    }}
                  >
                    <currentRole.icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold font-heading text-[#F8F6FB]">
                        {currentRole.name}
                      </span>
                      <ChevronDown className="w-3 h-3 text-[#B9A6D1]" />
                    </div>
                    <span className="text-[10px] font-mono-accent text-[#E8A9C2] block">
                      {currentRole.modelBadge}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu for Roles */}
                <AnimatePresence>
                  {isRoleDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute top-full left-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#1E1024] border border-[#6B4A87] shadow-2xl p-2 z-50 backdrop-blur-xl"
                    >
                      <div className="px-2 py-1.5 text-[10px] font-mono-accent text-[#B9A6D1] uppercase tracking-wider border-b border-[#6B4A87]/30 mb-1">
                        Select Specialized AI Role
                      </div>
                      {ROLES.map((role) => {
                        const Icon = role.icon;
                        const isCurrent = role.id === selectedRole;
                        return (
                          <button
                            key={role.id}
                            onClick={() => handleRoleChange(role.id)}
                            className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start space-x-3 mb-1 ${
                              isCurrent
                                ? "bg-[#2A1830] border border-[#E8A9C2]/60"
                                : "hover:bg-[#2A1830]/50 border border-transparent"
                            }`}
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                              style={{
                                backgroundColor: `${role.color}20`,
                                color: role.color,
                              }}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#F8F6FB]">
                                  {role.name}
                                </span>
                                <span
                                  className="text-[9px] font-mono-accent px-1.5 py-0.5 rounded"
                                  style={{
                                    backgroundColor: `${role.color}20`,
                                    color: role.color,
                                  }}
                                >
                                  {role.modelBadge}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#B9A6D1] line-clamp-2 mt-0.5">
                                {role.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Controls (Clear, Expand, Close) */}
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handleClearHistory}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-2 rounded-xl text-[#B9A6D1] hover:text-[#F8F6FB] hover:bg-[#1E1024]/60 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    soundEngine.playClick("soft");
                    setIsExpanded(!isExpanded);
                  }}
                  title={isExpanded ? "Collapse" : "Expand"}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                  className="hidden sm:block p-2 rounded-xl text-[#B9A6D1] hover:text-[#F8F6FB] hover:bg-[#1E1024]/60 transition-colors"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  id="close-gemini-chat-btn"
                  onClick={() => {
                    soundEngine.playClick("soft");
                    onClose();
                  }}
                  aria-label="Close Chat"
                  className="p-2 rounded-xl text-[#B9A6D1] hover:text-[#E8A9C2] hover:bg-[#1E1024]/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Conversation Thread */}
            <div
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 font-body scrollbar-thin"
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center space-x-2 mb-1 px-1">
                      <span className="text-[10px] font-mono-accent text-[#B9A6D1]">
                        {isUser ? "You" : currentRole.name}
                      </span>
                      <span className="text-[9px] text-[#6B4A87]">•</span>
                      <span className="text-[10px] font-mono-accent text-[#B9A6D1]/60">
                        {message.timestamp}
                      </span>
                      {message.roleId && !isUser && (
                        <span className="text-[9px] font-mono-accent px-1.5 py-0.2 rounded bg-[#6B4A87]/30 text-[#E8A9C2]">
                          Trevyk AI
                        </span>
                      )}
                    </div>

                    <div
                      className={`relative group max-w-[90%] sm:max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? "bg-gradient-to-r from-[#6B4A87] to-[#8558A5] text-white rounded-tr-sm border border-[#6B4A87]/40"
                          : "bg-[#2A1830]/90 text-[#F8F6FB] rounded-tl-sm border border-[#6B4A87]/40 shadow-[0_4px_20px_rgba(107,74,135,0.08)]"
                      }`}
                    >
                      {/* Markdown rendered message */}
                      <div
                        className={`markdown-body prose max-w-none text-xs sm:text-sm ${isUser ? "prose-invert" : ""}`}
                      >
                        <Markdown>{message.content}</Markdown>
                      </div>

                      {/* Copy Message Action */}
                      <button
                        onClick={() =>
                          handleCopyMessage(message.id, message.content)
                        }
                        title="Copy message"
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded-md bg-[#1E1024]/80 text-[#B9A6D1] hover:text-[#E8A9C2] transition-all"
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="w-3 h-3 text-[#52D172]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start"
                >
                  <div className="flex items-center space-x-2 mb-1 px-1">
                    <span className="text-[10px] font-mono-accent text-[#6B4A87]">
                      {currentRole.name} is thinking...
                    </span>
                  </div>
                  <div className="rounded-2xl rounded-tl-sm p-4 bg-[#2A1830]/90 border border-[#6B4A87]/40 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#E8A9C2] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#B9A6D1] animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#6B4A87] animate-bounce [animation-delay:0.3s]" />
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start space-x-2">
                  <div className="mt-0.5 text-red-400">⚠️</div>
                  <div className="flex-1">
                    <p className="font-semibold">Request Error</p>
                    <p className="text-[11px] text-red-300/80 mt-0.5">
                      {errorMsg}
                    </p>
                    <button
                      onClick={() => handleSendMessage()}
                      className="mt-2 text-[11px] underline text-[#E8A9C2] hover:text-white"
                    >
                      Retry previous prompt
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Starter Prompts (if history is short) */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-[10px] font-mono-accent text-[#B9A6D1]/80 mb-1.5 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-[#E8A9C2]" />
                  <span>Suggested queries for {currentRole.name}:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentRole.suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[11px] text-left px-2.5 py-1.5 rounded-lg bg-[#2A1830] hover:bg-[#1E1024] border border-[#6B4A87]/30 hover:border-[#E8A9C2]/60 text-[#B9A6D1] transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input Form */}
            <div className="p-3 sm:p-4 border-t border-[#6B4A87]/40 bg-[#2A1830]/90">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center rounded-2xl bg-[#1E1024] border border-[#6B4A87]/50 focus-within:border-[#E8A9C2] transition-colors p-1.5"
              >
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask ${currentRole.name}... (Enter to send, Shift+Enter for newline)`}
                  rows={1}
                  className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-[#F8F6FB] placeholder-[#B9A6D1]/50 focus:outline-none resize-none max-h-32 min-h-[40px]"
                />

                <button
                  id="chat-submit-message-btn"
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#6B4A87] to-[#E8A9C2] text-[#F8F6FB] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between mt-2 px-1 text-[10px] font-mono-accent text-[#B9A6D1]/60">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-[#52D172]" />
                  <span>Private conversation · business-day follow-up</span>
                </span>
                <span>Trevyk AI · {currentRole.modelBadge}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
