import { useState } from "react";
import { Search, ExternalLink, Check, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Integration = {
  name: string;
  description: string;
  category: string;
  icon: string;
  connected: boolean;
  popular?: boolean;
};

const integrations: Integration[] = [
  { name: "HubSpot", description: "Sync contacts, deals, and event data with your HubSpot CRM", category: "CRM", icon: "🟠", connected: true, popular: true },
  { name: "Salesforce", description: "Push attendee data and engagement metrics to Salesforce", category: "CRM", icon: "☁️", connected: false, popular: true },
  { name: "Mailchimp", description: "Automate email campaigns and manage subscriber lists", category: "Email", icon: "🐵", connected: true },
  { name: "SendGrid", description: "Transactional emails for confirmations and reminders", category: "Email", icon: "📧", connected: false },
  { name: "Google Analytics", description: "Track event page traffic, conversions, and user behavior", category: "Analytics", icon: "📊", connected: true, popular: true },
  { name: "Mixpanel", description: "Advanced product analytics and user engagement tracking", category: "Analytics", icon: "🟣", connected: false },
  { name: "Zapier", description: "Connect 5,000+ apps with automated workflows", category: "Automation", icon: "⚡", connected: true, popular: true },
  { name: "Make", description: "Visual automation platform for complex workflows", category: "Automation", icon: "🔮", connected: false },
  { name: "Slack", description: "Get real-time notifications and manage events from Slack", category: "Communication", icon: "💬", connected: true },
  { name: "Microsoft Teams", description: "Event alerts and collaboration in Teams channels", category: "Communication", icon: "🟦", connected: false },
  { name: "Stripe", description: "Process payments, manage subscriptions, and handle refunds", category: "Payments", icon: "💳", connected: true, popular: true },
  { name: "PayPal", description: "Accept PayPal payments for event registrations", category: "Payments", icon: "🅿️", connected: false },
  { name: "Google Calendar", description: "Sync event schedules with Google Calendar", category: "Calendar", icon: "📅", connected: true },
  { name: "Outlook Calendar", description: "Sync events and send calendar invites via Outlook", category: "Calendar", icon: "📆", connected: false },
  { name: "Zoom", description: "Create and manage Zoom meetings for virtual sessions", category: "Video", icon: "🎥", connected: false, popular: true },
  { name: "Webhooks", description: "Send real-time event data to any endpoint via HTTP", category: "Developer", icon: "🔗", connected: false },
];

const categories = ["All", "CRM", "Email", "Analytics", "Automation", "Communication", "Payments", "Calendar", "Video", "Developer"];

const Integrations = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = integrations.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || i.category === category;
    return matchesSearch && matchesCategory;
  });

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground">
            Connect your favorite tools to supercharge your events
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-sm">
            <Check className="h-3.5 w-3.5 text-success" />
            {connectedCount} Connected
          </Badge>
          <Button variant="outline" className="gap-2">
            <Zap className="h-4 w-4" /> Request Integration
          </Button>
        </div>
      </div>

      {/* Search + Categories */}
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search integrations..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(integration => (
          <Card key={integration.name} className="relative overflow-hidden transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-xl">
                    {integration.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{integration.name}</h3>
                      {integration.popular && (
                        <Badge className="bg-warning/15 text-warning text-[10px] px-1.5 py-0 font-semibold border-0">
                          POPULAR
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{integration.category}</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {integration.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                {integration.connected ? (
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-xs font-medium text-success">Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                    <span className="text-xs text-muted-foreground">Not connected</span>
                  </div>
                )}
                <Button
                  variant={integration.connected ? "outline" : "default"}
                  size="sm"
                  className="h-8 gap-1.5 text-xs"
                >
                  {integration.connected ? (
                    <>Settings <ExternalLink className="h-3 w-3" /></>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-medium">No integrations found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Integrations;
