import { useState } from "react";
import { Upload, Plus, Search, UserPlus, MoreVertical, ExternalLink, ArrowRight, X, RefreshCw, Zap, Mail, Phone, Calendar, TrendingUp, DollarSign, MessageSquare, Target, Clock, MapPin, Briefcase, Building2, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { peopleMetrics, peopleData, crmJourneyData } from "@/data/mockData";

const crmLogos: Record<string, { label: string; color: string; bg: string }> = {
  hubspot: { label: "HubSpot", color: "hsl(16, 100%, 50%)", bg: "hsl(16, 100%, 96%)" },
  salesforce: { label: "Salesforce", color: "hsl(210, 80%, 50%)", bg: "hsl(210, 80%, 96%)" },
};

const stageColors: Record<string, string> = {
  Customer: "bg-success text-success-foreground",
  Opportunity: "bg-primary text-primary-foreground",
  MQL: "bg-warning text-warning-foreground",
  SQL: "bg-info text-info-foreground",
};

const journeyIcons: Record<string, typeof Zap> = {
  event: Calendar,
  crm: Target,
  email: Mail,
  deal: DollarSign,
  meeting: MessageSquare,
  score: TrendingUp,
};

const journeyColors: Record<string, string> = {
  event: "hsl(235, 65%, 55%)",
  crm: "hsl(152, 55%, 45%)",
  email: "hsl(38, 92%, 50%)",
  deal: "hsl(16, 100%, 50%)",
  meeting: "hsl(270, 55%, 55%)",
  score: "hsl(195, 65%, 45%)",
};

const People = () => {
  const [filter, setFilter] = useState("All");
  const [selectedPerson, setSelectedPerson] = useState<typeof peopleData[0] | null>(null);
  const filters = ["All", "Checked In", "Registered", "VIP"];

  const journey = selectedPerson ? crmJourneyData[selectedPerson.name] || [] : [];
  const crm = selectedPerson ? crmLogos[selectedPerson.crmSource] : null;

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
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {peopleMetrics.map((m, i) => (
          <Card key={i}>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <p className="text-2xl font-bold">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact count bar */}
      <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-2.5">
        <Database className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">Showing {peopleData.length} of <span className="text-primary font-bold">12,847</span> contacts</span>
        <span className="text-xs text-muted-foreground">• Synced from HubSpot (7,234) and Salesforce (5,613)</span>
      </div>

      {/* CRM Integration Banner */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card text-xs font-bold" style={{ backgroundColor: "hsl(16, 100%, 96%)", color: "hsl(16, 100%, 50%)" }}>H</div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card text-xs font-bold" style={{ backgroundColor: "hsl(210, 80%, 96%)", color: "hsl(210, 80%, 50%)" }}>S</div>
          </div>
          <div>
            <p className="text-sm font-semibold">CRM Integration Active</p>
            <p className="text-xs text-muted-foreground">HubSpot & Salesforce synced • Last sync: 2 min ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <RefreshCw className="h-3 w-3" /> Sync Now
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Zap className="h-3 w-3" /> Configure
          </Button>
        </div>
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
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase text-muted-foreground">
                <th className="p-3">Attendee</th>
                <th className="p-3">Company</th>
                <th className="p-3">Role</th>
                <th className="p-3">Location</th>
                <th className="p-3">Industry</th>
                <th className="p-3">CRM</th>
                <th className="p-3">Stage</th>
                <th className="p-3">Deal Value</th>
                <th className="p-3">Engagement</th>
                <th className="p-3">Tags</th>
                <th className="p-3">Journey</th>
              </tr>
            </thead>
            <tbody>
              {peopleData.map((person, i) => {
                const engColor = person.engagement >= 90 ? "bg-success" : person.engagement >= 70 ? "bg-primary" : "bg-warning";
                const crmInfo = crmLogos[person.crmSource];
                return (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-medium text-white shrink-0"
                          style={{ backgroundColor: person.color }}
                        >
                          {person.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{person.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{person.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span className="text-sm font-medium truncate">{person.company}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate">{person.role}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate">{person.location}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-[10px] font-medium whitespace-nowrap">
                        {person.industry}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{ backgroundColor: crmInfo.bg, color: crmInfo.color }}
                        >
                          {crmInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={`text-[10px] ${stageColors[person.crmStage] || "bg-muted text-muted-foreground"}`}>
                        {person.crmStage}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <p className="text-sm font-semibold">{person.crmDealValue}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <span className="text-[10px] text-success font-medium">{person.crmLeadScore}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-14 rounded-full bg-muted">
                          <div className={`h-full rounded-full ${engColor}`} style={{ width: `${person.engagement}%` }} />
                        </div>
                        <span className="text-[10px]">{person.engagement}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {person.tags.length > 0 ? person.tags.map(tag => (
                          <Badge key={tag} variant="outline" className={`text-[10px] ${tag === "VIP" ? "border-primary text-primary" : tag === "Speaker" ? "border-success text-success" : "border-warning text-warning"}`}>
                            {tag}
                          </Badge>
                        )) : <span className="text-xs text-muted-foreground">—</span>}
                      </div>
                    </td>
                    <td className="p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-xs h-7"
                        onClick={() => setSelectedPerson(person)}
                      >
                        View <ArrowRight className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Journey Drawer */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedPerson(null)} />
          <div className="relative z-10 w-full max-w-lg bg-background shadow-2xl border-l overflow-y-auto animate-in slide-in-from-right-full duration-300">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: selectedPerson.color }}
                  >
                    {selectedPerson.initials}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{selectedPerson.name}</h2>
                    <p className="text-xs text-muted-foreground">{selectedPerson.role} at {selectedPerson.company}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedPerson(null)} className="p-2 rounded-md hover:bg-muted">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CRM Summary Cards */}
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] uppercase font-medium text-muted-foreground">CRM Source</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {crm && (
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: crm.bg, color: crm.color }}>
                        {crm.label}
                      </span>
                    )}
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] uppercase font-medium text-muted-foreground">Deal Stage</p>
                  <Badge className={`mt-1 text-xs ${stageColors[selectedPerson.crmStage] || ""}`}>
                    {selectedPerson.crmStage}
                  </Badge>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] uppercase font-medium text-muted-foreground">Deal Value</p>
                  <p className="text-lg font-bold mt-0.5">{selectedPerson.crmDealValue}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] uppercase font-medium text-muted-foreground">Lead Score</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-lg font-bold">{selectedPerson.crmLeadScore}</p>
                    <div className="flex-1 h-1.5 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-success transition-all"
                        style={{ width: `${selectedPerson.crmLeadScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
                  <ExternalLink className="h-3 w-3" /> Open in {crm?.label}
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
                  <Mail className="h-3 w-3" /> Send Email
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
                  <Phone className="h-3 w-3" /> Call
                </Button>
              </div>

              {/* Journey Timeline */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Customer Journey</h3>
                  <span className="text-[10px] text-muted-foreground">{journey.length} touchpoints</span>
                </div>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[15px] top-3 bottom-3 w-px bg-border" />

                  <div className="space-y-0">
                    {journey.map((step, idx) => {
                      const Icon = journeyIcons[step.type] || Zap;
                      const color = journeyColors[step.type] || "hsl(220, 10%, 46%)";
                      return (
                        <button
                          key={idx}
                          className="group relative w-full flex items-start gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-muted/50"
                        >
                          {/* Icon dot */}
                          <div
                            className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 bg-background transition-transform group-hover:scale-110"
                            style={{ borderColor: color }}
                          >
                            <Icon className="h-3.5 w-3.5" style={{ color }} />
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-medium truncate">{step.action}</p>
                              <span
                                className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                                style={{
                                  backgroundColor: step.source === "HubSpot" ? "hsl(16, 100%, 96%)" : step.source === "Salesforce" ? "hsl(210, 80%, 96%)" : "hsl(235, 65%, 96%)",
                                  color: step.source === "HubSpot" ? "hsl(16, 100%, 50%)" : step.source === "Salesforce" ? "hsl(210, 80%, 50%)" : "hsl(235, 65%, 55%)",
                                }}
                              >
                                {step.source}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{step.detail}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-2.5 w-2.5 text-muted-foreground" />
                              <span className="text-[10px] text-muted-foreground">{step.date}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
