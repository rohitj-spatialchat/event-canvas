import { useState } from "react";
import { Plus, Search, Pencil, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { eventsData } from "@/data/mockData";
import { CreateEventDialog } from "@/components/CreateEventDialog";

const statusStyles = {
  live: { label: "● Live", className: "text-success" },
  scheduled: { label: "Scheduled", className: "text-primary" },
  draft: { label: "Draft", className: "text-muted-foreground" },
  ended: { label: "Ended", className: "text-muted-foreground" },
};

const Events = () => {
  const [filter, setFilter] = useState<string>("all");
  const [createOpen, setCreateOpen] = useState(false);
  const filters = [
    { key: "all", label: "All", count: eventsData.length },
    { key: "live", label: "Live", count: eventsData.filter(e => e.status === "live").length },
    { key: "scheduled", label: "Scheduled", count: eventsData.filter(e => e.status === "scheduled").length },
    { key: "draft", label: "Draft", count: eventsData.filter(e => e.status === "draft").length },
    { key: "ended", label: "Ended", count: eventsData.filter(e => e.status === "ended").length },
  ];

  const filtered = filter === "all" ? eventsData : eventsData.filter(e => e.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-sm text-muted-foreground">Manage all your webinars, conferences, and meetings</p>
        </div>
        <Button className="gap-2" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Create New Event
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === f.key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {f.label} <span className="text-xs">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events..."
            className="h-9 rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase text-muted-foreground">
                <th className="p-4">Event Name</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Registrations</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(event => {
                const style = statusStyles[event.status];
                const fillPercent = event.capacity > 0 ? (event.registrations / event.capacity) * 100 : 0;
                return (
                  <tr key={event.id} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <p className="font-medium">{event.name}</p>
                      <p className="text-xs text-muted-foreground">{event.type}</p>
                    </td>
                    <td className="p-4 text-sm">{event.date}</td>
                    <td className="p-4">
                      <span className={`text-sm font-medium ${style.className}`}>{style.label}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{event.registrations}</span>
                        <div className="h-1.5 w-20 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${Math.min(fillPercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{event.capacity}</td>
                    <td className="p-4 text-sm">{event.revenue}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="text-muted-foreground hover:text-foreground">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="text-muted-foreground hover:text-foreground">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <CreateEventDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default Events;
