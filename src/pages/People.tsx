import { useState } from "react";
import { Upload, Plus, Search, UserPlus, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { peopleMetrics, peopleData } from "@/data/mockData";

const People = () => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Checked In", "Registered", "VIP"];

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" /> Import CSV
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Attendee
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {peopleMetrics.map((m, i) => (
          <Card key={i}>
            <CardContent className="flex flex-col items-center justify-center p-5">
              <p className="text-3xl font-bold">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Filters */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase text-muted-foreground">
                <th className="p-4">Attendee</th>
                <th className="p-4">Company</th>
                <th className="p-4">Event</th>
                <th className="p-4">Status</th>
                <th className="p-4">Engagement</th>
                <th className="p-4">Tags</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {peopleData.map((person, i) => {
                const engColor = person.engagement >= 90 ? "bg-success" : person.engagement >= 70 ? "bg-primary" : "bg-warning";
                return (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: person.color }}
                        >
                          {person.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{person.name}</p>
                          <p className="text-xs text-muted-foreground">{person.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{person.company}</p>
                      <p className="text-xs text-muted-foreground">{person.role}</p>
                    </td>
                    <td className="p-4 text-sm">{person.event}</td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold ${person.status === "CHECKED IN" ? "text-success" : "text-primary"}`}>
                        {person.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-muted">
                          <div className={`h-full rounded-full ${engColor}`} style={{ width: `${person.engagement}%` }} />
                        </div>
                        <span className="text-xs">{person.engagement}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {person.tags.length > 0 ? person.tags.map(tag => (
                          <Badge key={tag} variant="outline" className={`text-xs ${tag === "VIP" ? "border-primary text-primary" : tag === "Speaker" ? "border-success text-success" : "border-warning text-warning"}`}>
                            {tag}
                          </Badge>
                        )) : <span className="text-xs text-muted-foreground">—</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="text-muted-foreground hover:text-foreground">
                          <UserPlus className="h-4 w-4" />
                        </button>
                        <button className="text-muted-foreground hover:text-foreground">
                          <MoreVertical className="h-4 w-4" />
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
    </div>
  );
};

export default People;
