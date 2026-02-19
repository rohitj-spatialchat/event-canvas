import { CalendarDays, Download, Star, Clock, Diamond } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { analyticsMetrics, eventPerformance, trafficSources, topPages } from "@/data/mockData";

const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <CalendarDays className="h-4 w-4" /> Date Range
        </Button>
        <Button className="gap-2">
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsMetrics.map((m, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{m.label}</p>
                <span className={`text-xs font-semibold ${m.positive ? "text-success" : "text-destructive"}`}>
                  {m.change}
                </span>
              </div>
              <p className="mt-1 text-3xl font-bold">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Event Performance */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Event Performance</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase text-muted-foreground">
                <th className="pb-3">Event</th>
                <th className="pb-3">Registrations</th>
                <th className="pb-3">Attendance</th>
                <th className="pb-3">Attendance Rate</th>
                <th className="pb-3">Engagement</th>
                <th className="pb-3">Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {eventPerformance.map((e, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 text-sm font-medium">{e.event}</td>
                  <td className="py-3 text-sm">{e.registrations}</td>
                  <td className="py-3 text-sm">{e.attendance}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${e.attendanceRate}%` }} />
                      </div>
                      <span className="text-sm">{e.attendanceRate}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-sm font-semibold text-success">{e.engagement}%</span>
                  </td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {e.satisfaction}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Traffic + Top Pages */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Traffic Sources</h2>
            <div className="space-y-4">
              {trafficSources.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{s.source}</span>
                    <span className="text-muted-foreground">{s.visitors.toLocaleString()} visitors</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${s.percentage}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{s.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Top Pages</h2>
            <div className="space-y-4">
              {topPages.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{p.page}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.avgTime}</span>
                      <span className="flex items-center gap-1"><Diamond className="h-3 w-3" /> {p.bounceRate} bounce</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{p.views.toLocaleString()} views</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
