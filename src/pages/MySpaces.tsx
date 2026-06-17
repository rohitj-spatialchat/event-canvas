import { Plus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const spaces = [
  { initials: "TW", name: "Thinkies World Congress", subtitle: "Twilight City · Visited 6 days ago", live: 3, color: "hsl(235, 65%, 55%)" },
  { initials: "MS", name: "My Space", subtitle: "In My Team · Visited 13 days ago", live: 0, color: "hsl(280, 65%, 65%)" },
  { initials: "CV", name: "Cecil's Virtual Lounge", subtitle: "Pomona College · Visited 1 month ago", live: 0, color: "hsl(152, 55%, 45%)" },
  { initials: "LD", name: "Live Demo", subtitle: "Demo · Visited 2 months ago", live: 1, color: "hsl(195, 75%, 50%)" },
];

const MySpaces = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Spaces</h1>
          <p className="text-sm text-muted-foreground">Jump into any of your live or persistent spaces</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New space
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {spaces.map((s) => (
          <Card key={s.name}>
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: s.color }}
              >
                {s.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold truncate">{s.name}</p>
                  {s.live > 0 && (
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                      {s.live} live
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{s.subtitle}</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5">
                <LogIn className="h-3.5 w-3.5" /> Enter
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MySpaces;
