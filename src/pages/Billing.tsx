import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Users, CreditCard, TrendingUp, Minus, Plus, Check, ExternalLink, Video, HardDrive, Sparkles, ShieldCheck, Headphones } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const STRIPE_DUMMY_LINK = "https://buy.stripe.com/test_aEU00000000000";

const ATTENDEE_TIERS = [
  { max: 500, label: "500", pricePerUser: 0 },
  { max: 1000, label: "1,000", pricePerUser: 0.50 },
  { max: 2500, label: "2,500", pricePerUser: 0.40 },
  { max: 5000, label: "5,000", pricePerUser: 0.35 },
  { max: 10000, label: "10,000", pricePerUser: 0.30 },
];

const STORAGE_OPTIONS = [
  { gb: 50, price: 0, label: "50 GB (included)" },
  { gb: 100, price: 29, label: "100 GB" },
  { gb: 250, price: 59, label: "250 GB" },
  { gb: 500, price: 99, label: "500 GB" },
  { gb: 1000, price: 149, label: "1 TB" },
];

const RECORDING_TIERS = [
  { hours: 10, price: 0, label: "10 hrs (included)" },
  { hours: 50, price: 49, label: "50 hrs" },
  { hours: 100, price: 89, label: "100 hrs" },
  { hours: 500, price: 199, label: "500 hrs" },
];

const ADD_ONS = [
  { id: "community", name: "SpatialChat Community", desc: "Discussion forums, member directory, groups", price: 49, icon: Users },
  { id: "registration", name: "Registration & Ticketing", desc: "Custom forms, payment collection, QR codes", price: 49, icon: Check },
  { id: "branding", name: "Custom Branding", desc: "White-label, custom domain, branded emails", price: 79, icon: Sparkles },
  { id: "sso", name: "SSO & Security", desc: "SAML SSO, advanced permissions, audit logs", price: 99, icon: ShieldCheck },
  { id: "priority", name: "Priority Support", desc: "24/7 dedicated support, SLA guarantee", price: 149, icon: Headphones },
];

const Billing = () => {
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [step, setStep] = useState(1); // 1=configure, 2=review, 3=confirmed
  const [attendeeTier, setAttendeeTier] = useState(0);
  const [storageTier, setStorageTier] = useState(0);
  const [recordingTier, setRecordingTier] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set(["community", "registration"]));

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const pricing = useMemo(() => {
    const basePlan = 899;
    const tier = ATTENDEE_TIERS[attendeeTier];
    const extraAttendees = tier.max > 500 ? (tier.max - 500) * tier.pricePerUser : 0;
    const storage = STORAGE_OPTIONS[storageTier].price;
    const recording = RECORDING_TIERS[recordingTier].price;
    const addOns = ADD_ONS.filter(a => selectedAddOns.has(a.id)).reduce((s, a) => s + a.price, 0);
    const total = basePlan + extraAttendees + storage + recording + addOns;
    return { basePlan, extraAttendees, storage, recording, addOns, total };
  }, [attendeeTier, storageTier, recordingTier, selectedAddOns]);

  const openUpgrade = () => {
    setStep(1);
    setUpgradeOpen(true);
  };

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
        <Button variant="outline" size="sm" onClick={openUpgrade}>Change plan</Button>
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

      {/* Plan Usage & Team */}
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
              <p className="text-xs text-muted-foreground">Get more attendees, recordings, storage, and priority support</p>
            </div>
          </div>
          <Button size="sm" className="gap-1" onClick={openUpgrade}>
            <CreditCard className="h-3.5 w-3.5" /> Upgrade Now
          </Button>
        </CardContent>
      </Card>

      {/* ===== UPGRADE DIALOG ===== */}
      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {step === 1 && "Configure Your Plan"}
              {step === 2 && "Review Your Order"}
              {step === 3 && "🎉 Upgrade Confirmed!"}
            </DialogTitle>
          </DialogHeader>

          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {step > s ? <Check className="h-3.5 w-3.5" /> : s}
                </div>
                {s < 3 && <div className={`h-0.5 w-8 rounded ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
            <span className="ml-2 text-xs text-muted-foreground">
              {step === 1 ? "Configure" : step === 2 ? "Review" : "Done"}
            </span>
          </div>

          {/* STEP 1 — Configure */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Attendees */}
              <div>
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Max Attendees</h4>
                <p className="text-xs text-muted-foreground mb-3">Scale your events to reach more people</p>
                <div className="flex gap-2 flex-wrap">
                  {ATTENDEE_TIERS.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setAttendeeTier(i)}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${attendeeTier === i ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`}
                    >
                      <span className="block text-base font-bold">{t.label}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {t.pricePerUser === 0 ? "Included" : `+$${((t.max - 500) * t.pricePerUser).toFixed(0)}/mo`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Recording hours */}
              <div>
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Video className="h-4 w-4 text-primary" /> Recording Hours</h4>
                <p className="text-xs text-muted-foreground mb-3">Store and replay your event recordings</p>
                <div className="flex gap-2 flex-wrap">
                  {RECORDING_TIERS.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setRecordingTier(i)}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${recordingTier === i ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`}
                    >
                      <span className="block text-base font-bold">{t.label}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {t.price === 0 ? "Included" : `+$${t.price}/mo`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Storage */}
              <div>
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><HardDrive className="h-4 w-4 text-primary" /> Storage</h4>
                <p className="text-xs text-muted-foreground mb-3">Media, recordings, and file storage</p>
                <div className="flex gap-2 flex-wrap">
                  {STORAGE_OPTIONS.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setStorageTier(i)}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${storageTier === i ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`}
                    >
                      <span className="block text-base font-bold">{t.label}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {t.price === 0 ? "Included" : `+$${t.price}/mo`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Add-ons */}
              <div>
                <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Add-ons</h4>
                <p className="text-xs text-muted-foreground mb-3">Enhance your platform with powerful features</p>
                <div className="space-y-2">
                  {ADD_ONS.map(addon => (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors ${selectedAddOns.has(addon.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${selectedAddOns.has(addon.id) ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                          <addon.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{addon.name}</p>
                          <p className="text-xs text-muted-foreground">{addon.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold">${addon.price}/mo</span>
                        <Switch checked={selectedAddOns.has(addon.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky total + next */}
              <div className="sticky bottom-0 bg-background pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Estimated monthly total</p>
                    <p className="text-2xl font-bold text-primary">${pricing.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}/mo</p>
                  </div>
                  <Button onClick={() => setStep(2)} className="gap-1.5">
                    Review Order <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — Review */}
          {step === 2 && (
            <div className="space-y-5">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[10px] uppercase tracking-wider">Item</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider text-right">Monthly</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-sm">SpatialChat Webinar Plan (Base)</TableCell>
                        <TableCell className="text-sm text-right font-medium">${pricing.basePlan.toFixed(2)}</TableCell>
                      </TableRow>
                      {pricing.extraAttendees > 0 && (
                        <TableRow>
                          <TableCell className="text-sm">Additional attendees ({ATTENDEE_TIERS[attendeeTier].label} max)</TableCell>
                          <TableCell className="text-sm text-right font-medium">${pricing.extraAttendees.toFixed(2)}</TableCell>
                        </TableRow>
                      )}
                      {pricing.recording > 0 && (
                        <TableRow>
                          <TableCell className="text-sm">Recording — {RECORDING_TIERS[recordingTier].label}</TableCell>
                          <TableCell className="text-sm text-right font-medium">${pricing.recording.toFixed(2)}</TableCell>
                        </TableRow>
                      )}
                      {pricing.storage > 0 && (
                        <TableRow>
                          <TableCell className="text-sm">Storage — {STORAGE_OPTIONS[storageTier].label}</TableCell>
                          <TableCell className="text-sm text-right font-medium">${pricing.storage.toFixed(2)}</TableCell>
                        </TableRow>
                      )}
                      {ADD_ONS.filter(a => selectedAddOns.has(a.id)).map(a => (
                        <TableRow key={a.id}>
                          <TableCell className="text-sm">{a.name}</TableCell>
                          <TableCell className="text-sm text-right font-medium">${a.price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total:</TableCell>
                        <TableCell className="text-right text-lg font-bold text-primary">${pricing.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground space-y-1">
                <p>• You will be charged on <strong className="text-foreground">March 1, 2026</strong></p>
                <p>• Changes take effect immediately after payment</p>
                <p>• You can downgrade anytime from your billing settings</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>← Back to configure</Button>
                <a href={STRIPE_DUMMY_LINK} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); setStep(3); }}>
                  <Button className="gap-2">
                    <CreditCard className="h-4 w-4" /> Pay with Stripe <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
              </div>
            </div>
          )}

          {/* STEP 3 — Confirmed */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">You're all set!</h3>
                <p className="text-sm text-muted-foreground mt-1">Your plan has been upgraded successfully.</p>
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Attendees</p>
                      <p className="text-lg font-bold">{ATTENDEE_TIERS[attendeeTier].label}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Recordings</p>
                      <p className="text-lg font-bold">{RECORDING_TIERS[recordingTier].label}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Storage</p>
                      <p className="text-lg font-bold">{STORAGE_OPTIONS[storageTier].label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <CreditCard className="h-3.5 w-3.5" />
                <span>New monthly total: <strong className="text-foreground">${pricing.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}/mo</strong></span>
              </div>
              <div className="flex justify-center gap-2 pt-2">
                <a href={STRIPE_DUMMY_LINK} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-1">
                    View in Stripe <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
                <Button size="sm" onClick={() => setUpgradeOpen(false)}>Done</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
