import { Download, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { revenueMetrics, revenueByType, revenueEvents, monthlyRevenue } from "@/data/mockData";

const Revenue = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Revenue</h1>
          <p className="text-sm text-muted-foreground">Track and analyze your event revenue performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button variant="outline" className="gap-1.5">
            Last 7 Days <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {revenueMetrics.map((m, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: m.color }} />
              <p className="text-3xl font-bold">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Breakdown + Events */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-1 text-xs font-medium text-muted-foreground">Revenue by Event Type</h3>
            <div className="mt-4 space-y-4">
              {revenueByType.map((r, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                      <span className="font-medium">{r.type}</span>
                    </div>
                    <span>
                      {r.amount} <span className="text-muted-foreground">{r.percentage}%</span>
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${r.percentage}%`, backgroundColor: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="divide-y divide-border p-0">
            {revenueEvents.map((e, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.date}  {e.tickets} tickets</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-success">{e.revenue}</p>
                  <span className={`text-xs font-medium ${e.status === "COMPLETED" ? "text-success" : "text-muted-foreground"}`}>
                    {e.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Chart placeholder */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-end justify-center gap-12">
            {monthlyRevenue.map((m, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative mb-2 flex items-end">
                  <div
                    className="w-16 rounded-md bg-success"
                    style={{ height: `${(m.amount / 55000) * 150}px` }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-success">
                      ${(m.amount / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            📊 Revenue trend visualization - Integration with charting library pending
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Revenue;
