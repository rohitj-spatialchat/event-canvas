import { useState } from "react";
import { Download, Upload, Play, UploadCloud, MoreVertical, Grid, List, Search, Filter, Calendar, Eye, HardDrive, Clock, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recordingsMetrics, recordingsData, recentViews } from "@/data/mockData";

const eventFilters = ["All Events", "Product Launch Webinar", "Q1 Team All-Hands", "Customer Success Summit", "Tech Talk Series"];
const statusFilters = ["All", "Ready", "Processing"];

const Recordings = () => {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All Events");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = recordingsData.filter(rec => {
    const matchSearch = rec.title.toLowerCase().includes(search.toLowerCase()) || rec.event.toLowerCase().includes(search.toLowerCase());
    const matchEvent = eventFilter === "All Events" || rec.event === eventFilter;
    const matchStatus = statusFilter === "All" || rec.status === statusFilter.toLowerCase();
    return matchSearch && matchEvent && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Download All
        </Button>
        <Button className="gap-2">
          <Upload className="h-4 w-4" /> Upload Recording
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Video, color: "hsl(235, 65%, 55%)" },
          { icon: Eye, color: "hsl(152, 55%, 45%)" },
          { icon: Clock, color: "hsl(38, 92%, 50%)" },
          { icon: HardDrive, color: "hsl(0, 72%, 55%)" },
        ].map((meta, i) => {
          const m = recordingsMetrics[i];
          const Icon = meta.icon;
          return (
            <Card key={i}>
              <CardContent className="p-5">
                <p className="text-xs font-medium text-muted-foreground mb-1">{m.label}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: meta.color }}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-2xl font-bold">{m.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recordings by title or event..."
                className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Event Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <div className="flex gap-1.5">
                  {eventFilters.map(f => (
                    <button
                      key={f}
                      onClick={() => setEventFilter(f)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                        eventFilter === f
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="h-6 w-px bg-border hidden lg:block" />
              <div className="flex gap-1.5">
                {statusFilters.map(f => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                      statusFilter === f
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="h-6 w-px bg-border hidden lg:block" />
              <div className="flex items-center gap-0.5 rounded-lg border border-border p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md p-1.5 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-md p-1.5 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {recordingsData.length} recordings
            </span>
            {(search || eventFilter !== "All Events" || statusFilter !== "All") && (
              <button
                onClick={() => { setSearch(""); setEventFilter("All Events"); setStatusFilter("All"); }}
                className="text-xs text-primary hover:underline font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recordings Grid + Recent Views */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Session Recordings</h2>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Video className="h-12 w-12 text-muted-foreground/30 mb-3" />
                <p className="text-sm font-medium text-muted-foreground">No recordings found</p>
                <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
                {filtered.map(rec => (
                  viewMode === "grid" ? (
                    <div key={rec.id} className="group">
                      <div className="relative flex h-40 items-center justify-center rounded-xl bg-foreground/90 overflow-hidden cursor-pointer transition-transform group-hover:scale-[1.02]">
                        {rec.status === "processing" && (
                          <span className="absolute left-2 top-2 rounded-full bg-warning px-2.5 py-0.5 text-[10px] font-semibold text-warning-foreground animate-pulse">Processing...</span>
                        )}
                        {rec.status === "ready" && (
                          <Badge className="absolute left-2 top-2 bg-success text-success-foreground text-[10px]">Ready</Badge>
                        )}
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                          <Play className="h-5 w-5 text-white" />
                        </div>
                        <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">{rec.duration}</span>
                      </div>
                      <p className="mt-2.5 text-sm font-medium leading-tight">{rec.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{rec.event}</p>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{rec.date}</span>
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{rec.views}</span>
                        <span className="flex items-center gap-1"><HardDrive className="h-3 w-3" />{rec.size}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <Button size="sm" className="gap-1.5 text-xs" disabled={rec.status === "processing"}>
                          <Play className="h-3.5 w-3.5" /> {rec.status === "processing" ? "Processing" : "Watch"}
                        </Button>
                        <button className="rounded p-1.5 text-muted-foreground hover:text-foreground transition-colors"><UploadCloud className="h-4 w-4" /></button>
                        <button className="rounded p-1.5 text-muted-foreground hover:text-foreground transition-colors"><MoreVertical className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ) : (
                    <div key={rec.id} className="flex items-center gap-4 rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors">
                      <div className="relative flex h-16 w-28 shrink-0 items-center justify-center rounded-lg bg-foreground/90 overflow-hidden">
                        <Play className="h-4 w-4 text-white" />
                        <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-white">{rec.duration}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{rec.title}</p>
                        <p className="text-xs text-muted-foreground">{rec.event} • {rec.date}</p>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                          <span>{rec.views} views</span>
                          <span>{rec.size}</span>
                          <Badge variant="outline" className={`text-[9px] ${rec.status === "ready" ? "border-success text-success" : "border-warning text-warning"}`}>
                            {rec.status}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" className="gap-1.5 text-xs shrink-0" disabled={rec.status === "processing"}>
                        <Play className="h-3.5 w-3.5" /> Watch
                      </Button>
                    </div>
                  )
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Recent Views</h2>
            <div className="space-y-4">
              {recentViews.map((v, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: v.color }}
                  >
                    {v.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.recording}</p>
                    <p className="text-xs text-muted-foreground">{v.watched} • {v.time}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1 flex-1 rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${v.progress === 100 ? "bg-success" : "bg-primary"}`}
                          style={{ width: `${v.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{v.progress}%</span>
                    </div>
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

export default Recordings;
