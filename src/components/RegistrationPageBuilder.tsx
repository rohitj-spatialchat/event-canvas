import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
  Image,
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Mail,
  Phone,
  List,
  ToggleLeft,
  User,
  Clock,
  Mic,
  X,
  Strikethrough,
  Highlighter,
  ListOrdered,
  Link,
  Undo,
  Redo,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────
export interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
}

interface Speaker {
  id: string;
  name: string;
  title: string;
  topic: string;
  time: string;
}

interface PageStyles {
  fontFamily: string;
  fontSize: string;
  headingSize: string;
  textColor: string;
  bgColor: string;
  accentColor: string;
  textAlign: "left" | "center" | "right";
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

interface BannerConfig {
  title: string;
  subtitle: string;
  gradient: string;
  height: string;
}

const fieldTypes = [
  { id: "text", label: "Text", icon: Type },
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Phone", icon: Phone },
  { id: "textarea", label: "Long Text", icon: AlignLeft },
  { id: "select", label: "Dropdown", icon: List },
  { id: "checkbox", label: "Checkbox", icon: ToggleLeft },
];

const fontFamilies = [
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "'Courier New', monospace", label: "Courier New" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "'Trebuchet MS', sans-serif", label: "Trebuchet" },
  { value: "Tahoma, sans-serif", label: "Tahoma" },
];

const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];
const headingSizes = ["24px", "28px", "32px", "36px", "40px", "48px", "56px"];

const gradientPresets = [
  "linear-gradient(135deg, hsl(235,65%,55%), hsl(270,60%,50%))",
  "linear-gradient(135deg, hsl(152,55%,45%), hsl(170,60%,40%))",
  "linear-gradient(135deg, hsl(38,92%,50%), hsl(20,90%,55%))",
  "linear-gradient(135deg, hsl(0,72%,55%), hsl(330,65%,50%))",
  "linear-gradient(135deg, hsl(195,65%,45%), hsl(210,80%,55%))",
  "linear-gradient(135deg, hsl(280,60%,55%), hsl(310,70%,50%))",
  "linear-gradient(135deg, hsl(45,90%,50%), hsl(35,95%,55%))",
  "linear-gradient(135deg, hsl(200,70%,30%), hsl(220,60%,20%))",
];

const colorPresets = [
  "#1a1a2e", "#16213e", "#0f3460", "#533483",
  "#e94560", "#f97316", "#22c55e", "#3b82f6",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b",
];

const defaultFields: FormField[] = [
  { id: "f1", type: "text", label: "Full Name", placeholder: "Enter your full name", required: true },
  { id: "f2", type: "email", label: "Email Address", placeholder: "you@example.com", required: true },
  { id: "f3", type: "text", label: "Company", placeholder: "Your company name", required: false },
  { id: "f4", type: "text", label: "Job Title", placeholder: "Your role", required: false },
];

const defaultSpeakers: Speaker[] = [
  { id: "s1", name: "Sarah Johnson", title: "CEO, TechCorp", topic: "Opening Keynote", time: "10:00 AM" },
  { id: "s2", name: "Michael Chen", title: "CTO, InnovateLab", topic: "Future of AI", time: "11:00 AM" },
];

interface RegistrationPageBuilderProps {
  regFields: FormField[];
  setRegFields: (fields: FormField[]) => void;
}

export function RegistrationPageBuilder({ regFields, setRegFields }: RegistrationPageBuilderProps) {
  const [activeSection, setActiveSection] = useState<"banner" | "speakers" | "form">("banner");
  const [addingField, setAddingField] = useState(false);
  const [addingSpeaker, setAddingSpeaker] = useState(false);

  const [styles, setStyles] = useState<PageStyles>({
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    headingSize: "36px",
    textColor: "#1a1a2e",
    bgColor: "#ffffff",
    accentColor: "#4f46e5",
    textAlign: "center",
    bold: false,
    italic: false,
    underline: false,
  });

  const [banner, setBanner] = useState<BannerConfig>({
    title: "Event Registration",
    subtitle: "Join us for an amazing experience",
    gradient: gradientPresets[0],
    height: "200px",
  });

  const [speakers, setSpeakers] = useState<Speaker[]>(defaultSpeakers);
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);

  const updateStyle = <K extends keyof PageStyles>(key: K, value: PageStyles[K]) =>
    setStyles((prev) => ({ ...prev, [key]: value }));

  // Form field helpers
  const addField = (type: string) => {
    const fieldType = fieldTypes.find((f) => f.id === type);
    const newField: FormField = {
      id: `f${Date.now()}`,
      type,
      label: fieldType?.label || "New Field",
      placeholder: "",
      required: false,
      ...(type === "select" ? { options: ["Option 1", "Option 2"] } : {}),
    };
    setRegFields([...regFields, newField]);
    setAddingField(false);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setRegFields(regFields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const removeField = (id: string) => {
    setRegFields(regFields.filter((f) => f.id !== id));
  };

  const moveField = (id: string, direction: "up" | "down") => {
    const idx = regFields.findIndex((f) => f.id === id);
    if ((direction === "up" && idx === 0) || (direction === "down" && idx === regFields.length - 1)) return;
    const newFields = [...regFields];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [newFields[idx], newFields[swapIdx]] = [newFields[swapIdx], newFields[idx]];
    setRegFields(newFields);
  };

  // Speaker helpers
  const addSpeaker = () => {
    setSpeakers((prev) => [
      ...prev,
      { id: `s${Date.now()}`, name: "", title: "", topic: "", time: "" },
    ]);
    setAddingSpeaker(false);
  };

  const updateSpeaker = (id: string, updates: Partial<Speaker>) => {
    setSpeakers((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const removeSpeaker = (id: string) => {
    setSpeakers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col h-full -mx-6 -my-5">
      {/* ═══ TOOLBAR ═══ */}
      <div className="border-b bg-muted/30 px-3 py-1.5 shrink-0">
        {/* Row 1: Font, Size, Formatting */}
        <div className="flex items-center gap-1 flex-wrap">
          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5 border-r pr-2 mr-1">
            <button className="p-1.5 rounded hover:bg-muted text-muted-foreground" title="Undo">
              <Undo className="h-3.5 w-3.5" />
            </button>
            <button className="p-1.5 rounded hover:bg-muted text-muted-foreground" title="Redo">
              <Redo className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Font Family */}
          <Select value={styles.fontFamily} onValueChange={(v) => updateStyle("fontFamily", v)}>
            <SelectTrigger className="h-7 w-[120px] text-xs border-muted">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  <span style={{ fontFamily: f.value }}>{f.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Font Size */}
          <Select value={styles.fontSize} onValueChange={(v) => updateStyle("fontSize", v)}>
            <SelectTrigger className="h-7 w-[70px] text-xs border-muted">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Heading Size */}
          <Select value={styles.headingSize} onValueChange={(v) => updateStyle("headingSize", v)}>
            <SelectTrigger className="h-7 w-[80px] text-xs border-muted">
              <SelectValue placeholder="Heading" />
            </SelectTrigger>
            <SelectContent>
              {headingSizes.map((s) => (
                <SelectItem key={s} value={s}>H {s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="w-px h-5 bg-border mx-1" />

          {/* Bold / Italic / Underline / Strikethrough */}
          <button
            onClick={() => updateStyle("bold", !styles.bold)}
            className={`p-1.5 rounded transition-colors ${styles.bold ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
            title="Bold"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => updateStyle("italic", !styles.italic)}
            className={`p-1.5 rounded transition-colors ${styles.italic ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
            title="Italic"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => updateStyle("underline", !styles.underline)}
            className={`p-1.5 rounded transition-colors ${styles.underline ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
            title="Underline"
          >
            <Underline className="h-3.5 w-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted text-muted-foreground" title="Strikethrough">
            <Strikethrough className="h-3.5 w-3.5" />
          </button>

          <div className="w-px h-5 bg-border mx-1" />

          {/* Alignment */}
          {(["left", "center", "right"] as const).map((align) => {
            const Icon = align === "left" ? AlignLeft : align === "center" ? AlignCenter : AlignRight;
            return (
              <button
                key={align}
                onClick={() => updateStyle("textAlign", align)}
                className={`p-1.5 rounded transition-colors ${styles.textAlign === align ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
                title={`Align ${align}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            );
          })}

          <div className="w-px h-5 bg-border mx-1" />

          {/* List buttons */}
          <button className="p-1.5 rounded hover:bg-muted text-muted-foreground" title="Bullet List">
            <List className="h-3.5 w-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted text-muted-foreground" title="Numbered List">
            <ListOrdered className="h-3.5 w-3.5" />
          </button>

          <div className="w-px h-5 bg-border mx-1" />

          {/* Text Color */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(showColorPicker === "text" ? null : "text")}
              className="p-1.5 rounded hover:bg-muted flex items-center gap-1"
              title="Text Color"
            >
              <Type className="h-3.5 w-3.5" />
              <div className="h-1 w-3.5 rounded-sm" style={{ backgroundColor: styles.textColor }} />
            </button>
            {showColorPicker === "text" && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-popover border rounded-lg shadow-lg p-2 grid grid-cols-4 gap-1 w-[140px]">
                {colorPresets.map((c) => (
                  <button
                    key={c}
                    onClick={() => { updateStyle("textColor", c); setShowColorPicker(null); }}
                    className="h-6 w-6 rounded border hover:scale-110 transition-transform"
                    style={{ backgroundColor: c }}
                  />
                ))}
                <input
                  type="color"
                  value={styles.textColor}
                  onChange={(e) => updateStyle("textColor", e.target.value)}
                  className="col-span-4 h-6 w-full cursor-pointer rounded"
                />
              </div>
            )}
          </div>

          {/* Highlight / Background Color */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(showColorPicker === "bg" ? null : "bg")}
              className="p-1.5 rounded hover:bg-muted flex items-center gap-1"
              title="Background Color"
            >
              <Highlighter className="h-3.5 w-3.5" />
              <div className="h-1 w-3.5 rounded-sm border" style={{ backgroundColor: styles.bgColor }} />
            </button>
            {showColorPicker === "bg" && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-popover border rounded-lg shadow-lg p-2 grid grid-cols-4 gap-1 w-[140px]">
                {["#ffffff", "#f8fafc", "#f1f5f9", "#fef3c7", "#fce7f3", "#e0e7ff", "#d1fae5", "#fef9c3"].map((c) => (
                  <button
                    key={c}
                    onClick={() => { updateStyle("bgColor", c); setShowColorPicker(null); }}
                    className="h-6 w-6 rounded border hover:scale-110 transition-transform"
                    style={{ backgroundColor: c }}
                  />
                ))}
                <input
                  type="color"
                  value={styles.bgColor}
                  onChange={(e) => updateStyle("bgColor", e.target.value)}
                  className="col-span-4 h-6 w-full cursor-pointer rounded"
                />
              </div>
            )}
          </div>

          {/* Accent Color */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(showColorPicker === "accent" ? null : "accent")}
              className="p-1.5 rounded hover:bg-muted flex items-center gap-1"
              title="Accent Color"
            >
              <Palette className="h-3.5 w-3.5" />
              <div className="h-1 w-3.5 rounded-sm" style={{ backgroundColor: styles.accentColor }} />
            </button>
            {showColorPicker === "accent" && (
              <div className="absolute top-full right-0 mt-1 z-50 bg-popover border rounded-lg shadow-lg p-2 grid grid-cols-4 gap-1 w-[140px]">
                {colorPresets.map((c) => (
                  <button
                    key={c}
                    onClick={() => { updateStyle("accentColor", c); setShowColorPicker(null); }}
                    className="h-6 w-6 rounded border hover:scale-110 transition-transform"
                    style={{ backgroundColor: c }}
                  />
                ))}
                <input
                  type="color"
                  value={styles.accentColor}
                  onChange={(e) => updateStyle("accentColor", e.target.value)}
                  className="col-span-4 h-6 w-full cursor-pointer rounded"
                />
              </div>
            )}
          </div>

          <div className="w-px h-5 bg-border mx-1" />

          {/* Image / Link */}
          <button className="p-1.5 rounded hover:bg-muted text-muted-foreground" title="Insert Image">
            <Image className="h-3.5 w-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted text-muted-foreground" title="Insert Link">
            <Link className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ═══ SECTION TABS ═══ */}
      <div className="flex border-b shrink-0">
        {(["banner", "speakers", "form"] as const).map((sec) => (
          <button
            key={sec}
            onClick={() => setActiveSection(sec)}
            className={`flex-1 py-2 text-xs font-medium transition-colors border-b-2 ${
              activeSection === sec
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {sec === "banner" ? "🖼️ Banner" : sec === "speakers" ? "🎤 Speakers" : "📝 Form Fields"}
          </button>
        ))}
      </div>

      {/* ═══ CONTENT AREA: Editor + Live Preview ═══ */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 divide-x min-h-0">
          {/* LEFT: Editor Controls */}
          <div className="p-4 space-y-4 overflow-y-auto max-h-[380px]">
            {activeSection === "banner" && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Banner Settings</h4>
                <div className="space-y-2">
                  <Label className="text-xs">Banner Title</Label>
                  <Input
                    value={banner.title}
                    onChange={(e) => setBanner((b) => ({ ...b, title: e.target.value }))}
                    className="h-8 text-sm"
                    placeholder="Event title..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Subtitle</Label>
                  <Input
                    value={banner.subtitle}
                    onChange={(e) => setBanner((b) => ({ ...b, subtitle: e.target.value }))}
                    className="h-8 text-sm"
                    placeholder="Subtitle text..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Banner Gradient</Label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {gradientPresets.map((g, i) => (
                      <button
                        key={i}
                        onClick={() => setBanner((b) => ({ ...b, gradient: g }))}
                        className={`h-8 rounded-md border-2 transition-all ${
                          banner.gradient === g ? "border-primary scale-105" : "border-transparent hover:border-muted-foreground/30"
                        }`}
                        style={{ background: g }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Banner Height</Label>
                  <Select value={banner.height} onValueChange={(v) => setBanner((b) => ({ ...b, height: v }))}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="150px">Small (150px)</SelectItem>
                      <SelectItem value="200px">Medium (200px)</SelectItem>
                      <SelectItem value="280px">Large (280px)</SelectItem>
                      <SelectItem value="360px">Extra Large (360px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {activeSection === "speakers" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Speaker Sessions</h4>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={addSpeaker}>
                    <Plus className="h-3 w-3" /> Add
                  </Button>
                </div>
                {speakers.map((speaker) => (
                  <div key={speaker.id} className="rounded-lg border p-3 space-y-2 bg-card">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px]">Speaker</Badge>
                      <button
                        onClick={() => removeSpeaker(speaker.id)}
                        className="p-1 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <Input
                      value={speaker.name}
                      onChange={(e) => updateSpeaker(speaker.id, { name: e.target.value })}
                      className="h-7 text-xs"
                      placeholder="Speaker name"
                    />
                    <Input
                      value={speaker.title}
                      onChange={(e) => updateSpeaker(speaker.id, { title: e.target.value })}
                      className="h-7 text-xs"
                      placeholder="Title / Company"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={speaker.topic}
                        onChange={(e) => updateSpeaker(speaker.id, { topic: e.target.value })}
                        className="h-7 text-xs"
                        placeholder="Session topic"
                      />
                      <Input
                        value={speaker.time}
                        onChange={(e) => updateSpeaker(speaker.id, { time: e.target.value })}
                        className="h-7 text-xs"
                        placeholder="Time"
                      />
                    </div>
                  </div>
                ))}
                {speakers.length === 0 && (
                  <div className="rounded-lg border-2 border-dashed p-6 text-center">
                    <Mic className="mx-auto h-6 w-6 text-muted-foreground/40" />
                    <p className="mt-1 text-xs text-muted-foreground">No speakers added</p>
                  </div>
                )}
              </div>
            )}

            {activeSection === "form" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Form Fields ({regFields.length})
                  </h4>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1"
                    onClick={() => setAddingField(!addingField)}
                  >
                    <Plus className="h-3 w-3" /> Add
                  </Button>
                </div>

                {addingField && (
                  <div className="rounded-lg border bg-muted/30 p-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      {fieldTypes.map((ft) => {
                        const Icon = ft.icon;
                        return (
                          <button
                            key={ft.id}
                            onClick={() => addField(ft.id)}
                            className="flex items-center gap-1.5 rounded-md border bg-card p-2 text-[11px] font-medium hover:border-primary hover:bg-primary/5 transition-colors"
                          >
                            <Icon className="h-3 w-3 text-muted-foreground" />
                            {ft.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {regFields.map((field, idx) => {
                  const FieldIcon = fieldTypes.find((ft) => ft.id === field.type)?.icon || Type;
                  return (
                    <div key={field.id} className="rounded-lg border bg-card p-2.5 transition-colors hover:border-primary/30">
                      <div className="flex items-center gap-1.5">
                        <div className="flex flex-col">
                          <button onClick={() => moveField(field.id, "up")} disabled={idx === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                            <ChevronUp className="h-2.5 w-2.5" />
                          </button>
                          <button onClick={() => moveField(field.id, "down")} disabled={idx === regFields.length - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                            <ChevronDown className="h-2.5 w-2.5" />
                          </button>
                        </div>
                        <FieldIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <Input
                          value={field.label}
                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                          className="h-7 text-xs font-medium flex-1"
                        />
                        <button
                          onClick={() => updateField(field.id, { required: !field.required })}
                          className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${field.required ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                        >
                          {field.required ? "Req" : "Opt"}
                        </button>
                        <button onClick={() => removeField(field.id)} className="p-0.5 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                      {field.type === "select" && field.options && (
                        <div className="mt-1.5 ml-8 space-y-1">
                          {field.options.map((opt, oi) => (
                            <div key={oi} className="flex items-center gap-1">
                              <Input
                                value={opt}
                                onChange={(e) => {
                                  const newOpts = [...(field.options || [])];
                                  newOpts[oi] = e.target.value;
                                  updateField(field.id, { options: newOpts });
                                }}
                                className="h-6 text-[11px] flex-1"
                              />
                              <button onClick={() => updateField(field.id, { options: field.options?.filter((_, i) => i !== oi) })} className="text-muted-foreground hover:text-destructive">
                                <X className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => updateField(field.id, { options: [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`] })}
                            className="text-[10px] text-primary hover:underline ml-1"
                          >
                            + Add option
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Live Preview */}
          <div className="overflow-y-auto max-h-[380px]" style={{ backgroundColor: styles.bgColor }}>
            <div className="p-0">
              {/* Banner Preview */}
              <div
                className="flex flex-col items-center justify-center px-4"
                style={{
                  background: banner.gradient,
                  height: banner.height,
                  fontFamily: styles.fontFamily,
                  textAlign: styles.textAlign,
                }}
              >
                <h1
                  className="font-bold text-white drop-shadow-lg"
                  style={{
                    fontSize: styles.headingSize,
                    fontStyle: styles.italic ? "italic" : "normal",
                    textDecoration: styles.underline ? "underline" : "none",
                  }}
                >
                  {banner.title || "Event Title"}
                </h1>
                <p
                  className="mt-1 text-white/80"
                  style={{ fontSize: styles.fontSize }}
                >
                  {banner.subtitle || "Event subtitle"}
                </p>
              </div>

              {/* Speakers Preview */}
              {speakers.length > 0 && (
                <div className="p-4" style={{ fontFamily: styles.fontFamily }}>
                  <h3
                    className="font-semibold mb-3"
                    style={{ color: styles.textColor, fontSize: "18px", textAlign: styles.textAlign }}
                  >
                    🎤 Speaker Sessions
                  </h3>
                  <div className="space-y-2">
                    {speakers.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center gap-3 rounded-lg border p-2.5"
                        style={{ borderColor: styles.accentColor + "30" }}
                      >
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold"
                          style={{ backgroundColor: styles.accentColor }}
                        >
                          {s.name ? s.name.split(" ").map((n) => n[0]).join("").slice(0, 2) : "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate" style={{ color: styles.textColor }}>
                            {s.name || "Speaker Name"}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">{s.title || "Title"}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[11px] font-medium" style={{ color: styles.accentColor }}>
                            {s.topic || "Topic"}
                          </p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 justify-end">
                            <Clock className="h-2.5 w-2.5" /> {s.time || "TBD"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Registration Form Preview */}
              <div className="p-4" style={{ fontFamily: styles.fontFamily }}>
                <h3
                  className="font-semibold mb-3"
                  style={{ color: styles.textColor, fontSize: "18px", textAlign: styles.textAlign }}
                >
                  📝 Registration
                </h3>
                <div className="space-y-3">
                  {regFields.map((field) => (
                    <div key={field.id} className="space-y-1">
                      <label
                        className="text-xs font-medium"
                        style={{
                          color: styles.textColor,
                          fontWeight: styles.bold ? 700 : 500,
                          fontStyle: styles.italic ? "italic" : "normal",
                        }}
                      >
                        {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <div className="h-14 rounded-md border bg-muted/20" style={{ borderColor: styles.accentColor + "30" }} />
                      ) : field.type === "select" ? (
                        <div
                          className="flex h-8 items-center rounded-md border px-2 text-[11px]"
                          style={{ borderColor: styles.accentColor + "30", color: styles.textColor + "80" }}
                        >
                          Select {field.label.toLowerCase()}...
                        </div>
                      ) : field.type === "checkbox" ? (
                        <div className="flex items-center gap-2">
                          <div className="h-3.5 w-3.5 rounded border" style={{ borderColor: styles.accentColor }} />
                          <span className="text-[11px]" style={{ color: styles.textColor + "90" }}>{field.label}</span>
                        </div>
                      ) : (
                        <div className="h-8 rounded-md border bg-muted/20" style={{ borderColor: styles.accentColor + "30" }} />
                      )}
                    </div>
                  ))}
                  {regFields.length > 0 && (
                    <button
                      className="w-full rounded-md py-2 text-xs font-semibold text-white mt-2"
                      style={{ backgroundColor: styles.accentColor }}
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
