import { useState } from "react";
import { Plus, Download, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settingsTabs, teamMembers } from "@/data/mockData";

const memberFilters = ["All members", "Active members", "Pending invites", "Inactive members"];
const memberCounts = [12, 8, 0, 4];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Team");
  const [activeFilter, setActiveFilter] = useState("All members");

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border">
        {settingsTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters + Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {memberFilters.map((f, i) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {f} <span className="text-xs">{memberCounts[i]}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add member
          </Button>
        </div>
      </div>

      {/* Sort pills */}
      <div className="flex items-center gap-2">
        {["Roles", "Status", "Name", "Email"].map((s, i) => (
          <span key={s} className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${i === 0 ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-success" : "bg-muted-foreground"}`} />
            {s}
          </span>
        ))}
      </div>

      {/* Team Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase text-muted-foreground">
                <th className="p-4 w-8"><input type="checkbox" className="rounded border-border" /></th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Roles</th>
                <th className="p-4">Auth</th>
                <th className="p-4">Last Login</th>
                <th className="p-4 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((m, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="p-4"><input type="checkbox" className="rounded border-border" /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: m.color }}
                      >
                        {m.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{m.name}</p>
                        {m.badge && <span className="text-xs text-muted-foreground">{m.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{m.email}</td>
                  <td className="p-4">
                    <span className="text-sm">{m.role}</span>
                    {m.extra && <span className="ml-1 text-xs text-muted-foreground">{m.extra}</span>}
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-success">{m.auth}</span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{m.lastLogin}</td>
                  <td className="p-4">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
