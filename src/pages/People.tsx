import { useState } from "react";
import { Upload, UserPlus, Code2, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const people = [
  { initials: "AS", name: "Arty Starr", email: "arty@twilightcity.net", title: "Marketing Manager", company: "Apple", country: "United States", joined: "Jun 12, 2026", source: "Salesforce", sourceColor: "hsl(210, 80%, 50%)", color: "hsl(235, 65%, 55%)" },
  { initials: "M", name: "Mario", email: "mario@mariomelo.com", title: "Growth Marketing", company: "Google", country: "United Kingdom", joined: "Jun 08, 2026", source: "HubSpot", sourceColor: "hsl(16, 100%, 50%)", color: "hsl(152, 55%, 45%)" },
  { initials: "E", name: "Eugenia · Tech Support", email: "eug@spatial.chat", title: "Product Manager", company: "Microsoft", country: "Germany", joined: "May 30, 2026", source: "Registration", sourceColor: "hsl(235, 65%, 55%)", color: "hsl(38, 92%, 50%)" },
  { initials: "PI", name: "Pritina Irvin", email: "pritina@pomona.edu", title: "CEO", company: "Stripe", country: "Canada", joined: "May 24, 2026", source: "Zapier", sourceColor: "hsl(28, 90%, 55%)", color: "hsl(270, 55%, 55%)" },
  { initials: "DT", name: "Doe Thomas", email: "doe@pomona.edu", title: "Founder", company: "Notion", country: "India", joined: "May 18, 2026", source: "Manual import", sourceColor: "hsl(0, 0%, 35%)", color: "hsl(0, 0%, 30%)" },
  { initials: "AL", name: "Ana Livia", email: "ana@spatial.chat", title: "Software Engineer", company: "Figma", country: "Australia", joined: "May 11, 2026", source: "Salesforce", sourceColor: "hsl(210, 80%, 50%)", color: "hsl(195, 65%, 45%)" },
  { initials: "DL", name: "Diana Larse", email: "diana@dianalarsen.com", title: "CFO", company: "Linear", country: "Singapore", joined: "Apr 28, 2026", source: "HubSpot", sourceColor: "hsl(16, 100%, 50%)", color: "hsl(16, 100%, 50%)" },
  { initials: "AT", name: "Alex Thurow", email: "info@onmoderndev.de", title: "Finance Manager", company: "Apple", country: "United States", joined: "Jun 12, 2026", source: "Registration", sourceColor: "hsl(235, 65%, 55%)", color: "hsl(0, 72%, 55%)" },
];

const People = () => {
  const [tab, setTab] = useState<"all" | "event">("all");

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">People</h1>
          <p className="mt-1 text-sm text-muted-foreground">107 attendees across 2 events</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" /> Upload CSV
          </Button>
          <Button variant="outline" className="gap-2">
            <Code2 className="h-4 w-4" /> Sync with CRM
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" /> Invite
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="inline-flex rounded-full bg-muted p-1">
        <button
          onClick={() => setTab("all")}
          className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
            tab === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          All events
        </button>
        <button
          onClick={() => setTab("event")}
          className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
            tab === "event" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          Event-specific
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email or company..."
            className="h-10 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {["Title", "Company", "Country", "Date joined"].map((f) => (
          <button key={f} className="flex h-10 items-center gap-1.5 rounded-full border border-input bg-background px-4 text-sm hover:bg-muted">
            {f === "Date joined" && <span className="text-xs">📅</span>}
            {f}
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-card">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <th className="w-10 px-4 py-3"><input type="checkbox" className="rounded" /></th>
              <th className="py-3">Attendee</th>
              <th className="py-3">Title</th>
              <th className="py-3">Company</th>
              <th className="py-3">Country</th>
              <th className="py-3">Date joined</th>
              <th className="py-3 pr-6">Source</th>
            </tr>
          </thead>
          <tbody>
            {people.map((p) => (
              <tr key={p.email} className="border-t border-border/50 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4"><input type="checkbox" className="rounded" /></td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ backgroundColor: p.color }}>
                      {p.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-sm">{p.title}</td>
                <td className="py-4 text-sm">{p.company}</td>
                <td className="py-4 text-sm">{p.country}</td>
                <td className="py-4 text-sm">{p.joined}</td>
                <td className="py-4 pr-6 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.sourceColor }} />
                    {p.source}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default People;
