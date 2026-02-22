import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Users, CreditCard, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const subscriptionBreakdown = [
  { description: "SpatialChat Webinar Plan", cost: "$899.00" },
  { description: "SpatialChat Community", cost: "$49.00" },
  { description: "Registration Add-on", cost: "$49.00" },
];

const Billing = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">SpatialChat PROD /</p>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
      </div>

      {/* Plan, Cycle, Users, Monthly */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current Plan</p>
            <p className="mt-1 text-lg font-bold">Scale</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Next Billing Cycle</p>
            <p className="mt-1 text-lg font-bold">March 1, 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Active Users</p>
            <div className="mt-1 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <p className="text-lg font-bold">500</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Monthly Payment</p>
            <p className="mt-1 text-lg font-bold text-primary">$999.00</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">Change plan</Button>
        <a href="https://app.spatial.chat/s/JZKXrs3KFfcHdwJIpyrR?room=7nsHiBxuj1f7T356NQLB&hidePronounSpaceId=SSVrdUFoldBhNy4brmEC" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="gap-1">
            Manage <ArrowUpRight className="h-3 w-3" />
          </Button>
        </a>
      </div>

      {/* Subscription Breakdown */}
      <Card>
        <CardContent className="p-0">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="text-sm font-semibold">Monthly Subscription Breakdown</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px] uppercase tracking-wider">Description</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionBreakdown.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{row.description}</TableCell>
                  <TableCell className="text-sm text-right font-medium">{row.cost}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total:</TableCell>
                <TableCell className="text-right font-bold text-primary">$999.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Community & Users */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold mb-3">Plan Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">WebRTC Minutes</span>
                  <span className="font-medium">3,215,277 / 1,500,000</span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-[10px] text-destructive mt-0.5">Over limit — additional charges apply</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Data Transfer</span>
                  <span className="font-medium">10.88 TB / 3.00 TB</span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-[10px] text-destructive mt-0.5">Over limit — additional charges apply</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Active Spaces</span>
                  <span className="font-medium">18 / 50</span>
                </div>
                <Progress value={36} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Team Members</h3>
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Users className="h-3 w-3" /> Add Users
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { name: "John Doe", email: "john@acme.com", role: "Owner" },
                { name: "Jane Smith", email: "jane@acme.com", role: "Admin" },
                { name: "Mike Johnson", email: "mike@acme.com", role: "Member" },
              ].map((u, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {u.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{u.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Upgrade your plan</p>
              <p className="text-xs text-muted-foreground">Get more minutes, bandwidth, and priority support</p>
            </div>
          </div>
          <Button size="sm" className="gap-1">
            <CreditCard className="h-3.5 w-3.5" /> Upgrade Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
