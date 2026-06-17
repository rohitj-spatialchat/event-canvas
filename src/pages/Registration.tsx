import { useState } from "react";
import {
  ChevronLeft, X, Check, Radio, LayoutGrid, Pencil, Sparkles, FileText, Image as ImageIcon,
  Calendar, Type, Square, Star, Globe, Camera, Code2, MessageSquare, Send, ChevronRight, Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type View = "wizard" | "builder";

const widgets = [
  { label: "Schedule", icon: Calendar },
  { label: "Contact Form", icon: FileText },
  { label: "Media Slider", icon: ImageIcon },
  { label: "Text", icon: Type },
  { label: "Button", icon: Square },
  { label: "Image", icon: ImageIcon },
  { label: "Icon", icon: Star },
  { label: "Map", icon: Globe },
  { label: "Photo Gallery", icon: Camera },
  { label: "Embed HTML", icon: Code2 },
];

const Registration = () => {
  const [view, setView] = useState<View>("wizard");
  const [wizardStep, setWizardStep] = useState<1 | 2>(1);
  const [eventKind, setEventKind] = useState<"webinar" | "virtual">("webinar");
  const [tab, setTab] = useState<"registration" | "landing" | "branding">("registration");

  if (view === "wizard") {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="relative w-full max-w-3xl rounded-2xl bg-card p-10 shadow-lg">
          <button className="absolute right-5 top-5 text-muted-foreground hover:text-foreground" onClick={() => setWizardStep(1)}>
            <X className="h-5 w-5" />
          </button>

          {/* Stepper */}
          <div className="mb-8 flex items-center gap-3">
            <StepDot n={1} active={wizardStep >= 1} done={wizardStep > 1} />
            <div className={`h-0.5 w-16 ${wizardStep > 1 ? "bg-success" : "bg-muted"}`} />
            <StepDot n={2} active={wizardStep === 2} done={false} />
          </div>

          {wizardStep === 1 ? (
            <>
              <h2 className="text-2xl font-bold">What kind of event?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Choose the format — you can customize everything later.</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <KindCard
                  selected={eventKind === "webinar"}
                  onClick={() => setEventKind("webinar")}
                  icon={<Radio className="h-6 w-6 text-primary" />}
                  iconBg="bg-primary/10"
                  title="Webinar"
                  desc="One-to-many broadcast — speakers on stage, audience watching."
                />
                <KindCard
                  selected={eventKind === "virtual"}
                  onClick={() => setEventKind("virtual")}
                  icon={<LayoutGrid className="h-6 w-6 text-success" />}
                  iconBg="bg-success/10"
                  title="Virtual Event"
                  desc="Multi-room experience with stages, breakouts and networking."
                />
              </div>

              <div className="mt-10 flex items-center justify-between">
                <Button variant="outline">Cancel</Button>
                <Button className="gap-2" onClick={() => setWizardStep(2)}>
                  Continue <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">How do you want to build it?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Start from scratch, or let SpatialChat AI draft it for you.</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button onClick={() => setView("builder")} className="rounded-2xl border-2 border-border p-6 text-left transition hover:border-primary">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Pencil className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">Create manually</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Build your registration flow and landing page step by step.</p>
                </button>

                <button onClick={() => setView("builder")} className="rounded-2xl border-2 border-border p-6 text-left transition hover:border-primary">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, hsl(280,70%,90%), hsl(320,70%,90%))" }}>
                    <Sparkles className="h-6 w-6" style={{ color: "hsl(290, 70%, 50%)" }} />
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <h3 className="text-lg font-semibold">With SpatialChat AI</h3>
                    <span className="rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg, hsl(280,70%,55%), hsl(320,70%,55%))" }}>AI</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Describe your event and we'll generate rooms, registration and emails.</p>
                </button>
              </div>

              <div className="mt-10 flex justify-end">
                <Button variant="outline" className="gap-2" onClick={() => setWizardStep(1)}>
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // BUILDER VIEW
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted" onClick={() => setView("wizard")}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-md bg-primary/80" />
          <span className="text-base font-semibold">Untitled event</span>
          <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Draft</span>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-muted p-1">
          {[
            { key: "registration", label: "Registration" },
            { key: "landing", label: "Landing page" },
            { key: "branding", label: "Branding & CSS" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                tab === t.key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1.5"><ChevronRight className="h-4 w-4" /> Test flow</Button>
          <Button className="gap-2"><Send className="h-4 w-4" /> Publish</Button>
        </div>
      </div>

      {tab === "registration" && <RegistrationJourney />}
      {tab === "landing" && <LandingBuilder />}
      {tab === "branding" && <BrandingCss />}
    </div>
  );

  function LandingBuilder() {
    return (
      <div className="grid grid-cols-[260px_1fr] gap-6">
        <div className="rounded-2xl bg-card p-4">
          <h3 className="text-base font-bold">Widgets</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Click to add to your page</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {widgets.map((w) => (
              <button key={w.label} className="flex flex-col items-center gap-2 rounded-xl border border-border p-3 hover:border-primary">
                <w.icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">{w.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-muted/30 p-2">
          <div className="overflow-hidden rounded-xl bg-background">
            <nav className="flex items-center justify-between px-6 py-4">
              <span className="text-lg font-bold">#glowflow</span>
              <div className="flex items-center gap-6 text-sm">
                <span>About</span><span>Why Attend</span><span>Speakers</span><span>Schedule</span>
                <button className="rounded-md bg-success px-4 py-2 text-sm font-medium text-white">Register</button>
              </div>
            </nav>
            <div className="relative px-6 py-16 text-center text-white" style={{ background: "linear-gradient(135deg, hsl(180, 55%, 35%), hsl(195, 55%, 30%))" }}>
              <span className="absolute left-6 top-4 rounded-md bg-primary px-2 py-1 text-[11px] font-medium">Section · Media Slider</span>
              <h1 className="mt-6 text-5xl font-bold">Slide Title</h1>
              <p className="mt-4 text-sm">Slide description</p>
              <button className="mt-6 rounded-md bg-foreground px-6 py-2.5 text-sm font-semibold text-background">Button</button>
            </div>
            <div className="px-6 py-12 text-center">
              <h2 className="text-3xl font-bold">About #GLOWFLOW Summit</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">An invite-only conference for entrepreneurs, growth marketers, and product owners from consumer brands.</p>
            </div>
            <button className="flex w-full items-center justify-center gap-2 border-t border-dashed border-border py-4 text-sm font-medium text-primary">
              <Plus className="h-4 w-4" /> Add a section
            </button>
          </div>
        </div>
      </div>
    );
  }

  function BrandingCss() {
    return (
      <div className="grid grid-cols-[1fr_360px] gap-6">
        <div className="rounded-2xl bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">Registration form preview</h3>
            <Button className="gap-2"><Check className="h-4 w-4" /> Save</Button>
          </div>
          <div className="mt-6 rounded-xl border border-border p-6">
            {["First name", "Last name", "Email address"].map((label) => (
              <div key={label} className="mb-4">
                <label className="text-sm font-semibold">{label}</label>
                <input className="mt-1.5 h-11 w-full rounded-md border border-input px-3 text-sm" placeholder={`Enter ${label.toLowerCase()}`} />
              </div>
            ))}
            <label className="text-sm font-semibold">How will you be attending?</label>
            <select className="mt-1.5 h-11 w-full rounded-md border border-input px-3 text-sm"><option>Select answer</option></select>
            <button className="mt-6 h-12 w-full rounded-md text-sm font-semibold text-white" style={{ background: "hsl(270, 65%, 55%)" }}>Register Now</button>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <h3 className="text-base font-bold">Custom CSS</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Add custom styles to your registration flow.</p>
          <div className="mt-4 flex gap-2">
            <Button className="gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Generate theme</Button>
            <Button variant="outline">Clear</Button>
          </div>
          <pre className="mt-4 h-72 overflow-auto rounded-lg bg-muted p-3 text-xs"><code>{`Eg: .Form__heading {
  color: #000000;
}`}</code></pre>
        </div>
      </div>
    );
  }
};

const StepDot = ({ n, active, done }: { n: number; active: boolean; done: boolean }) => (
  <div
    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
      done ? "bg-success text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
    }`}
  >
    {done ? <Check className="h-4 w-4" /> : n}
  </div>
);

const KindCard = ({
  selected, onClick, icon, iconBg, title, desc,
}: { selected: boolean; onClick: () => void; icon: React.ReactNode; iconBg: string; title: string; desc: string }) => (
  <button
    onClick={onClick}
    className={`relative rounded-2xl border-2 p-6 text-left transition ${selected ? "border-primary" : "border-border hover:border-muted-foreground/40"}`}
  >
    {selected && (
      <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
        <Check className="h-3.5 w-3.5" />
      </span>
    )}
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>{icon}</div>
    <h3 className="mt-5 text-lg font-semibold">{title}</h3>
    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
  </button>
);

const RegistrationJourney = () => {
  return (
    <div className="rounded-2xl bg-card p-6" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--muted)) 1px, transparent 1px)", backgroundSize: "18px 18px" }}>
      <div className="mb-4 inline-flex items-center rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-border">
        Attendee Journey
      </div>
      <div className="flex items-stretch gap-4 overflow-x-auto pb-4">
        <div className="flex items-center">
          <Button className="gap-2 rounded-full"><ChevronRight className="h-4 w-4" /> Start</Button>
        </div>

        <JourneyCard title="Registration form" icon={<FileText className="h-4 w-4 text-primary" />} iconBg="bg-primary/10">
          {["First name", "Last name", "Email address"].map((l) => (
            <Field key={l} label={l} placeholder={`Enter ${l.toLowerCase()}`} />
          ))}
          <Field label="How will you be attending?" placeholder="Select answer" select />
          <button className="text-sm font-medium text-primary">+ Add question</button>
          <button className="mt-2 h-10 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground">Register now</button>
        </JourneyCard>

        <JourneyCard title="Attendee preferences" icon={<FileText className="h-4 w-4 text-primary" />} iconBg="bg-primary/10">
          <Field label="Which city are you from?" placeholder="Select city" select removable />
          <Field label="Dietary preferences" placeholder="Choose preferences" select removable />
          <Field label="Emergency contact" placeholder="Name and contact number" removable />
          <button className="text-sm font-medium text-primary">+ Add question</button>
          <button className="mt-2 h-10 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground">Continue</button>
        </JourneyCard>

        <JourneyCard title="Ticket selection" icon={<FileText className="h-4 w-4 text-primary" />} iconBg="bg-primary/10">
          {[
            { name: "Diamond", price: "$200" },
            { name: "Gold", price: "$80" },
            { name: "Virtual", price: "Free" },
          ].map((t) => (
            <div key={t.name} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-sm text-primary">{t.price}</p>
              </div>
              <button className="text-muted-foreground"><X className="h-4 w-4" /></button>
            </div>
          ))}
          <button className="text-sm font-medium text-primary">+ Add ticket tier</button>
        </JourneyCard>

        <JourneyCard title="Payment gateway" icon={<FileText className="h-4 w-4 text-success" />} iconBg="bg-success/10">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-success"><span className="h-2 w-2 rounded-full bg-success" /> Connected</span>
            <span className="text-sm font-bold italic text-primary">stripe</span>
          </div>
          <p className="text-xs text-muted-foreground">Card, Apple Pay & Google Pay enabled</p>
          <button className="text-sm font-medium text-primary">+ Payment methods</button>
        </JourneyCard>

        <JourneyCard title="Confirmation email" icon={<MessageSquare className="h-4 w-4" style={{ color: "hsl(340, 70%, 55%)" }} />} iconBg="bg-pink-100">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Subject</p>
          <div className="rounded-lg border border-border p-3 text-sm text-muted-foreground">You're in! Here are your event details</div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Includes</p>
          <div className="flex flex-wrap gap-2">
            {["📅 Calendar invite", "⏏ Join link", "📄 Ticket PDF"].map((t) => (
              <span key={t} className="rounded-md bg-muted px-2.5 py-1 text-xs">{t}</span>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-primary"><Pencil className="h-3.5 w-3.5" /> Edit template</button>
        </JourneyCard>

        <JourneyCard title="Thank You page" icon={<Star className="h-4 w-4 fill-amber-400 text-amber-400" />} iconBg="bg-amber-100">
          <h4 className="text-base font-bold">Your registration was successful! 🎉</h4>
          <p className="text-sm text-muted-foreground">We've sent you an email with your ticket details and the event link.</p>
          <div className="space-y-2">
            <div className="h-2.5 w-full rounded bg-muted" />
            <div className="h-2.5 w-2/3 rounded bg-muted" />
          </div>
        </JourneyCard>
      </div>
    </div>
  );
};

const JourneyCard = ({ title, icon, iconBg, children }: { title: string; icon: React.ReactNode; iconBg: string; children: React.ReactNode }) => (
  <div className="w-[320px] shrink-0 space-y-3 rounded-2xl bg-background p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-md ${iconBg}`}>{icon}</div>
        <span className="text-sm font-bold">{title}</span>
      </div>
      <span className="text-muted-foreground">…</span>
    </div>
    {children}
  </div>
);

const Field = ({ label, placeholder, select, removable }: { label: string; placeholder: string; select?: boolean; removable?: boolean }) => (
  <div>
    <div className="flex items-center justify-between">
      <label className="text-sm font-semibold">{label}</label>
      {removable && <button className="text-muted-foreground"><X className="h-3.5 w-3.5" /></button>}
    </div>
    {select ? (
      <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-muted-foreground"><option>{placeholder}</option></select>
    ) : (
      <input placeholder={placeholder} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
    )}
  </div>
);

export default Registration;
