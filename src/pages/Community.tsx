import { useState } from "react";
import {
  Rss, Megaphone, Send, Users2, Globe, Sparkles, Trophy, Flame, ChevronLeft, ChevronRight,
  Heart, MessageCircle, Share2, Bookmark, PenLine, TrendingUp, ArrowUp, Star, Mail, Settings, Search, Bell
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import bannerImg from "@/assets/community-banner.jpg";
import featured1 from "@/assets/community-featured1.jpg";
import featured2 from "@/assets/community-featured2.jpg";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarMichael from "@/assets/avatar-michael.jpg";
import avatarEmily from "@/assets/avatar-emily.jpg";
import avatarLisa from "@/assets/avatar-lisa.jpg";
import avatarAisha from "@/assets/avatar-aisha.jpg";
import avatarDavid from "@/assets/avatar-david.jpg";
import avatarThomas from "@/assets/avatar-thomas.jpg";

const sidebarGroups = [
  { icon: Sparkles, label: "AI & Machine Learning" },
  { icon: Globe, label: "Product Strategy" },
  { icon: TrendingUp, label: "Growth & Marketing" },
  { icon: Users2, label: "Engineering" },
  { icon: Star, label: "Leadership" },
  { icon: Flame, label: "Startups & VC" },
];

const spatialRooms = [
  { icon: Globe, label: "North America" },
  { icon: Globe, label: "Europe" },
  { icon: Globe, label: "Asia Pacific" },
  { icon: Globe, label: "Latin America" },
  { icon: Globe, label: "Middle East & Africa" },
];

const feedFilters = ["Recent", "Top Posts", "Trending", "Following"];

const featuredPosts = [
  { image: featured1, title: "Customer Success Summit 2026 – Key Takeaways" },
  { image: featured2, title: "Our Community Just Hit 10,000 Members!" },
];

const feedPosts = [
  {
    author: "Sarah Johnson", avatar: avatarSarah, company: "Apple", time: "2 hours ago",
    content: "Just wrapped up an incredible session at the Product Launch Webinar! The AI networking feature matched me with exactly the right people. Who else connected with their perfect match today? 🚀",
    likes: 42, comments: 12, shares: 5, tags: ["Product Launch", "Networking"],
  },
  {
    author: "Michael Chen", avatar: avatarMichael, company: "Microsoft", time: "4 hours ago",
    content: "Excited to announce that our team is sponsoring the upcoming Customer Success Summit! Looking forward to meeting everyone in the community. Drop a comment if you'll be there 👇",
    likes: 89, comments: 34, shares: 15, tags: ["Sponsor", "Customer Success"],
  },
  {
    author: "Emily Rodriguez", avatar: avatarEmily, company: "Google", time: "6 hours ago",
    content: "Great discussion in the Engineering group about scaling event infrastructure. Shared our approach to handling 100K concurrent attendees — check the thread for the full breakdown.",
    likes: 67, comments: 28, shares: 8, tags: ["Engineering", "Scale"],
  },
  {
    author: "Lisa Anderson", avatar: avatarLisa, company: "JPMorgan Chase", time: "1 day ago",
    content: "The post-event follow-up feature is a game changer. I've already scheduled 5 follow-up calls from connections I made at the Tech Talk. What's your follow-up strategy?",
    likes: 31, comments: 16, shares: 3, tags: ["Networking", "Follow-up"],
  },
];

const leaderboard = [
  { name: "Sarah Johnson", avatar: avatarSarah, points: 2480 },
  { name: "Michael Chen", avatar: avatarMichael, points: 2120 },
  { name: "Emily Rodriguez", avatar: avatarEmily, points: 1890 },
  { name: "Lisa Anderson", avatar: avatarLisa, points: 1240 },
  { name: "Aisha Patel", avatar: avatarAisha, points: 1100 },
];

const onlineAvatars = [avatarSarah, avatarMichael, avatarEmily, avatarLisa, avatarAisha, avatarDavid, avatarThomas];

const Community = () => {
  const [activeNav, setActiveNav] = useState("Home");
  const [activeFeedFilter, setActiveFeedFilter] = useState("Recent");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [activeSidebarSection, setActiveSidebarSection] = useState("Feed");

  const sidebarNav = [
    { icon: Rss, label: "Feed" },
    { icon: Megaphone, label: "Announcements" },
    { icon: Send, label: "Direct Messages" },
  ];

  return (
    <div className="space-y-0">
      {/* Top Community Nav */}
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">SC</div>
            <span className="text-sm font-semibold">SpatialChat Community</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {["Home", "Events", "Knowledge Hub", "Members", "Leaderboard", "Networking"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveNav(tab)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  activeNav === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-muted text-muted-foreground"><Search className="h-4 w-4" /></button>
          <button className="relative p-2 rounded-md hover:bg-muted text-muted-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">RK</div>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid gap-6 lg:grid-cols-[200px_1fr_280px]">
        {/* ===== LEFT SIDEBAR ===== */}
        <div className="space-y-6 hidden lg:block">
          <div className="space-y-0.5">
            {sidebarNav.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActiveSidebarSection(item.label)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    activeSidebarSection === item.label
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Groups */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1.5">
                <Users2 className="h-3.5 w-3.5" /> Groups
              </span>
            </div>
            <div className="space-y-0.5">
              {sidebarGroups.map((g, i) => {
                const Icon = g.icon;
                return (
                  <button key={i} className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spatial Rooms */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" /> Spatial Room
              </span>
            </div>
            <div className="space-y-0.5">
              {spatialRooms.map((r, i) => {
                const Icon = r.icon;
                return (
                  <button key={i} className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Auto-invite info */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-semibold text-primary">Auto-Invite</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              New event attendees are automatically invited to this community after their event ends.
            </p>
          </div>
        </div>

        {/* ===== MAIN FEED ===== */}
        <div className="space-y-5">
          {/* Banner */}
          <div className="relative rounded-xl overflow-hidden h-44">
            <img src={bannerImg} alt="Community Banner" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-end p-6">
              <h2 className="text-xl font-bold text-white">Welcome to the SpatialChat Community</h2>
            </div>
          </div>

          {/* Live Event Banner */}
          <Card className="border-destructive/30">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive" />
                </span>
                <div>
                  <Badge className="bg-destructive text-destructive-foreground text-[10px]">LIVE NOW</Badge>
                  <p className="text-sm font-semibold mt-0.5">Customer Success Summit 2026</p>
                  <p className="text-xs text-muted-foreground">12 participants • Started 15 min ago</p>
                </div>
              </div>
              <Button className="gap-1.5">Join Now</Button>
            </CardContent>
          </Card>

          {/* Featured Posts Carousel */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">Featured Posts</h3>
              <div className="flex items-center gap-1">
                <button onClick={() => setFeaturedIndex(Math.max(0, featuredIndex - 1))} className="p-1 rounded hover:bg-muted text-muted-foreground"><ChevronLeft className="h-4 w-4" /></button>
                <button onClick={() => setFeaturedIndex(Math.min(featuredPosts.length - 1, featuredIndex + 1))} className="p-1 rounded hover:bg-muted text-muted-foreground"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-56 cursor-pointer group">
              <img src={featuredPosts[featuredIndex].image} alt="Featured" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                <p className="text-base font-semibold text-white">{featuredPosts[featuredIndex].title}</p>
              </div>
            </div>
            <div className="flex justify-center gap-1.5 mt-3">
              {featuredPosts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeaturedIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === featuredIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"}`}
                />
              ))}
            </div>
          </div>

          {/* Post Composer */}
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">RK</div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="h-10 w-full rounded-full border border-input bg-muted/30 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <PenLine className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Feed Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {feedFilters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFeedFilter(f)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeFeedFilter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Feed Posts */}
          <div className="space-y-4">
            {feedPosts.map((post, i) => (
              <Card key={i} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <img src={post.avatar} alt={post.author} className="h-10 w-10 rounded-full object-cover ring-2 ring-border shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{post.author}</span>
                        <span className="text-xs text-primary font-medium">{post.company}</span>
                        <span className="text-[10px] text-muted-foreground">• {post.time}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed">{post.content}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center gap-5 pt-3 border-t border-border">
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
                          <Heart className="h-3.5 w-3.5" /> {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <Share2 className="h-3.5 w-3.5" /> {post.shares}
                        </button>
                        <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
                          <Bookmark className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ===== RIGHT SIDEBAR ===== */}
        <div className="space-y-4 hidden lg:block">
          {/* Karma */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-warning" />
                <span className="text-xs font-semibold text-muted-foreground">Your Karma</span>
              </div>
              <p className="text-3xl font-bold">1,240</p>
              <p className="text-xs text-success font-medium">+65 this week</p>
            </CardContent>
          </Card>

          {/* Rank */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground">Your Rank</span>
              </div>
              <p className="text-3xl font-bold">#4</p>
              <p className="text-xs text-success font-medium flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 2 positions</p>
            </CardContent>
          </Card>

          {/* Streak */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-4 w-4 text-destructive" />
                <span className="text-xs font-semibold text-muted-foreground">Streak</span>
              </div>
              <p className="text-3xl font-bold">30 days</p>
              <p className="text-xs text-muted-foreground">Personal best!</p>
            </CardContent>
          </Card>

          {/* Online Now */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold">Online Now</span>
                <Badge className="bg-success text-success-foreground text-[10px] gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-success-foreground" /> 127 online
                </Badge>
              </div>
              <div className="flex items-center -space-x-2">
                {onlineAvatars.map((av, i) => (
                  <img key={i} src={av} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-background" />
                ))}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted ring-2 ring-background text-[10px] font-semibold text-muted-foreground">
                  +120
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="h-4 w-4 text-warning" />
                <span className="text-xs font-semibold">Leaderboard</span>
              </div>
              <div className="space-y-2.5">
                {leaderboard.map((user, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className={`text-xs font-bold w-4 text-center ${i === 0 ? "text-warning" : i === 1 ? "text-muted-foreground" : i === 2 ? "text-amber-700" : "text-muted-foreground"}`}>
                      {i + 1}
                    </span>
                    <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover ring-1 ring-border" />
                    <span className="text-xs font-medium flex-1 truncate">{user.name}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{user.points.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Auto-Invite */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-primary">Auto Community Invite</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                After every event, attendees automatically receive an invite to join this SpatialChat community. Organizers get full access to manage groups and rooms.
              </p>
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
                <Settings className="h-3 w-3" /> Configure Invites
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
