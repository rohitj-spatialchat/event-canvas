import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Download,
  DollarSign,
  Users,
  BarChart3,
  MessageCircle,
  CalendarDays,
  Plus,
  Search,
  Clock,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import logoIcon from "@/assets/logo-icon.png";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ChatThread = { id: string; title: string; messages: ChatMessage[]; timestamp: string };

const suggestedQuestions = [
  { icon: Download, label: "Download webinar attendance report", query: "Download the attendance report for my latest webinar" },
  { icon: DollarSign, label: "Revenue collected for Tech Summit 2026", query: "What was the total revenue collected for Tech Summit 2026?" },
  { icon: Users, label: "Top engaged attendees this month", query: "Show me the top 10 most engaged attendees this month" },
  { icon: BarChart3, label: "Event performance comparison", query: "Compare performance metrics across my last 5 events" },
  { icon: MessageCircle, label: "Community engagement summary", query: "Give me a summary of community engagement for this quarter" },
  { icon: CalendarDays, label: "Upcoming event checklist", query: "Generate a pre-event checklist for my upcoming conference" },
];

const mockResponses: Record<string, string> = {
  "Download the attendance report for my latest webinar": "📊 **Webinar Attendance Report — AI Product Launch (Feb 18, 2026)**\n\n- **Registered:** 1,247\n- **Attended:** 892 (71.5% attendance rate)\n- **Avg. Watch Time:** 42 min / 60 min\n- **Peak Concurrent:** 834\n- **Drop-off Rate:** 18%\n\n🔗 [Download Full Report (CSV)](#) | [Download PDF Summary](#)\n\nTop engaged attendees have been tagged in your People dashboard for follow-up.",
  "What was the total revenue collected for Tech Summit 2026?": "💰 **Revenue Summary — Tech Summit 2026**\n\n| Ticket Type | Sold | Revenue |\n|---|---|---|\n| Early Bird | 320 | $25,600 |\n| General | 580 | $69,600 |\n| VIP | 85 | $21,250 |\n| Sponsor Passes | 12 | $36,000 |\n\n**Total Revenue: $152,450**\n**Net (after fees): $144,827**\n\n📈 That's a 23% increase over last year's summit!",
  "Show me the top 10 most engaged attendees this month": "🏆 **Top Engaged Attendees — February 2026**\n\n1. **Sarah Chen** — 98 pts (4 events, 12 posts, 8 connections)\n2. **Michael Park** — 94 pts (3 events, 15 posts, 6 connections)\n3. **Emily Rodriguez** — 91 pts (5 events, 8 posts, 10 connections)\n4. **David Kim** — 87 pts (3 events, 11 posts, 5 connections)\n5. **Lisa Wang** — 85 pts (4 events, 9 posts, 7 connections)\n6. **Thomas Müller** — 82 pts (3 events, 7 posts, 9 connections)\n7. **Aisha Patel** — 79 pts (2 events, 14 posts, 4 connections)\n8. **James Wilson** — 76 pts (3 events, 6 posts, 8 connections)\n9. **Maria Santos** — 74 pts (4 events, 5 posts, 6 connections)\n10. **Alex Thompson** — 71 pts (2 events, 10 posts, 5 connections)\n\n💡 Consider sending personalized thank-you messages to your top contributors!",
  "Compare performance metrics across my last 5 events": "📊 **Event Performance Comparison**\n\n| Event | Attendees | Engagement | Revenue | NPS |\n|---|---|---|---|---|\n| Tech Summit '26 | 985 | 87% | $152K | 72 |\n| AI Webinar Series | 892 | 79% | $18K | 68 |\n| Product Demo Day | 445 | 92% | $0 | 81 |\n| Networking Mixer | 234 | 95% | $4.7K | 85 |\n| Q4 Town Hall | 1,102 | 71% | $0 | 64 |\n\n**Key Insight:** Smaller, interactive events (Mixer, Demo Day) drive higher engagement and NPS scores despite lower attendance.",
  "Give me a summary of community engagement for this quarter": "🌐 **Community Engagement — Q1 2026**\n\n- **Active Members:** 2,847 (+18% vs Q4)\n- **New Members:** 634\n- **Total Posts:** 1,892\n- **Comments:** 5,421\n- **Avg. Daily Active:** 312\n\n**Top Groups by Activity:**\n1. AI & Machine Learning — 423 posts\n2. Product Strategy — 287 posts\n3. Growth & Marketing — 198 posts\n\n**🔥 Trending Topics:** GenAI tools, remote team culture, event ROI measurement\n\n💡 Community health score: **8.4/10** (up from 7.6 last quarter)",
  "Generate a pre-event checklist for my upcoming conference": "✅ **Pre-Event Checklist — Conference**\n\n**2 Weeks Before:**\n- [ ] Confirm all speaker slots and presentations\n- [ ] Test streaming setup and backup connections\n- [ ] Send reminder emails to all registrants\n- [ ] Finalize sponsor booth layouts\n\n**1 Week Before:**\n- [ ] Run full technical rehearsal\n- [ ] Brief all moderators and volunteers\n- [ ] Publish final agenda and speaker bios\n- [ ] Set up networking rooms in SpatialChat\n\n**Day Before:**\n- [ ] Final sound/video check\n- [ ] Confirm catering and venue logistics\n- [ ] Send \"See you tomorrow\" email with access links\n\n**Day Of:**\n- [ ] Open rooms 30 min early for tech check\n- [ ] Monitor live analytics dashboard\n- [ ] Capture attendee feedback in real-time",
};

const AIAssistant = () => {
  const [threads, setThreads] = useState<ChatThread[]>([
    { id: "1", title: "Revenue breakdown Q1", messages: [{ role: "user", content: "Revenue breakdown Q1" }, { role: "assistant", content: "Here's the Q1 revenue..." }], timestamp: "2h ago" },
    { id: "2", title: "Webinar report download", messages: [{ role: "user", content: "Download webinar report" }, { role: "assistant", content: "Here's the report..." }], timestamp: "Yesterday" },
    { id: "3", title: "Top attendees Feb", messages: [{ role: "user", content: "Top attendees" }, { role: "assistant", content: "Here are the top attendees..." }], timestamp: "3 days ago" },
  ]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleNewChat = () => {
    setActiveThreadId(null);
    setChatMessages([]);
    setChatInput("");
  };

  const handleSelectThread = (thread: ChatThread) => {
    setActiveThreadId(thread.id);
    setChatMessages(thread.messages);
  };

  const handleDeleteThread = (id: string) => {
    setThreads(prev => prev.filter(t => t.id !== id));
    if (activeThreadId === id) handleNewChat();
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: message };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput("");
    setIsTyping(true);

    const response = mockResponses[message] || `Here's what I found about "${message}":\n\nI've searched across your events, attendees, and analytics data. Based on your current data, I'd recommend checking the **Analytics** and **Revenue** dashboards for detailed breakdowns.\n\nWould you like me to pull a specific report?`;

    setTimeout(() => {
      setIsTyping(false);
      const finalMessages: ChatMessage[] = [...updatedMessages, { role: "assistant", content: response }];
      setChatMessages(finalMessages);

      if (!activeThreadId) {
        const newThread: ChatThread = {
          id: Date.now().toString(),
          title: message.slice(0, 40) + (message.length > 40 ? "..." : ""),
          messages: finalMessages,
          timestamp: "Just now",
        };
        setThreads(prev => [newThread, ...prev]);
        setActiveThreadId(newThread.id);
      } else {
        setThreads(prev => prev.map(t => t.id === activeThreadId ? { ...t, messages: finalMessages } : t));
      }
    }, 1200);
  };

  const filteredThreads = threads.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="-m-6 flex h-[calc(100vh-3.5rem)]">
      {/* Left sidebar — chat history */}
      <div className="flex w-[240px] shrink-0 flex-col border-r border-border bg-muted/30">
        <div className="p-3">
          <Button onClick={handleNewChat} variant="outline" className="w-full justify-start gap-2 text-sm">
            <Plus className="h-4 w-4" /> New chat
          </Button>
        </div>
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-0.5 py-1">
            {filteredThreads.map(thread => (
              <div
                key={thread.id}
                className={`group flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors ${
                  activeThreadId === thread.id ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => handleSelectThread(thread)}
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                <div className="flex-1 truncate">
                  <p className="truncate text-xs font-medium">{thread.title}</p>
                  <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-2.5 w-2.5" /> {thread.timestamp}
                  </p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); handleDeleteThread(thread.id); }}
                  className="hidden rounded p-0.5 text-muted-foreground hover:text-destructive group-hover:block"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border px-6 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <img src={logoIcon} alt="AI" className="h-5 w-5 brightness-0 invert" />
          </div>
          <div>
            <h1 className="text-sm font-bold">SpatialChat AI Assistant</h1>
            <p className="text-[11px] text-muted-foreground">Event knowledge base • Reports • Analytics</p>
          </div>
        </div>

        {/* Chat body */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {chatMessages.length > 0 ? (
            <ScrollArea className="flex-1 px-6 py-6">
              <div className="mx-auto max-w-2xl space-y-5">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                    {msg.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                    {msg.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="rounded-2xl bg-muted px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-5">
                <img src={logoIcon} alt="AI" className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold mb-1">What are you working on?</h2>
              <p className="text-sm text-muted-foreground mb-8">Ask about events, reports, revenue, attendees and more</p>
              <div className="grid w-full max-w-xl gap-2.5 sm:grid-cols-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q.query)}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                  >
                    <q.icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-xs font-medium">{q.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input bar */}
          <div className="border-t border-border px-6 py-4">
            <form
              onSubmit={e => { e.preventDefault(); handleSendMessage(chatInput); }}
              className="mx-auto flex max-w-2xl items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="h-11 w-full rounded-xl border border-input bg-background px-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!chatInput.trim() || isTyping}
                  className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
