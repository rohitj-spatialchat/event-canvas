import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, Users, DollarSign, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, label: "Details", icon: CalendarDays },
  { id: 2, label: "Schedule", icon: Clock },
  { id: 3, label: "Tickets", icon: DollarSign },
  { id: 4, label: "Review", icon: CheckCircle2 },
];

const eventTypes = ["Webinar", "Conference", "Workshop", "Meeting", "Internal", "Networking"];

export function CreateEventDialog({ open, onOpenChange }: CreateEventDialogProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    location: "virtual",
    date: "",
    startTime: "",
    endTime: "",
    timezone: "UTC",
    capacity: "",
    ticketType: "free",
    ticketPrice: "",
    requireApproval: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canNext = () => {
    if (step === 1) return form.name.trim() && form.type;
    if (step === 2) return form.date && form.startTime;
    if (step === 3) return form.capacity && (form.ticketType === "free" || form.ticketPrice);
    return true;
  };

  const handleSubmit = () => {
    toast.success("Event created successfully!", {
      description: `"${form.name}" has been created.`,
    });
    onOpenChange(false);
    setStep(1);
    setForm({
      name: "",
      type: "",
      description: "",
      location: "virtual",
      date: "",
      startTime: "",
      endTime: "",
      timezone: "UTC",
      capacity: "",
      ticketType: "free",
      ticketPrice: "",
      requireApproval: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl">Create New Event</DialogTitle>
          <DialogDescription>Fill in the details to create your event.</DialogDescription>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-1 px-6 pb-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center gap-1 flex-1">
                <button
                  onClick={() => s.id < step && setStep(s.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isDone
                      ? "bg-primary/10 text-primary cursor-pointer"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {s.label}
                </button>
                {i < steps.length - 1 && (
                  <div className={`h-px flex-1 ${isDone ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t px-6 py-5 min-h-[320px]">
          {/* Step 1: Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Event Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Product Launch Webinar"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={100}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event Type *</Label>
                  <Select value={form.type} onValueChange={(v) => update("type", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((t) => (
                        <SelectItem key={t} value={t.toLowerCase()}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={form.location} onValueChange={(v) => update("location", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="virtual">
                        <span className="flex items-center gap-1.5">🌐 Virtual</span>
                      </SelectItem>
                      <SelectItem value="in-person">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> In-Person</span>
                      </SelectItem>
                      <SelectItem value="hybrid">
                        <span className="flex items-center gap-1.5">🔄 Hybrid</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event..."
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={3}
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">{form.description.length}/500</p>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={form.startTime}
                    onChange={(e) => update("startTime", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={form.endTime}
                    onChange={(e) => update("endTime", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select value={form.timezone} onValueChange={(v) => update("timezone", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern (EST)</SelectItem>
                    <SelectItem value="CST">Central (CST)</SelectItem>
                    <SelectItem value="PST">Pacific (PST)</SelectItem>
                    <SelectItem value="IST">India (IST)</SelectItem>
                    <SelectItem value="CET">Central Europe (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Tickets */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g. 500"
                    className="pl-9"
                    value={form.capacity}
                    onChange={(e) => update("capacity", e.target.value)}
                    min={1}
                    max={100000}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Ticket Type</Label>
                <div className="flex gap-3">
                  {["free", "paid"].map((t) => (
                    <button
                      key={t}
                      onClick={() => update("ticketType", t)}
                      className={`flex-1 rounded-lg border-2 p-4 text-center text-sm font-medium transition-colors ${
                        form.ticketType === t
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {t === "free" ? "🎟️ Free Event" : "💰 Paid Event"}
                    </button>
                  ))}
                </div>
              </div>
              {form.ticketType === "paid" && (
                <div className="space-y-2">
                  <Label htmlFor="ticketPrice">Ticket Price *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="ticketPrice"
                      type="number"
                      placeholder="e.g. 29.99"
                      className="pl-9"
                      value={form.ticketPrice}
                      onChange={(e) => update("ticketPrice", e.target.value)}
                      min={0}
                      step={0.01}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium">Require Registration Approval</p>
                  <p className="text-xs text-muted-foreground">Manually approve each registration</p>
                </div>
                <Switch
                  checked={form.requireApproval}
                  onCheckedChange={(v) => update("requireApproval", v)}
                />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{form.name || "Untitled Event"}</h3>
                  <Badge variant="secondary" className="capitalize">{form.type || "—"}</Badge>
                </div>
                {form.description && (
                  <p className="text-sm text-muted-foreground">{form.description}</p>
                )}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>{form.date || "—"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{form.startTime || "—"}{form.endTime ? ` – ${form.endTime}` : ""} ({form.timezone})</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="capitalize">{form.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{form.capacity || "—"} attendees</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{form.ticketType === "free" ? "Free" : `$${form.ticketPrice}`}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          <Button
            variant="outline"
            onClick={() => (step === 1 ? onOpenChange(false) : setStep(step - 1))}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Step {step} of {steps.length}</span>
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Create Event</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
