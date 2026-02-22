import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Plus,
  Users,
  CalendarDays,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  Zap,
  Video,
  Globe,
  MessageCircle,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreateEventDialog } from "@/components/CreateEventDialog";
import {
  homeMetrics,
  upcomingEvents,
  recentActivity,
  registrationMetrics,
  analyticsMetrics,
  revenueMetrics,
  revenueByType,
  recordingsMetrics,
  engagementMetrics,
  eventPerformance,
  trafficSources,
  monthlyRevenue,
  peopleMetrics,
} from "@/data/mockData";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const activityIcons: Record<string, string> = {
  registration: "👤",
  event: "📅",
  revenue: "💰",
  engagement: "⚡",
};

const pieColors = ["hsl(235, 65%, 55%)", "hsl(152, 55%, 45%)", "hsl(38, 92%, 50%)", "hsl(0, 72%, 55%)"];

const Index = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back — here's your event platform at a glance</p>
        </div>
        <Button className="gap-2" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      <CreateEventDialog open={createOpen} onOpenChange={setCreateOpen} />

      {/* Banner */}
      <div className="flex items-center justify-between rounded-xl bg-primary px-6 py-3.5">
        <div className="flex items-center gap-2 text-primary-foreground">
          <span>🚀</span>
          <span className="font-semibold">Launch Your Live Space</span>
          <span className="text-primary-foreground/80">Start hosting immersive virtual events</span>
        </div>
        <Button variant="secondary" size="sm" className="gap-1.5">
          Go to My Space <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Events", value: "24", change: "+12%", positive: true, icon: CalendarDays, color: "bg-primary/10 text-primary" },
          { label: "Total Attendees", value: "3,842", change: "+24%", positive: true, icon: Users, color: "bg-success/10 text-success" },
          { label: "Revenue", value: "$45.2K", change: "+8%", positive: true, icon: DollarSign, color: "bg-warning/10 text-warning" },
          { label: "Engagement Rate", value: "78%", change: "+12.1%", positive: true, icon: Zap, color: "bg-destructive/10 text-destructive" },
        ].map((m, i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">{m.label}</p>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${m.color}`}>
                  <m.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold">{m.value}</p>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {m.positive ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={m.positive ? "text-success" : "text-destructive"}>{m.change}</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart + Traffic Sources */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Revenue Trend</h3>
                <p className="text-xs text-muted-foreground">Monthly revenue overview</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => navigate("/revenue")}>
                View Details <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(235, 65%, 55%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(235, 65%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 15%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="amount" stroke="hsl(235, 65%, 55%)" strokeWidth={2} fill="url(#revGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Traffic Sources</h3>
                <p className="text-xs text-muted-foreground">Where attendees come from</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => navigate("/analytics")}>
                Details <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="visitors" paddingAngle={3}>
                    {trafficSources.map((_, i) => (
                      <Cell key={i} fill={pieColors[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-2">
              {trafficSources.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: pieColors[i] }} />
                    <span>{s.source}</span>
                  </div>
                  <span className="font-medium">{s.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Registrations", value: registrationMetrics[0].value, icon: "📝" },
          { label: "Contacts", value: peopleMetrics[0].value, icon: "👥" },
          { label: "Recordings", value: recordingsMetrics[0].value, icon: "🎬" },
          { label: "Total Views", value: analyticsMetrics[0].value, icon: "👁️" },
          { label: "Active Polls", value: engagementMetrics[0].value, icon: "📊" },
          { label: "Avg Session", value: analyticsMetrics[1].value, icon: "⏱️" },
        ].map((m, i) => (
          <Card key={i}>
            <CardContent className="flex flex-col items-center p-4 text-center">
              <span className="text-xl">{m.icon}</span>
              <p className="mt-1.5 text-lg font-bold">{m.value}</p>
              <p className="text-[10px] font-medium text-muted-foreground">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Event Performance + Revenue by Type */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Event Performance</h3>
                <p className="text-xs text-muted-foreground">Attendance rate by event</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => navigate("/analytics")}>
                All Analytics <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={eventPerformance} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 15%, 90%)" />
                <XAxis dataKey="event" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={0} tickFormatter={v => v.length > 16 ? v.slice(0, 14) + "…" : v} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="attendance" fill="hsl(235, 65%, 55%)" radius={[4, 4, 0, 0]} name="Attendance" />
                <Bar dataKey="registrations" fill="hsl(220, 18%, 85%)" radius={[4, 4, 0, 0]} name="Registrations" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold mb-1">Revenue by Type</h3>
            <p className="text-xs text-muted-foreground mb-4">Breakdown across event types</p>
            <div className="space-y-3">
              {revenueByType.map((r, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">{r.type}</span>
                    <span className="text-muted-foreground">{r.amount} ({r.percentage}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${r.percentage}%`, background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-muted/50 p-3">
              <p className="text-xs font-medium">Total Revenue</p>
              <p className="text-xl font-bold">$45,250</p>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                <TrendingUp className="h-3 w-3 text-success" /> +8% vs last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events + Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <h3 className="text-sm font-semibold">Upcoming Events</h3>
              <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => navigate("/events")}>
                All Events <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
            <div className="divide-y divide-border">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <span className="text-lg font-bold leading-none">{event.date}</span>
                      <span className="text-[10px] uppercase">{event.month}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{event.name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {event.registered}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-success">{event.revenue}</p>
                    <Badge variant="outline" className="text-[10px]">{event.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <h3 className="text-sm font-semibold">Recent Activity</h3>
            </div>
            <div className="divide-y divide-border">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-base">
                    {activityIcons[activity.icon] || "📌"}
                  </div>
                  <div>
                    <p className="text-xs">{activity.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
