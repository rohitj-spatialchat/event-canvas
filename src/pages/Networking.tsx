import { useState } from "react";
import { Shuffle, Video, Users2, MessageSquare, Sparkles, Calendar, ArrowRight, Lightbulb, Target, Handshake, Mail, Globe, Coffee, Mic, BookOpen, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const currentMatch = {
  name: "Sarah Johnson",
  initials: "SJ",
  company: "Apple",
  role: "Product Manager",
  score: 9.4,
  color: "hsl(235, 65%, 55%)",
};

const onlineMembers = [
  { name: "Sarah Johnson", initials: "SJ", company: "Apple", country: "USA", score: 9.4, role: "Product Manager", color: "hsl(235, 65%, 55%)" },
  { name: "Michael Chen", initials: "MC", company: "Microsoft", country: "USA", score: 9.2, role: "CEO", color: "hsl(152, 55%, 45%)" },
  { name: "Emily Rodriguez", initials: "ER", company: "Google", country: "USA", score: 8.5, role: "Engineering Lead", color: "hsl(235, 65%, 55%)" },
  { name: "Lisa Anderson", initials: "LA", company: "JPMorgan Chase", country: "UK", score: 8.0, role: "Marketing Director", color: "hsl(0, 72%, 55%)" },
  { name: "Aisha Patel", initials: "AP", company: "UnitedHealth Group", country: "Canada", score: 7.8, role: "Chief Data Officer", color: "hsl(195, 65%, 45%)" },
  { name: "David Kim", initials: "DK", company: "Amazon", country: "USA", score: 7.5, role: "Director of Sales", color: "hsl(38, 92%, 50%)" },
  { name: "Thomas Martinez", initials: "TM", company: "Meta", country: "USA", score: 7.2, role: "Head of Digital", color: "hsl(38, 92%, 50%)" },
];

const preEventTips = [
  {
    icon: Target,
    title: "Set Your Networking Goals",
    description: "Define what you want to achieve — partnerships, hiring, mentorship, or knowledge sharing.",
    action: "Create Goals",
  },
  {
    icon: BookOpen,
    title: "Review Attendee Profiles",
    description: "Browse the attendee list and identify key people you'd like to meet before the event starts.",
    action: "Browse Attendees",
  },
  {
    icon: Mail,
    title: "Send Intro Messages",
    description: "Break the ice by sending personalized introduction messages to your top matches.",
    action: "Start Messaging",
  },
  {
    icon: Calendar,
    title: "Schedule 1:1 Meetings",
    description: "Book dedicated time slots with high-priority contacts to ensure you connect.",
    action: "Schedule Meeting",
  },
  {
    icon: Sparkles,
    title: "AI Match Suggestions",
    description: "Let our AI analyze your profile and suggest the best networking matches based on shared interests.",
    action: "Get Suggestions",
  },
];

const postEventTips = [
  {
    icon: Handshake,
    title: "Follow Up Within 24 Hours",
    description: "Send a personalized follow-up message referencing your conversation to stay memorable.",
    action: "Draft Follow-ups",
  },
  {
    icon: Globe,
    title: "Connect on LinkedIn",
    description: "Solidify your new connections by connecting on professional networks and social platforms.",
    action: "Sync Contacts",
  },
  {
    icon: Coffee,
    title: "Schedule Follow-up Calls",
    description: "Turn event conversations into lasting relationships with dedicated follow-up meetings.",
    action: "Book Calls",
  },
  {
    icon: Star,
    title: "Rate Your Connections",
    description: "Prioritize follow-ups by rating connection quality and potential collaboration opportunities.",
    action: "Rate Connections",
  },
  {
    icon: Mic,
    title: "Share Event Insights",
    description: "Post key takeaways from your conversations to spark further discussion with your network.",
    action: "Share Insights",
  },
];

const Networking = () => {
  const [activeTab, setActiveTab] = useState<"room" | "pre" | "post">("room");

  const scoreColor = (score: number) => {
    if (score >= 9) return "bg-success text-success-foreground";
    if (score >= 8) return "bg-primary text-primary-foreground";
    return "bg-warning text-warning-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Speed Networking</h1>
        <p className="text-sm text-muted-foreground">Connect with community members for quick, meaningful conversations</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit">
        {([
          { key: "room" as const, label: "Networking Room", icon: Users2 },
          { key: "pre" as const, label: "Pre-Event Tips", icon: Lightbulb },
          { key: "post" as const, label: "Post-Event Tips", icon: Handshake },
        ]).map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Networking Room Tab */}
      {activeTab === "room" && (
        <div className="space-y-6">
          {/* Current Match Card */}
          <Card>
            <CardContent className="flex flex-col items-center py-10 px-6">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white ring-4 ring-border shadow-lg"
                style={{ backgroundColor: currentMatch.color }}
              >
                {currentMatch.initials}
              </div>
              <h2 className="mt-4 text-xl font-bold">{currentMatch.name}</h2>
              <p className="text-sm text-primary font-medium">{currentMatch.company}</p>
              <p className="text-sm text-muted-foreground">{currentMatch.role}</p>

              <div className="mt-6 flex items-center gap-3">
                <Button className="gap-2 px-6">
                  <Shuffle className="h-4 w-4" /> Shuffle & Match
                </Button>
                <Button variant="outline" className="gap-2 px-6">
                  <Video className="h-4 w-4" /> Connect
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Online Now Table */}
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <Users2 className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-base font-semibold">Online Now</h3>
                </div>
                <span className="text-sm text-muted-foreground">{onlineMembers.length} members</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-border text-left text-xs font-medium uppercase text-muted-foreground">
                      <th className="p-3 pl-6">Name</th>
                      <th className="p-3">Company</th>
                      <th className="p-3">Country</th>
                      <th className="p-3">Score</th>
                      <th className="p-3">Role</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {onlineMembers.map((member, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="p-3 pl-6">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div
                                className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white"
                                style={{ backgroundColor: member.color }}
                              >
                                {member.initials}
                              </div>
                              <span className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-background bg-success" />
                            </div>
                            <span className="text-sm font-medium">{member.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{member.company}</td>
                        <td className="p-3 text-sm text-muted-foreground">{member.country}</td>
                        <td className="p-3">
                          <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${scoreColor(member.score)}`}>
                            {member.score}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{member.role}</td>
                        <td className="p-3 pr-6">
                          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                            <Video className="h-3 w-3" /> Connect
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pre-Event Tips Tab */}
      {activeTab === "pre" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
                <Lightbulb className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Maximize Your Networking Before the Event</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Research shows that attendees who prepare before an event make 3x more meaningful connections. Use these strategies to hit the ground running.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {preEventTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <Card key={i} className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-sm font-semibold">{tip.title}</h4>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                    <Button variant="outline" size="sm" className="mt-4 gap-1.5 text-xs w-full">
                      {tip.action} <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Suggested Matches */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold">AI-Suggested Matches for You</h3>
                <Badge className="bg-primary/10 text-primary text-[10px] ml-1">Beta</Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {onlineMembers.slice(0, 3).map((m, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{m.name}</p>
                      <p className="text-[11px] text-primary font-medium">{m.company}</p>
                      <p className="text-[11px] text-muted-foreground">{m.role}</p>
                    </div>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${scoreColor(m.score)}`}>
                      {m.score}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Post-Event Tips Tab */}
      {activeTab === "post" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-success/20 bg-success/5 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success">
                <Handshake className="h-5 w-5 text-success-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Turn Connections Into Relationships</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  80% of networking value is realized after the event. Follow these steps to nurture your new connections and build lasting professional relationships.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {postEventTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <Card key={i} className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 mb-3 group-hover:bg-success/20 transition-colors">
                      <Icon className="h-5 w-5 text-success" />
                    </div>
                    <h4 className="text-sm font-semibold">{tip.title}</h4>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                    <Button variant="outline" size="sm" className="mt-4 gap-1.5 text-xs w-full">
                      {tip.action} <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Connections to Follow Up */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-success" />
                <h3 className="text-base font-semibold">Connections to Follow Up</h3>
                <Badge variant="outline" className="text-[10px] ml-1">5 pending</Badge>
              </div>
              <div className="space-y-2">
                {onlineMembers.slice(0, 5).map((m, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: m.color }}
                      >
                        {m.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-[11px] text-muted-foreground">{m.company} • {m.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] border-warning text-warning">Pending</Badge>
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <Mail className="h-3 w-3" /> Follow Up
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Networking;
