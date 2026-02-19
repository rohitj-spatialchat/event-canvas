import { ArrowRight, Filter, Plus, Users, CalendarDays, Zap, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { homeMetrics, upcomingEvents, recentActivity } from "@/data/mockData";

const activityIcons: Record<string, string> = {
  registration: "👤",
  event: "📅",
  revenue: "💰",
  engagement: "⚡",
};

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      {/* Banner */}
      <div className="flex items-center justify-between rounded-lg bg-primary px-6 py-3">
        <div className="flex items-center gap-2 text-primary-foreground">
          <span>🚀</span>
          <span className="font-semibold">Launch Your Live Space</span>
          <span className="text-primary-foreground/80">Start hosting immersive virtual events</span>
        </div>
        <Button variant="secondary" size="sm" className="gap-1.5">
          Go to My Space <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {homeMetrics.map((metric, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ backgroundColor: metric.color }}
              >
                <span className="text-sm text-white">
                  {i === 0 && <CalendarDays className="h-5 w-5" />}
                  {i === 1 && <Users className="h-5 w-5" />}
                  {i === 2 && <Zap className="h-5 w-5" />}
                  {i === 3 && <DollarSign className="h-5 w-5" />}
                </span>
              </div>
              <span className="text-3xl font-bold">{metric.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom: Events + Activity */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Upcoming Events */}
        <Card>
          <CardContent className="divide-y divide-border p-0">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <span className="text-lg font-bold leading-none">{event.date}</span>
                    <span className="text-[10px] uppercase">{event.month}</span>
                  </div>
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>🕐 {event.time}</span>
                      <span>👤 {event.registered} registered</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-success">{event.revenue}</p>
                  <span className="text-xs font-medium text-muted-foreground">{event.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent className="divide-y divide-border p-0">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-lg">
                  {activityIcons[activity.icon] || "📌"}
                </div>
                <div>
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
