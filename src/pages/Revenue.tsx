import { useState } from "react";
import { Download, ChevronDown, TrendingUp, Users, DollarSign, ArrowRight, Ticket, Calendar, Building2, Eye, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { revenueMetrics, revenueByType, monthlyRevenue } from "@/data/mockData";

const eventRevenueData = [
  {
    id: "1", name: "Product Launch Webinar", type: "Webinar", date: "Feb 20, 2026", status: "LIVE",
    totalRevenue: "$12,450", ticketsSold: 245, avgTicket: "$50.82", refunds: "$320",
    tiers: [
      { name: "General", sold: 150, price: "$25", revenue: "$3,750", color: "hsl(235, 65%, 55%)" },
      { name: "VIP", sold: 65, price: "$99", revenue: "$6,435", color: "hsl(38, 92%, 50%)" },
      { name: "Sponsor", sold: 30, price: "$75.50", revenue: "$2,265", color: "hsl(152, 55%, 45%)" },
    ],
    topBuyers: [
      { name: "Sarah Johnson", company: "Apple", amount: "$297", tickets: 3, tier: "VIP" },
      { name: "Emily Rodriguez", company: "Google", amount: "$198", tickets: 2, tier: "VIP" },
      { name: "Thomas Martinez", company: "Meta", amount: "$150", tickets: 2, tier: "Sponsor" },
    ],
  },
  {
    id: "2", name: "Customer Success Summit", type: "Conference", date: "Feb 25, 2026", status: "SCHEDULED",
    totalRevenue: "$24,800", ticketsSold: 412, avgTicket: "$60.19", refunds: "$480",
    tiers: [
      { name: "General", sold: 280, price: "$35", revenue: "$9,800", color: "hsl(235, 65%, 55%)" },
      { name: "VIP", sold: 95, price: "$120", revenue: "$11,400", color: "hsl(38, 92%, 50%)" },
      { name: "Sponsor", sold: 37, price: "$97.30", revenue: "$3,600", color: "hsl(152, 55%, 45%)" },
    ],
    topBuyers: [
      { name: "Lisa Anderson", company: "JPMorgan Chase", amount: "$480", tickets: 4, tier: "VIP" },
      { name: "Michael Chen", company: "Microsoft", amount: "$360", tickets: 3, tier: "VIP" },
      { name: "Aisha Patel", company: "UnitedHealth Group", amount: "$240", tickets: 2, tier: "VIP" },
    ],
  },
  {
    id: "3", name: "Design System Workshop", type: "Workshop", date: "Mar 10, 2026", status: "SCHEDULED",
    totalRevenue: "$4,200", ticketsSold: 42, avgTicket: "$100.00", refunds: "$0",
    tiers: [
      { name: "Standard", sold: 30, price: "$80", revenue: "$2,400", color: "hsl(235, 65%, 55%)" },
      { name: "Premium", sold: 12, price: "$150", revenue: "$1,800", color: "hsl(38, 92%, 50%)" },
    ],
    topBuyers: [
      { name: "David Kim", company: "Amazon", amount: "$300", tickets: 2, tier: "Premium" },
      { name: "James Wilson", company: "Walmart", amount: "$150", tickets: 1, tier: "Premium" },
    ],
  },
  {
    id: "4", name: "Q1 Team All-Hands", type: "Internal", date: "Feb 22, 2026", status: "SCHEDULED",
    totalRevenue: "$0", ticketsSold: 156, avgTicket: "Free", refunds: "$0",
    tiers: [
      { name: "Free", sold: 156, price: "Free", revenue: "$0", color: "hsl(220, 15%, 70%)" },
    ],
    topBuyers: [],
  },
  {
    id: "5", name: "Tech Summit 2026", type: "Conference", date: "Feb 15, 2026", status: "COMPLETED",
    totalRevenue: "$3,800", ticketsSold: 89, avgTicket: "$42.70", refunds: "$150",
    tiers: [
      { name: "General", sold: 65, price: "$30", revenue: "$1,950", color: "hsl(235, 65%, 55%)" },
      { name: "VIP", sold: 24, price: "$77.08", revenue: "$1,850", color: "hsl(38, 92%, 50%)" },
    ],
    topBuyers: [
      { name: "Thomas Martinez", company: "Meta", amount: "$231", tickets: 3, tier: "VIP" },
      { name: "Sarah Johnson", company: "Apple", amount: "$154", tickets: 2, tier: "VIP" },
    ],
  },
];

const topSpendersPeople = [
  { name: "Lisa Anderson", company: "JPMorgan Chase", totalSpent: "$1,720", events: 5, avgPerEvent: "$344", tier: "VIP", initials: "LA", color: "hsl(0, 72%, 55%)" },
  { name: "Michael Chen", company: "Microsoft", totalSpent: "$1,485", events: 4, avgPerEvent: "$371", tier: "Sponsor", initials: "MC", color: "hsl(152, 55%, 45%)" },
  { name: "Sarah Johnson", company: "Apple", totalSpent: "$1,248", events: 6, avgPerEvent: "$208", tier: "VIP", initials: "SJ", color: "hsl(235, 65%, 55%)" },
  { name: "Aisha Patel", company: "UnitedHealth Group", totalSpent: "$980", events: 3, avgPerEvent: "$327", tier: "VIP", initials: "AP", color: "hsl(195, 65%, 45%)" },
  { name: "Thomas Martinez", company: "Meta", totalSpent: "$881", events: 4, avgPerEvent: "$220", tier: "Sponsor", initials: "TM", color: "hsl(38, 92%, 50%)" },
  { name: "David Kim", company: "Amazon", totalSpent: "$750", events: 3, avgPerEvent: "$250", tier: "General", initials: "DK", color: "hsl(38, 92%, 50%)" },
  { name: "Emily Rodriguez", company: "Google", totalSpent: "$594", events: 3, avgPerEvent: "$198", tier: "VIP", initials: "ER", color: "hsl(235, 65%, 55%)" },
  { name: "James Wilson", company: "Walmart", totalSpent: "$350", events: 2, avgPerEvent: "$175", tier: "General", initials: "JW", color: "hsl(270, 55%, 55%)" },
];

const statusColors: Record<string, string> = {
  LIVE: "bg-destructive text-destructive-foreground",
  SCHEDULED: "bg-primary text-primary-foreground",
  COMPLETED: "bg-success text-success-foreground",
};

const tierBadgeColors: Record<string, string> = {
  VIP: "border-warning text-warning",
  Sponsor: "border-success text-success",
  General: "border-muted-foreground text-muted-foreground",
  Premium: "border-primary text-primary",
  Standard: "border-muted-foreground text-muted-foreground",
  Free: "border-muted-foreground text-muted-foreground",
};

const Revenue = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof eventRevenueData[0] | null>(null);

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

      {/* Revenue by Type + Monthly Chart */}
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
          <CardContent className="p-6">
            <h3 className="mb-4 text-xs font-medium text-muted-foreground">Monthly Revenue Trend</h3>
            <div className="flex items-end justify-center gap-10">
              {monthlyRevenue.map((m, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative mb-2 flex items-end">
                    <div
                      className="w-14 rounded-md bg-primary"
                      style={{ height: `${(m.amount / 55000) * 140}px` }}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-primary">
                        ${(m.amount / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Revenue Breakdown Table */}
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <h3 className="text-sm font-semibold">Revenue by Event</h3>
              <p className="text-xs text-muted-foreground">Click an event to see ticket tier & buyer breakdown</p>
            </div>
            <Badge variant="outline" className="text-xs">{eventRevenueData.length} events</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium uppercase text-muted-foreground">
                  <th className="p-3 pl-6">Event</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Tickets Sold</th>
                  <th className="p-3">Avg Ticket</th>
                  <th className="p-3">Refunds</th>
                  <th className="p-3">Total Revenue</th>
                  <th className="p-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {eventRevenueData.map((event) => (
                  <tr key={event.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3 pl-6">
                      <p className="text-sm font-medium">{event.name}</p>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-[10px]">{event.type}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={`text-[10px] ${statusColors[event.status] || "bg-muted text-muted-foreground"}`}>
                        {event.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <Ticket className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{event.ticketsSold}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{event.avgTicket}</td>
                    <td className="p-3 text-sm text-destructive">{event.refunds}</td>
                    <td className="p-3">
                      <span className="text-sm font-bold text-success">{event.totalRevenue}</span>
                    </td>
                    <td className="p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-xs h-7"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <Eye className="h-3 w-3" /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* People Revenue Breakdown */}
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <h3 className="text-sm font-semibold">Revenue by People</h3>
              <p className="text-xs text-muted-foreground">Top spenders across all events</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{topSpendersPeople.length} top spenders</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium uppercase text-muted-foreground">
                  <th className="p-3 pl-6">Person</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Tier</th>
                  <th className="p-3">Events</th>
                  <th className="p-3">Avg / Event</th>
                  <th className="p-3">Total Spent</th>
                  <th className="p-3">Share</th>
                </tr>
              </thead>
              <tbody>
                {topSpendersPeople.map((person, i) => {
                  const totalAll = 8008;
                  const spent = parseFloat(person.totalSpent.replace(/[$,]/g, ""));
                  const share = Math.round((spent / totalAll) * 100);
                  return (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-3 pl-6">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-medium text-white shrink-0"
                            style={{ backgroundColor: person.color }}
                          >
                            {person.initials}
                          </div>
                          <span className="text-sm font-medium">{person.name}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{person.company}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className={`text-[10px] ${tierBadgeColors[person.tier] || ""}`}>
                          {person.tier}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">{person.events}</td>
                      <td className="p-3 text-sm text-muted-foreground">{person.avgPerEvent}</td>
                      <td className="p-3">
                        <span className="text-sm font-bold text-success">{person.totalSpent}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${share}%` }} />
                          </div>
                          <span className="text-[10px] text-muted-foreground">{share}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Event Detail Drawer */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedEvent(null)} />
          <div className="relative z-10 w-full max-w-lg bg-background shadow-2xl border-l overflow-y-auto animate-in slide-in-from-right-full duration-300">
            <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{selectedEvent.name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedEvent.type} • {selectedEvent.date}</p>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="p-2 rounded-md hover:bg-muted">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="px-6 py-4 space-y-5">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] uppercase font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-xl font-bold text-success mt-0.5">{selectedEvent.totalRevenue}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] uppercase font-medium text-muted-foreground">Tickets Sold</p>
                  <p className="text-xl font-bold mt-0.5">{selectedEvent.ticketsSold}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] uppercase font-medium text-muted-foreground">Avg Ticket Price</p>
                  <p className="text-lg font-bold mt-0.5">{selectedEvent.avgTicket}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-[10px] uppercase font-medium text-muted-foreground">Refunds</p>
                  <p className="text-lg font-bold text-destructive mt-0.5">{selectedEvent.refunds}</p>
                </div>
              </div>

              {/* Ticket Tier Breakdown */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Ticket Tiers</h3>
                <div className="space-y-3">
                  {selectedEvent.tiers.map((tier, idx) => (
                    <div key={idx} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                          <span className="text-sm font-medium">{tier.name}</span>
                        </div>
                        <span className="text-sm font-bold text-success">{tier.revenue}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{tier.sold} sold × {tier.price}</span>
                        <span>{selectedEvent.ticketsSold > 0 ? Math.round((tier.sold / selectedEvent.ticketsSold) * 100) : 0}% of total</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${selectedEvent.ticketsSold > 0 ? (tier.sold / selectedEvent.ticketsSold) * 100 : 0}%`,
                            backgroundColor: tier.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Buyers for this event */}
              {selectedEvent.topBuyers.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-3">Top Buyers</h3>
                  <div className="space-y-2">
                    {selectedEvent.topBuyers.map((buyer, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{buyer.name}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Building2 className="h-3 w-3 text-muted-foreground" />
                              <span className="text-[11px] text-muted-foreground">{buyer.company}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-success">{buyer.amount}</p>
                          <p className="text-[10px] text-muted-foreground">{buyer.tickets} tickets • {buyer.tier}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Revenue;
