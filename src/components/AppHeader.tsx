import { Bell, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4">
      <SidebarTrigger />
      <div className="flex flex-1 items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events..."
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <Button size="sm" className="gap-1.5">
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">New Event</span>
      </Button>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
          3
        </span>
      </Button>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
        JD
      </div>
    </header>
  );
}
