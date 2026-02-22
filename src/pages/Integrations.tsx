import { useState, useRef, useEffect } from "react";
import { Search, ExternalLink, Check, Zap, Send, Bot, User, Sparkles, Download, DollarSign, Users, BarChart3, MessageCircle, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import logoIcon from "@/assets/logo-icon.png";

type Integration = {
  name: string;
  description: string;
  category: string;
  icon: string;
  connected: boolean;
  popular?: boolean;
};

const integrations: Integration[] = [
  { name: "HubSpot", description: "Sync contacts, deals, and event data with your HubSpot CRM", category: "CRM", icon: "🟠", connected: true, popular: true },
  { name: "Salesforce", description: "Push attendee data and engagement metrics to Salesforce", category: "CRM", icon: "☁️", connected: false, popular: true },
  { name: "Mailchimp", description: "Automate email campaigns and manage subscriber lists", category: "Email", icon: "🐵", connected: true },
  { name: "SendGrid", description: "Transactional emails for confirmations and reminders", category: "Email", icon: "📧", connected: false },
  { name: "Google Analytics", description: "Track event page traffic, conversions, and user behavior", category: "Analytics", icon: "📊", connected: true, popular: true },
  { name: "Mixpanel", description: "Advanced product analytics and user engagement tracking", category: "Analytics", icon: "🟣", connected: false },
  { name: "Zapier", description: "Connect 5,000+ apps with automated workflows", category: "Automation", icon: "⚡", connected: true, popular: true },
  { name: "Make", description: "Visual automation platform for complex workflows", category: "Automation", icon: "🔮", connected: false },
  { name: "Slack", description: "Get real-time notifications and manage events from Slack", category: "Communication", icon: "💬", connected: true },
  { name: "Microsoft Teams", description: "Event alerts and collaboration in Teams channels", category: "Communication", icon: "🟦", connected: false },
  { name: "Stripe", description: "Process payments, manage subscriptions, and handle refunds", category: "Payments", icon: "💳", connected: true, popular: true },
  { name: "PayPal", description: "Accept PayPal payments for event registrations", category: "Payments", icon: "🅿️", connected: false },
  { name: "Google Calendar", description: "Sync event schedules with Google Calendar", category: "Calendar", icon: "📅", connected: true },
  { name: "Outlook Calendar", description: "Sync events and send calendar invites via Outlook", category: "Calendar", icon: "📆", connected: false },
  { name: "Zoom", description: "Create and manage Zoom meetings for virtual sessions", category: "Video", icon: "🎥", connected: false, popular: true },
  { name: "Webhooks", description: "Send real-time event data to any endpoint via HTTP", category: "Developer", icon: "🔗", connected: false },
];

const categories = ["All", "CRM", "Email", "Analytics", "Automation", "Communication", "Payments", "Calendar", "Video", "Developer"];

type ChatMessage = { role: "user" | "assistant"; content: string };

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

const Integrations = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    setChatMessages(prev => [...prev, { role: "user", content: message }]);
    setChatInput("");
    setIsTyping(true);

    const response = mockResponses[message] || `Here's what I found about "${message}":\n\nI've searched across your events, attendees, and analytics data. Based on your current data, I'd recommend checking the **Analytics** and **Revenue** dashboards for detailed breakdowns. Would you like me to pull a specific report?`;

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 1200);
  };

  const filtered = integrations.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || i.category === category;
    return matchesSearch && matchesCategory;
  });

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="space-y-6">
      {/* SpatialChat AI Assistant */}
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <img src={logoIcon} alt="SpatialChat AI" className="h-6 w-6 brightness-0 invert" />
            </div>
            <div>
              <h2 className="text-sm font-bold">SpatialChat AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Your event knowledge base — ask anything about your data</p>
            </div>
            <Badge className="ml-auto border-0 bg-success/15 text-success text-[10px] font-semibold">LIVE</Badge>
          </div>

          <div className="flex flex-col" style={{ height: chatMessages.length > 0 ? "420px" : "auto" }}>
            {chatMessages.length > 0 ? (
              <ScrollArea className="flex-1 px-5 py-4">
                <div className="space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                      {msg.role === "assistant" && (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                          <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                        </div>
                      )}
                      <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}>
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      </div>
                      {msg.role === "user" && (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                      <div className="rounded-xl bg-muted px-4 py-3">
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
              <div className="px-5 py-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" /> Suggested questions
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(q.query)}
                      className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3.5 py-2.5 text-left text-xs font-medium transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                    >
                      <q.icon className="h-4 w-4 shrink-0 text-primary" />
                      <span>{q.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="border-t border-border px-5 py-3">
              <form
                onSubmit={e => { e.preventDefault(); handleSendMessage(chatInput); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask about your events, attendees, revenue..."
                  className="h-9 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <Button type="submit" size="sm" className="h-9 gap-1.5" disabled={!chatInput.trim() || isTyping}>
                  <Send className="h-3.5 w-3.5" /> Ask
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground">
            Connect your favorite tools to supercharge your events
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-sm">
            <Check className="h-3.5 w-3.5 text-success" />
            {connectedCount} Connected
          </Badge>
          <Button variant="outline" className="gap-2">
            <Zap className="h-4 w-4" /> Request Integration
          </Button>
        </div>
      </div>

      {/* Search + Categories */}
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search integrations..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(integration => (
          <Card key={integration.name} className="relative overflow-hidden transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-xl">
                    {integration.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{integration.name}</h3>
                      {integration.popular && (
                        <Badge className="bg-warning/15 text-warning text-[10px] px-1.5 py-0 font-semibold border-0">
                          POPULAR
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{integration.category}</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {integration.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                {integration.connected ? (
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-xs font-medium text-success">Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                    <span className="text-xs text-muted-foreground">Not connected</span>
                  </div>
                )}
                <Button
                  variant={integration.connected ? "outline" : "default"}
                  size="sm"
                  className="h-8 gap-1.5 text-xs"
                >
                  {integration.connected ? (
                    <>Settings <ExternalLink className="h-3 w-3" /></>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-medium">No integrations found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Integrations;
