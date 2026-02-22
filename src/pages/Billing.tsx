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

const usageData = [
  { description: "Scale: Monthly subscription", amount: "", cost: "$500.00" },
  { description: "Scale: 1,500,000 incl. WebRTC participant minutes", amount: "1,500,000 min", cost: "$0.00" },
  { description: "Scale: Additional WebRTC participant minutes ($0.4 per 1000 minutes)", amount: "1,715,277 min", cost: "$686.00" },
  { description: "Scale: 3000GB incl. Downstream data transfer", amount: "3.00 TB", cost: "$0.00" },
  { description: "Scale: Additional Downstream data transfer ($0.1 per GB)", amount: "7.88 TB", cost: "$788.20" },
];

const Billing = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">SpatialChat PROD /</p>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
      </div>

      {/* Plan & Cycle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <Card className="min-w-[200px]">
            <CardContent className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current Plan</p>
              <p className="mt-1 text-lg font-bold">Scale</p>
            </CardContent>
          </Card>
          <Card className="min-w-[200px]">
            <CardContent className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Next Billing Cycle</p>
              <p className="mt-1 text-lg font-bold">March 1, 2026</p>
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
      </div>

      {/* Usage Summary */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Usage</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Bandwidth Today</p>
              <p className="mt-2 text-3xl font-bold text-primary">14 <span className="text-base font-medium text-muted-foreground">MB</span></p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Bandwidth in February</p>
              <p className="mt-2 text-3xl font-bold text-primary">10.88 <span className="text-base font-medium text-muted-foreground">TB</span></p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Next Invoice</p>
              <p className="mt-2 text-3xl font-bold text-primary">$1,974.20</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Usage Table */}
      <Card>
        <CardContent className="p-0">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="text-sm font-semibold">February 2026 Usage</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px] uppercase tracking-wider">Description</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider text-right">Amount</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usageData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{row.description}</TableCell>
                  <TableCell className="text-sm text-right text-muted-foreground">{row.amount}</TableCell>
                  <TableCell className="text-sm text-right font-medium">{row.cost}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total:</TableCell>
                <TableCell className="text-right font-bold">$1,974.20</TableCell>
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
