import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  Plus,
  Trash2,
  Video,
  HardDrive,
  Users,
  Sparkles,
  Layers,
  Eye,
  Settings2,
  ShieldCheck,
  Headphones,
  ClipboardList,
} from "lucide-react";

// ---------- Types ----------
type CapacityOption = { id: string; label: string; price: number };
type CapacityGroup = {
  key: "recording" | "storage" | "attendees";
  name: string;
  unit: string;
  icon: typeof Video;
  included: CapacityOption;
  upgrades: CapacityOption[];
};
type Feature = { id: string; name: string; enabled: boolean };
type AddOn = { id: string; name: string; desc: string; price: number };

// ---------- Mock plan version state ----------
const PRODUCTS = ["Virtual Events", "Webinars", "Community"];
const PLANS = ["Starter", "Business", "Enterprise"];
const VERSIONS = ["V1", "V2", "V3"];

const initialCapacity: CapacityGroup[] = [
  {
    key: "recording",
    name: "Recording",
    unit: "h",
    icon: Video,
    included: { id: "r-inc", label: "10h", price: 0 },
    upgrades: [
      { id: "r-1", label: "50h", price: 49 },
      { id: "r-2", label: "100h", price: 89 },
      { id: "r-3", label: "500h", price: 199 },
    ],
  },
  {
    key: "storage",
    name: "Storage",
    unit: "GB",
    icon: HardDrive,
    included: { id: "s-inc", label: "50GB", price: 0 },
    upgrades: [
      { id: "s-1", label: "100GB", price: 29 },
      { id: "s-2", label: "250GB", price: 59 },
      { id: "s-3", label: "500GB", price: 99 },
      { id: "s-4", label: "1TB", price: 149 },
    ],
  },
  {
    key: "attendees",
    name: "Attendees",
    unit: "",
    icon: Users,
    included: { id: "a-inc", label: "500", price: 0 },
    upgrades: [
      { id: "a-1", label: "1000", price: 25 },
      { id: "a-2", label: "2500", price: 80 },
      { id: "a-3", label: "5000", price: 175 },
      { id: "a-4", label: "10000", price: 250 },
    ],
  },
];

const initialFeatures: Feature[] = [
  { id: "f-stages", name: "Multi-stage Events", enabled: true },
  { id: "f-breakout", name: "Breakout Rooms", enabled: true },
  { id: "f-polls", name: "Polls & Q&A", enabled: true },
  { id: "f-analytics", name: "Advanced Analytics", enabled: true },
  { id: "f-branding", name: "Custom Branding", enabled: false },
];

const initialAddOns: AddOn[] = [
  { id: "ao-community", name: "SpatialChat Community", desc: "Forums, member directory", price: 49 },
  { id: "ao-registration", name: "Registration & Ticketing", desc: "Custom forms, QR codes", price: 49 },
  { id: "ao-sso", name: "SSO & Security", desc: "SAML SSO, audit logs", price: 99 },
  { id: "ao-support", name: "Priority Support", desc: "24/7 SLA support", price: 149 },
];

// ---------- Page ----------
const PlanBuilder = () => {
  const [product, setProduct] = useState(PRODUCTS[0]);
  const [plan, setPlan] = useState(PLANS[1]);
  const [version, setVersion] = useState(VERSIONS[2]);
  const [basePrice, setBasePrice] = useState(899);

  const [capacity, setCapacity] = useState<CapacityGroup[]>(initialCapacity);
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);
  const [addOns, setAddOns] = useState<AddOn[]>(initialAddOns);

  const updateGroup = (key: CapacityGroup["key"], patch: Partial<CapacityGroup>) =>
    setCapacity((prev) => prev.map((g) => (g.key === key ? { ...g, ...patch } : g)));

  const updateUpgrade = (key: CapacityGroup["key"], id: string, patch: Partial<CapacityOption>) =>
    setCapacity((prev) =>
      prev.map((g) =>
        g.key === key
          ? { ...g, upgrades: g.upgrades.map((u) => (u.id === id ? { ...u, ...patch } : u)) }
          : g,
      ),
    );

  const addUpgrade = (key: CapacityGroup["key"]) =>
    setCapacity((prev) =>
      prev.map((g) =>
        g.key === key
          ? {
              ...g,
              upgrades: [
                ...g.upgrades,
                { id: `${key}-${Date.now()}`, label: "New tier", price: 0 },
              ],
            }
          : g,
      ),
    );

  const removeUpgrade = (key: CapacityGroup["key"], id: string) =>
    setCapacity((prev) =>
      prev.map((g) =>
        g.key === key ? { ...g, upgrades: g.upgrades.filter((u) => u.id !== id) } : g,
      ),
    );

  const versionLabel = useMemo(
    () => `${product} > ${plan} > ${version}`,
    [product, plan, version],
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Plan Builder</h1>
          <p className="text-sm text-muted-foreground">
            Configure features, capacity options, and add-ons for a specific plan version.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>{PRODUCTS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={plan} onValueChange={setPlan}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>{PLANS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={version} onValueChange={setVersion}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent>{VERSIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
          </Select>
          <Badge variant="outline" className="ml-2">{versionLabel}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
        {/* LEFT: Configuration */}
        <div className="space-y-6">
          {/* Plan basics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-primary" /> Plan Basics
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Display name</Label>
                <Input value={`${product} ${plan}`} readOnly />
              </div>
              <div className="space-y-1.5">
                <Label>Base price (monthly USD)</Label>
                <Input type="number" value={basePrice} onChange={(e) => setBasePrice(Number(e.target.value))} />
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {features.map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                  <span className="text-sm">{f.name}</span>
                  <Switch
                    checked={f.enabled}
                    onCheckedChange={(v) =>
                      setFeatures((prev) => prev.map((x) => (x.id === f.id ? { ...x, enabled: v } : x)))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Capacity Options (the new section) */}
          <Card className="border-primary/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" /> Capacity Options
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Define included capacity and upgrade tiers customers will see in checkout. Separate from Features and Add-ons.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              {capacity.map((g) => (
                <div key={g.key} className="rounded-lg border border-border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <g.icon className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">{g.name}</h4>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      {g.upgrades.length} upgrade tier{g.upgrades.length === 1 ? "" : "s"}
                    </Badge>
                  </div>

                  {/* Included */}
                  <div className="grid grid-cols-[1fr_140px] gap-2 items-end">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Included option</Label>
                      <Input
                        value={g.included.label}
                        onChange={(e) =>
                          updateGroup(g.key, { included: { ...g.included, label: e.target.value } })
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Price</Label>
                      <Input value="Included" readOnly />
                    </div>
                  </div>

                  <Separator />

                  {/* Upgrade options */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Upgrade options</Label>
                    {g.upgrades.map((u) => (
                      <div key={u.id} className="grid grid-cols-[1fr_140px_40px] gap-2 items-center">
                        <Input
                          value={u.label}
                          onChange={(e) => updateUpgrade(g.key, u.id, { label: e.target.value })}
                          placeholder="e.g. 100GB"
                        />
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">+$</span>
                          <Input
                            type="number"
                            className="pl-8"
                            value={u.price}
                            onChange={(e) => updateUpgrade(g.key, u.id, { price: Number(e.target.value) })}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeUpgrade(g.key, u.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addUpgrade(g.key)} className="mt-1">
                      <Plus className="h-3.5 w-3.5" /> Add upgrade tier
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Add-ons */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Add-ons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {addOns.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                  <div>
                    <p className="text-sm font-medium">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">+${a.price}/mo</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => setAddOns((prev) => prev.filter((x) => x.id !== a.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Discard</Button>
            <Button>Save {version}</Button>
          </div>
        </div>

        {/* RIGHT: Customer Preview */}
        <div className="xl:sticky xl:top-6 self-start">
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" /> Customer Preview
              </CardTitle>
              <p className="text-xs text-muted-foreground">{versionLabel}</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-lg bg-background border border-border p-4">
                <p className="text-xs text-muted-foreground">{plan} plan</p>
                <p className="text-2xl font-semibold">${basePrice}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
              </div>

              {/* Features in preview */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">What's included</p>
                <ul className="space-y-1.5">
                  {features.filter((f) => f.enabled).map((f) => (
                    <li key={f.id} className="flex items-center gap-2 text-sm">
                      <Check className="h-3.5 w-3.5 text-primary" /> {f.name}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Capacity in preview */}
              <div className="space-y-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Capacity</p>
                {capacity.map((g) => (
                  <div key={g.key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <g.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{g.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="rounded-full">
                        {g.included.label} · Included
                      </Badge>
                      {g.upgrades.map((u) => (
                        <Badge key={u.id} variant="outline" className="rounded-full">
                          {u.label} <span className="ml-1 text-primary">+${u.price}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Add-ons in preview */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Optional add-ons</p>
                <ul className="space-y-1.5">
                  {addOns.map((a) => (
                    <li key={a.id} className="flex items-center justify-between text-sm">
                      <span>{a.name}</span>
                      <span className="text-muted-foreground">+${a.price}/mo</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full">
                <ClipboardList className="h-4 w-4" /> Continue to checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlanBuilder;
