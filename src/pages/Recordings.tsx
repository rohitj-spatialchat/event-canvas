import { useState } from "react";
import { Play, Headphones, BookOpen, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import imgAiSummit from "@/assets/recording-ai-summit.jpg";
import imgWorkshop from "@/assets/recording-workshop.jpg";
import imgKeynote from "@/assets/recording-keynote.jpg";
import imgRoundtable from "@/assets/recording-roundtable.jpg";
import imgProductDemo from "@/assets/recording-product-demo.jpg";
import imgNetworking from "@/assets/recording-networking.jpg";

type ContentType = "watch" | "listen" | "read";

interface Recording {
  id: string;
  title: string;
  description: string;
  image: string;
  type: ContentType;
  category: string;
  topic: string;
  format: string;
  date: string;
  duration: string;
  views: number;
  tags: string[];
}

const recordings: Recording[] = [
  {
    id: "1", title: "AI-Powered Event Engagement", description: "Discover how machine learning transforms attendee interactions and boosts engagement rates.",
    image: imgAiSummit, type: "watch", category: "AI & Machine Learning", topic: "AI Integration", format: "Webinar", date: "Feb 20, 2026", duration: "1h 45m", views: 342, tags: ["AI", "Engagement", "Featured"],
  },
  {
    id: "2", title: "Data Analytics Workshop", description: "Build real-time dashboards, enhance data pipelines, and improve event intelligence.",
    image: imgWorkshop, type: "listen", category: "Analytics", topic: "Data Science", format: "Workshop", date: "Feb 18, 2026", duration: "52m", views: 189, tags: ["Analytics", "Data"],
  },
  {
    id: "3", title: "Keynote: Future of Events", description: "Learn techniques for hybrid event management and next-gen virtual experiences.",
    image: imgKeynote, type: "watch", category: "Keynotes", topic: "Event Strategy", format: "Conference", date: "Feb 15, 2026", duration: "3h 20m", views: 567, tags: ["Keynote", "Strategy", "Featured"],
  },
  {
    id: "4", title: "Customer Success Roundtable", description: "Optimize retention strategies with insights from top customer success leaders.",
    image: imgRoundtable, type: "read", category: "Customer Success", topic: "Retention", format: "Roundtable", date: "Feb 12, 2026", duration: "1h 15m", views: 124, tags: ["Customer Success", "Retention"],
  },
  {
    id: "5", title: "Product Demo: Smart Networking", description: "See how AI matches attendees for meaningful connections at scale.",
    image: imgProductDemo, type: "watch", category: "AI & Machine Learning", topic: "Networking", format: "Demo", date: "Feb 10, 2026", duration: "38m", views: 256, tags: ["AI", "Networking", "Product"],
  },
  {
    id: "6", title: "Networking Best Practices", description: "Learn proven frameworks for creating impactful networking sessions at any event.",
    image: imgNetworking, type: "listen", category: "Networking", topic: "Event Strategy", format: "Webinar", date: "Feb 8, 2026", duration: "1h 02m", views: 198, tags: ["Networking", "Strategy"],
  },
];

const categories = ["All", "AI & Machine Learning", "Analytics", "Keynotes", "Customer Success", "Networking"];
const topicOptions = ["All", "AI Integration", "Data Science", "Event Strategy", "Retention", "Networking"];
const formatOptions = ["All", "Webinar", "Workshop", "Conference", "Roundtable", "Demo"];
const dateOptions = ["All Time", "This Week", "This Month", "Last 3 Months"];

const allTags = Array.from(new Set(recordings.flatMap(r => r.tags)));

const typeConfig: Record<ContentType, { label: string; icon: typeof Play; bg: string; text: string }> = {
  watch: { label: "WATCH", icon: Play, bg: "bg-primary", text: "text-primary-foreground" },
  listen: { label: "LISTEN", icon: Headphones, bg: "bg-success", text: "text-success-foreground" },
  read: { label: "READ", icon: BookOpen, bg: "bg-accent", text: "text-accent-foreground" },
};

const Recordings = () => {
  const [category, setCategory] = useState("All");
  const [topic, setTopic] = useState("All");
  const [format, setFormat] = useState("All");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const filtered = recordings.filter(r => {
    const matchCat = category === "All" || r.category === category;
    const matchTopic = topic === "All" || r.topic === topic;
    const matchFormat = format === "All" || r.format === format;
    const matchTags = selectedTags.length === 0 || selectedTags.some(t => r.tags.includes(t));
    const matchSearch = search === "" || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchTopic && matchFormat && matchTags && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recordings</h1>
        <p className="text-sm text-muted-foreground">Browse and discover event content from your knowledge hub</p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              category === c
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Main Layout: Cards + Sidebar */}
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Cards Grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
              <Play className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">No recordings match your filters</p>
              <button
                onClick={() => { setCategory("All"); setTopic("All"); setFormat("All"); setSelectedTags([]); setSearch(""); }}
                className="mt-2 text-xs text-primary hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map(rec => {
                const config = typeConfig[rec.type];
                const Icon = config.icon;
                return (
                  <div key={rec.id} className="group cursor-pointer">
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                      <img
                        src={rec.image}
                        alt={rec.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                          <Play className="h-6 w-6 text-foreground ml-0.5" />
                        </div>
                      </div>
                      {/* Duration badge */}
                      <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                        {rec.duration}
                      </span>
                      {/* Views badge */}
                      <span className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                        {rec.views} views
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-3">
                      <h3 className="text-base font-semibold leading-tight group-hover:text-primary transition-colors">
                        {rec.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {rec.description}
                      </p>
                      {/* Action button */}
                      <button className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold ${config.bg} ${config.text} transition-transform hover:scale-105`}>
                        <Icon className="h-3.5 w-3.5" />
                        {config.label}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar: Sort & Filter */}
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-primary">Sort & Filter</h3>
            <p className="mt-1 text-xs text-muted-foreground">Find the content you are looking for across the Knowledge Hub</p>
          </div>

          <div className="h-px bg-border" />

          {/* Search */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Search:</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recordings..."
                className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>
          </div>

          {/* Topic Dropdown */}
          <FilterSelect label="Topics:" value={topic} options={topicOptions} onChange={setTopic} />

          {/* Format Dropdown */}
          <FilterSelect label="Formats:" value={format} options={formatOptions} onChange={setFormat} />

          {/* Date Dropdown */}
          <FilterSelect label="Date:" value={dateFilter} options={dateOptions} onChange={setDateFilter} />

          {/* Tags */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Tags: {selectedTags.length > 0 && <span className="text-primary">{selectedTags.length} Selected</span>}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable filter select */
const FilterSelect = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => (
  <div>
    <label className="text-sm font-medium mb-1.5 block">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full appearance-none rounded-lg border border-input bg-background px-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow cursor-pointer"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
    </div>
  </div>
);

export default Recordings;
