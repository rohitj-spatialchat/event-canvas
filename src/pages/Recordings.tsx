import { Download, Upload, Play, UploadCloud, MoreVertical, Grid, List } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { recordingsMetrics, recordingsData, recentViews } from "@/data/mockData";

const Recordings = () => {
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
        {recordingsMetrics.map((m, i) => (
          <Card key={i}>
            <CardContent className="flex flex-col items-center justify-center p-5">
              <p className="text-3xl font-bold">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recordings Grid + Recent Views */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Session Recordings</h2>
              <div className="flex items-center gap-1">
                <button className="rounded p-1.5 text-muted-foreground hover:bg-muted"><Grid className="h-4 w-4" /></button>
                <button className="rounded p-1.5 text-muted-foreground hover:bg-muted"><List className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recordingsData.map(rec => (
                <div key={rec.id}>
                  <div className="relative flex h-40 items-center justify-center rounded-lg bg-foreground/90">
                    {rec.status === "processing" && (
                      <span className="absolute left-2 top-2 rounded bg-warning px-2 py-0.5 text-xs font-medium text-warning-foreground">Processing...</span>
                    )}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <span className="absolute bottom-2 right-2 text-xs font-medium text-white">{rec.duration}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{rec.title}</p>
                  <p className="text-xs text-muted-foreground">{rec.event}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>📅 {rec.date}</span>
                    <span>👁 {rec.views} views</span>
                    <span>💾 {rec.size}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <Button size="sm" className="gap-1.5" disabled={rec.status === "processing"}>
                      <Play className="h-3.5 w-3.5" /> {rec.status === "processing" ? "Processing" : "Watch"}
                    </Button>
                    <button className="rounded p-1.5 text-muted-foreground hover:text-foreground"><UploadCloud className="h-4 w-4" /></button>
                    <button className="rounded p-1.5 text-muted-foreground hover:text-foreground"><MoreVertical className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
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
