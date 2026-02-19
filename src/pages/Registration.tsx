import { Download, Plus, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { registrationMetrics, registrationForms, recentRegistrations } from "@/data/mockData";

const Registration = () => {
  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Data
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Form
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {registrationMetrics.map((m, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <p className="text-3xl font-bold">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
              {m.change && (
                <p className={`mt-1 text-xs ${m.positive ? "text-success" : m.positive === false ? "text-destructive" : "text-muted-foreground"}`}>
                  {m.change}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Forms + Recent */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Registration Forms</h2>
              <button className="text-sm text-muted-foreground hover:text-foreground">View All</button>
            </div>
            <div className="divide-y divide-border">
              {registrationForms.map(form => (
                <div key={form.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{form.name}</p>
                    <div className="flex items-center gap-3">
                      <button className="text-sm text-muted-foreground hover:text-foreground">Edit Form</button>
                      <Button variant="outline" size="sm">View Responses</Button>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>👤 {form.registered} registered</span>
                    <span>■ {form.fields} fields</span>
                    <span>{form.conversion} conversion</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-success">{form.status}</span>
                    <span className="text-xs text-muted-foreground">{form.updated}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Recent Registrations</h2>
            <div className="space-y-4">
              {recentRegistrations.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{r.name}</p>
                      <span className={`text-xs font-semibold ${r.tier === "VIP" ? "text-primary" : r.tier === "SPONSOR" ? "text-destructive" : "text-success"}`}>
                        {r.tier}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{r.email}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{r.event}</p>
                      <p className="text-xs text-muted-foreground">{r.time}</p>
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

export default Registration;
