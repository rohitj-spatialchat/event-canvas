import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateEventDialog } from "@/components/CreateEventDialog";

const events = [
  {
    title: "Twilight City — Thinkies World",
    date: "May 20, 2026",
    space: "Twilight City",
    community: "Thinkies World Congress",
    status: "Ended",
    attendees: 83,
    peak: 68,
    dwell: "134.1m",
    rooms: 13,
    gradient: "linear-gradient(135deg, hsl(235, 65%, 55%), hsl(270, 70%, 60%))",
  },
  {
    title: "Cecil's Virtual Lounge",
    date: "Apr 17, 2026",
    space: "Pomona College",
    community: "CecilsVirtualLounge",
    status: "Ended",
    attendees: 24,
    peak: 20,
    dwell: "62.9m",
    rooms: 10,
    gradient: "linear-gradient(135deg, hsl(152, 60%, 38%), hsl(160, 70%, 50%))",
  },
];

const Events = () => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="mt-1 text-sm text-muted-foreground">Every event hosted in your SpatialChat spaces</p>
        </div>
        <Button className="gap-2" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {events.map((e) => (
          <div key={e.title} className="overflow-hidden rounded-2xl bg-card shadow-sm">
            <div className="relative p-6 pb-10 text-white" style={{ background: e.gradient }}>
              <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                {e.status}
              </span>
              <h3 className="mt-12 text-xl font-semibold">{e.title}</h3>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{e.date}</span>
                <span>·</span>
                <span>{e.space}</span>
                <span>·</span>
                <span>{e.community}</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <Stat label="Attendees" value={e.attendees} />
                <Stat label="Peak" value={e.peak} />
                <Stat label="Avg dwell" value={e.dwell} />
                <Stat label="Rooms" value={e.rooms} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateEventDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

export default Events;
