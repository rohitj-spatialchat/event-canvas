import {
  FileEdit,
  CalendarClock,
  Radio,
  CheckCircle2,
  Plus,
  Send,
  BarChart3,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  ClipboardList,
  Zap,
  Plug,
  Video,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  eventStatusCounts,
  keyMetrics,
  upcomingEvents,
  recentActivity,
} from "@/data/mockData";

const statusConfig = {
  draft: { label: "Draft", icon: FileEdit, color: "bg-muted text-muted-foreground" },
  scheduled: { label: "Scheduled", icon: CalendarClock, color: "bg-info/10 text-info" },
  live: { label: "Live", icon: Radio, color: "bg-success/10 text-success" },
  ended: { label: "Ended", icon: CheckCircle2, color: "bg-muted text-muted-foreground" },
};

const activityIcons: Record<string, React.ElementType> = {
  registration: Users,
  engagement: Zap,
  setup: ClipboardList,
  recording: Video,
  integration: Plug,
};

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here's your event overview.
        </p>
      </div>

      {/* Event Status Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(Object.entries(eventStatusCounts) as [keyof typeof statusConfig, number][]).map(
          ([status, count]) => {
            const config = statusConfig[status];
            const Icon = config.icon;
            return (
              <Card key={status}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">{config.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-5">
              <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span
                  className={`flex items-center text-xs font-medium ${
                    metric.positive ? "text-success" : "text-destructive"
                  }`}
                >
                  {metric.positive ? (
                    <TrendingUp className="mr-0.5 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-0.5 h-3 w-3" />
                  )}
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Room
        </Button>
        <Button variant="outline" className="gap-2">
          <Send className="h-4 w-4" /> Send Reminder
        </Button>
        <Button variant="outline" className="gap-2">
          <BarChart3 className="h-4 w-4" /> Launch Poll
        </Button>
      </div>

      {/* Bottom Grid: Upcoming Events + Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => {
              const config = statusConfig[event.status];
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{event.name}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {event.date}
                      {event.attendees > 0 && (
                        <>
                          <span>·</span>
                          <Users className="h-3 w-3" />
                          {event.attendees}
                        </>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className={`ml-2 ${config.color} border-0`}>
                    {config.label}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity) => {
              const Icon = activityIcons[activity.type] || Zap;
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
