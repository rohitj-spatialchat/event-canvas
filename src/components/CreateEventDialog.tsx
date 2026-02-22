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
import { RegistrationPageBuilder, FormField } from "@/components/RegistrationPageBuilder";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  DollarSign,
  CheckCircle2,
  Video,
  Globe,
  Presentation,
  Handshake,
  BookOpen,
  Mic,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, label: "Type", icon: Globe },
  { id: 2, label: "Details", icon: CalendarDays },
  { id: 3, label: "Schedule", icon: Clock },
  { id: 4, label: "Tickets", icon: DollarSign },
  { id: 5, label: "Registration", icon: FileText },
  { id: 6, label: "Review", icon: CheckCircle2 },
];

const eventTypeOptions = [
  {
    id: "webinar",
    label: "Webinar",
    description: "Host a live presentation with Q&A, polls, and screen sharing for large audiences",
    icon: Video,
    features: ["Screen sharing", "Live Q&A", "Polls", "Recording"],
    color: "hsl(235, 65%, 55%)",
  },
  {
    id: "virtual-networking",
    label: "Virtual Networking",
    description: "Create spatial rooms where attendees can move around and have spontaneous conversations",
    icon: Handshake,
    features: ["Breakout rooms", "1:1 video", "Spatial audio", "Speed networking"],
    color: "hsl(152, 55%, 45%)",
  },
  {
    id: "conference",
    label: "Conference",
    description: "Multi-session event with keynotes, breakout tracks, and an expo hall",
    icon: Presentation,
    features: ["Multi-track", "Expo hall", "Keynotes", "Sponsor booths"],
    color: "hsl(38, 92%, 50%)",
  },
  {
    id: "workshop",
    label: "Workshop",
    description: "Hands-on interactive session with collaboration tools and small group activities",
    icon: BookOpen,
    features: ["Collaboration", "Whiteboards", "Breakout groups", "Hands-on"],
    color: "hsl(0, 72%, 55%)",
  },
  {
    id: "meeting",
    label: "Team Meeting",
    description: "Internal meeting space with agenda tracking, notes, and action items",
    icon: Users,
    features: ["Agenda", "Meeting notes", "Action items", "Screen share"],
    color: "hsl(270, 55%, 55%)",
  },
  {
    id: "hybrid",
    label: "Hybrid Event",
    description: "Combine in-person and virtual attendees with synchronized experiences",
    icon: Mic,
    features: ["In-person + virtual", "Live stream", "Chat", "Networking"],
    color: "hsl(195, 65%, 45%)",
  },
];

const defaultFields: FormField[] = [
  { id: "f1", type: "text", label: "Full Name", placeholder: "Enter your full name", required: true },
  { id: "f2", type: "email", label: "Email Address", placeholder: "you@example.com", required: true },
  { id: "f3", type: "text", label: "Company", placeholder: "Your company name", required: false },
  { id: "f4", type: "text", label: "Job Title", placeholder: "Your role", required: false },
];

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
  const [regFields, setRegFields] = useState<FormField[]>(defaultFields);
  

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedType = eventTypeOptions.find((t) => t.id === form.type);

  const canNext = () => {
    if (step === 1) return !!form.type;
    if (step === 2) return form.name.trim().length > 0;
    if (step === 3) return form.date && form.startTime;
    if (step === 4) return form.capacity && (form.ticketType === "free" || form.ticketPrice);
    if (step === 5) return regFields.length > 0;
    return true;
  };

  const handleSubmit = () => {
    toast.success("Event created successfully!", {
      description: `"${form.name}" has been created with ${regFields.length} registration fields.`,
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
    setRegFields([...defaultFields]);
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`p-0 gap-0 max-h-[90vh] flex flex-col ${step === 5 ? "max-w-5xl" : "max-w-2xl"}`}>
        <DialogHeader className="p-6 pb-4 shrink-0">
          <DialogTitle className="text-xl">Create New Event</DialogTitle>
          <DialogDescription>
            {step === 1 && "Choose the type of event you want to create."}
            {step === 2 && "Fill in the basic event details."}
            {step === 3 && "Set the date and time for your event."}
            {step === 4 && "Configure tickets and capacity."}
            {step === 5 && "Build your registration form."}
            {step === 6 && "Review everything before creating."}
          </DialogDescription>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-1 px-6 pb-4 shrink-0 overflow-x-auto">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center gap-1 flex-1 min-w-0">
                <button
                  onClick={() => s.id < step && setStep(s.id)}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isDone
                      ? "bg-primary/10 text-primary cursor-pointer"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`h-px flex-1 min-w-2 ${isDone ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t px-6 py-5 min-h-[320px] overflow-y-auto flex-1">
          {/* Step 1: Event Type */}
          {step === 1 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {eventTypeOptions.map((type) => {
                const Icon = type.icon;
                const isSelected = form.type === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => update("type", type.id)}
                    className={`group relative rounded-xl border-2 p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border hover:border-primary/40 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                        style={{ backgroundColor: type.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm">{type.label}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {type.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    {isSelected && (
                      <div className="absolute right-3 top-3">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-4">
              {selectedType && (
                <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 mb-4">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white"
                    style={{ backgroundColor: selectedType.color }}
                  >
                    <selectedType.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{selectedType.label}</p>
                    <p className="text-xs text-muted-foreground">Event type selected</p>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Event Name *</Label>
                <Input
                  id="name"
                  placeholder={
                    form.type === "webinar"
                      ? "e.g. Product Launch Webinar"
                      : form.type === "virtual-networking"
                      ? "e.g. Startup Founders Mixer"
                      : "e.g. Annual Conference 2026"
                  }
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={100}
                />
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

          {/* Step 3: Schedule */}
          {step === 3 && (
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

          {/* Step 4: Tickets */}
          {step === 4 && (
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

          {/* Step 5: Registration Page Builder */}
          {step === 5 && (
            <RegistrationPageBuilder regFields={regFields} setRegFields={setRegFields} />
          )}

          {/* Step 6: Review */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedType && (
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white"
                        style={{ backgroundColor: selectedType.color }}
                      >
                        <selectedType.icon className="h-4 w-4" />
                      </div>
                    )}
                    <h3 className="font-semibold text-lg">{form.name || "Untitled Event"}</h3>
                  </div>
                  <Badge variant="secondary" className="capitalize">{selectedType?.label || "—"}</Badge>
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
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{regFields.length} registration fields</span>
                  </div>
                </div>
              </div>

              {/* Registration form preview */}
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-semibold mb-3">Registration Form Preview</h4>
                <div className="space-y-3">
                  {regFields.map((field) => (
                    <div key={field.id} className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">
                        {field.label} {field.required && <span className="text-destructive">*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <div className="h-16 rounded-md border bg-muted/30" />
                      ) : field.type === "select" ? (
                        <div className="flex h-9 items-center rounded-md border bg-muted/30 px-3 text-xs text-muted-foreground">
                          Select {field.label.toLowerCase()}...
                        </div>
                      ) : field.type === "checkbox" ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded border bg-muted/30" />
                          <span className="text-xs text-muted-foreground">{field.label}</span>
                        </div>
                      ) : (
                        <div className="h-9 rounded-md border bg-muted/30" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-6 py-4 shrink-0">
          <Button
            variant="outline"
            onClick={() => (step === 1 ? onOpenChange(false) : setStep(step - 1))}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Step {step} of {steps.length}</span>
            {step < 6 ? (
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