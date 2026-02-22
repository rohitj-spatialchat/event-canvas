import { useState } from "react";
import { Shuffle, Video, Users2, MessageSquare, Sparkles, Calendar, ArrowRight, Lightbulb, Target, Handshake, Mail, Globe, Coffee, Mic, BookOpen, Star, Linkedin, MapPin, ExternalLink, Search, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarMichael from "@/assets/avatar-michael.jpg";
import avatarEmily from "@/assets/avatar-emily.jpg";
import avatarLisa from "@/assets/avatar-lisa.jpg";
import avatarAisha from "@/assets/avatar-aisha.jpg";
import avatarDavid from "@/assets/avatar-david.jpg";
import avatarThomas from "@/assets/avatar-thomas.jpg";

interface Member {
  name: string;
  initials: string;
  company: string;
  country: string;
  score: number;
  role: string;
  color: string;
  avatar: string;
  linkedin: string;
  bio: string;
  interests: string[];
  location: string;
  mutualConnections: number;
}

const onlineMembers: Member[] = [
  { name: "Sarah Johnson", initials: "SJ", company: "Apple", country: "USA", score: 9.4, role: "Product Manager", color: "hsl(235, 65%, 55%)", avatar: avatarSarah, linkedin: "linkedin.com/in/sarahjohnson", bio: "Leading product strategy for developer tools at Apple. Passionate about building products that delight users.", interests: ["Product Strategy", "AI/ML", "Developer Tools"], location: "San Francisco, CA", mutualConnections: 12 },
  { name: "Michael Chen", initials: "MC", company: "Microsoft", country: "USA", score: 9.2, role: "CEO", color: "hsl(152, 55%, 45%)", avatar: avatarMichael, linkedin: "linkedin.com/in/michaelchen", bio: "Serial entrepreneur turned CEO. Building the future of enterprise collaboration at scale.", interests: ["Enterprise SaaS", "Leadership", "Fundraising"], location: "New York, NY", mutualConnections: 8 },
  { name: "Emily Rodriguez", initials: "ER", company: "Google", country: "USA", score: 8.5, role: "Engineering Lead", color: "hsl(235, 65%, 55%)", avatar: avatarEmily, linkedin: "linkedin.com/in/emilyrodriguez", bio: "Engineering lead building next-gen search infrastructure. 10+ years in distributed systems.", interests: ["Distributed Systems", "Cloud Architecture", "Mentorship"], location: "Austin, TX", mutualConnections: 5 },
  { name: "Lisa Anderson", initials: "LA", company: "JPMorgan Chase", country: "UK", score: 8.0, role: "Marketing Director", color: "hsl(0, 72%, 55%)", avatar: avatarLisa, linkedin: "linkedin.com/in/lisaanderson", bio: "Driving global marketing campaigns for enterprise fintech. Event marketing enthusiast.", interests: ["Event Marketing", "Fintech", "Brand Strategy"], location: "London, UK", mutualConnections: 15 },
  { name: "Aisha Patel", initials: "AP", company: "UnitedHealth Group", country: "Canada", score: 7.8, role: "Chief Data Officer", color: "hsl(195, 65%, 45%)", avatar: avatarAisha, linkedin: "linkedin.com/in/aishapatel", bio: "Transforming healthcare through data-driven insights. Former Google Health researcher.", interests: ["Healthcare AI", "Data Ethics", "Public Health"], location: "Toronto, CA", mutualConnections: 3 },
  { name: "David Kim", initials: "DK", company: "Amazon", country: "USA", score: 7.5, role: "Director of Sales", color: "hsl(38, 92%, 50%)", avatar: avatarDavid, linkedin: "linkedin.com/in/davidkim", bio: "Scaling enterprise sales teams across APAC. Believer in consultative selling and customer success.", interests: ["Enterprise Sales", "Customer Success", "APAC Markets"], location: "Chicago, IL", mutualConnections: 7 },
  { name: "Thomas Martinez", initials: "TM", company: "Meta", country: "USA", score: 7.2, role: "Head of Digital", color: "hsl(38, 92%, 50%)", avatar: avatarThomas, linkedin: "linkedin.com/in/thomasmartinez", bio: "Leading digital transformation for retail partnerships at Meta. Speaker & community builder.", interests: ["Digital Transformation", "Retail Tech", "Community"], location: "Miami, FL", mutualConnections: 10 },
];

const preEventTips = [
  { icon: Target, title: "Set Your Networking Goals", description: "Define what you want to achieve — partnerships, hiring, mentorship, or knowledge sharing.", action: "Create Goals" },
  { icon: BookOpen, title: "Review Attendee Profiles", description: "Browse the attendee list and identify key people you'd like to meet before the event starts.", action: "Browse Attendees" },
  { icon: Mail, title: "Send Intro Messages", description: "Break the ice by sending personalized introduction messages to your top matches.", action: "Start Messaging" },
  { icon: Calendar, title: "Schedule 1:1 Meetings", description: "Book dedicated time slots with high-priority contacts to ensure you connect.", action: "Schedule Meeting" },
  { icon: Sparkles, title: "AI Match Suggestions", description: "Let our AI analyze your profile and suggest the best networking matches based on shared interests.", action: "Get Suggestions" },
];

const postEventTips = [
  { icon: Handshake, title: "Follow Up Within 24 Hours", description: "Send a personalized follow-up message referencing your conversation to stay memorable.", action: "Draft Follow-ups" },
  { icon: Globe, title: "Connect on LinkedIn", description: "Solidify your new connections by connecting on professional networks and social platforms.", action: "Sync Contacts" },
  { icon: Coffee, title: "Schedule Follow-up Calls", description: "Turn event conversations into lasting relationships with dedicated follow-up meetings.", action: "Book Calls" },
  { icon: Star, title: "Rate Your Connections", description: "Prioritize follow-ups by rating connection quality and potential collaboration opportunities.", action: "Rate Connections" },
  { icon: Mic, title: "Share Event Insights", description: "Post key takeaways from your conversations to spark further discussion with your network.", action: "Share Insights" },
];

const Networking = () => {
  const [activeTab, setActiveTab] = useState<"room" | "pre" | "post">("room");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [matchIndex, setMatchIndex] = useState(0);
  const [search, setSearch] = useState("");

  const currentMatch = onlineMembers[matchIndex];

  const shuffleMatch = () => {
    setMatchIndex((prev) => (prev + 1) % onlineMembers.length);
  };

  const scoreColor = (score: number) => {
    if (score >= 9) return "bg-success text-success-foreground";
    if (score >= 8) return "bg-primary text-primary-foreground";
    return "bg-warning text-warning-foreground";
  };

  const filteredMembers = onlineMembers.filter(m =>
    search === "" || m.name.toLowerCase().includes(search.toLowerCase()) || m.company.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* ====== NETWORKING ROOM ====== */}
      {activeTab === "room" && (
        <div className="space-y-6">
          {/* Current Match Card */}
          <Card>
            <CardContent className="flex flex-col items-center py-10 px-6">
              <div className="relative">
                <img
                  src={currentMatch.avatar}
                  alt={currentMatch.name}
                  className="h-28 w-28 rounded-full object-cover ring-4 ring-border shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-background bg-success" />
              </div>
              <h2 className="mt-4 text-xl font-bold">{currentMatch.name}</h2>
              <a href={`https://${currentMatch.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                {currentMatch.company}
              </a>
              <p className="text-sm text-muted-foreground">{currentMatch.role}</p>
              <p className="mt-2 max-w-md text-center text-xs text-muted-foreground leading-relaxed">{currentMatch.bio}</p>
              <div className="mt-3 flex items-center gap-1.5 flex-wrap justify-center">
                {currentMatch.interests.map(tag => (
                  <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                ))}
              </div>
              <a
                href={`https://${currentMatch.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
              >
                <Linkedin className="h-3.5 w-3.5" /> View LinkedIn Profile
              </a>

              <div className="mt-6 flex items-center gap-3">
                <Button className="gap-2 px-6" onClick={shuffleMatch}>
                  <Shuffle className="h-4 w-4" /> Shuffle & Match
                </Button>
                <Button variant="outline" className="gap-2 px-6">
                  <Video className="h-4 w-4" /> Connect
                </Button>
                <Button variant="outline" className="gap-2 px-6">
                  <Send className="h-4 w-4" /> Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members by name, company, or role..."
              className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>

          {/* Online Now — Guest Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users2 className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-base font-semibold">Online Now</h3>
              </div>
              <span className="text-sm text-muted-foreground">{filteredMembers.length} members</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredMembers.map((member, i) => (
                <Card key={i} className="group hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedMember(member)}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-14 w-14 rounded-full object-cover ring-2 ring-border"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-success" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold truncate">{member.name}</h4>
                          <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold shrink-0 ${scoreColor(member.score)}`}>
                            {member.score}
                          </span>
                        </div>
                        <p className="text-xs text-primary font-medium">{member.company}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[11px] text-muted-foreground">{member.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">{member.bio}</p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {member.interests.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[9px] px-1.5 py-0">{tag}</Badge>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <a
                        href={`https://${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-primary hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="h-3 w-3" /> LinkedIn
                      </a>
                      <span className="text-[10px] text-muted-foreground">{member.mutualConnections} mutual</span>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="flex-1 gap-1.5 text-xs h-8" onClick={(e) => { e.stopPropagation(); }}>
                        <Video className="h-3 w-3" /> Connect
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs h-8" onClick={(e) => { e.stopPropagation(); }}>
                        <Send className="h-3 w-3" /> Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====== PRE-EVENT TIPS ====== */}
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
                    <img src={m.avatar} alt={m.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-border" />
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

      {/* ====== POST-EVENT TIPS ====== */}
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

          {/* Connections to Follow Up */}
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
                      <img src={m.avatar} alt={m.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-border" />
                      <div>
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-[11px] text-muted-foreground">{m.company} • {m.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={`https://${m.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                        <Linkedin className="h-4 w-4" />
                      </a>
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

      {/* ====== MEMBER PROFILE DRAWER ====== */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedMember(null)} />
          <div className="relative z-10 w-full max-w-md bg-background shadow-2xl border-l overflow-y-auto animate-in slide-in-from-right-full duration-300">
            {/* Header */}
            <div className="relative">
              <div className="h-28 bg-gradient-to-r from-primary/20 to-primary/5" />
              <button onClick={() => setSelectedMember(null)} className="absolute top-3 right-3 p-2 rounded-md bg-background/80 hover:bg-muted backdrop-blur-sm">
                <span className="sr-only">Close</span>✕
              </button>
              <div className="px-6 -mt-14">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-background shadow-lg"
                />
              </div>
            </div>

            <div className="px-6 pt-3 pb-6 space-y-5">
              <div>
                <h2 className="text-xl font-bold">{selectedMember.name}</h2>
                <p className="text-sm text-primary font-medium">{selectedMember.company}</p>
                <p className="text-sm text-muted-foreground">{selectedMember.role}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{selectedMember.location}</span>
                </div>
              </div>

              {/* Match Score */}
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${scoreColor(selectedMember.score)}`}>
                  {selectedMember.score}
                </span>
                <div>
                  <p className="text-xs font-semibold">Match Score</p>
                  <p className="text-[11px] text-muted-foreground">{selectedMember.mutualConnections} mutual connections</p>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5">About</h3>
                <p className="text-sm text-foreground leading-relaxed">{selectedMember.bio}</p>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5">Interests</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.interests.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* LinkedIn */}
              <a
                href={`https://${selectedMember.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">LinkedIn Profile</p>
                  <p className="text-[11px] text-muted-foreground">{selectedMember.linkedin}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Video className="h-4 w-4" /> Video Call
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Send className="h-4 w-4" /> Message
                </Button>
              </div>
              <Button variant="outline" className="w-full gap-2">
                <Calendar className="h-4 w-4" /> Schedule a Meeting
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Networking;
