import { CalendarDays, Plus, MessageSquare, HelpCircle, MessageCircle, Star, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { engagementMetrics, pollsData, qaData } from "@/data/mockData";

const metricIcons = [MessageSquare, HelpCircle, MessageCircle, Star];

const Engagement = () => {
  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <CalendarDays className="h-4 w-4" /> View History
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Poll
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {engagementMetrics.map((m, i) => {
          const Icon = metricIcons[i];
          return (
            <Card key={i}>
              <CardContent className="flex items-center gap-4 p-5">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: m.color }}
                >
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{m.value}</p>
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Polls + Q&A */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Polls */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Active Polls</h2>
              <button className="text-sm text-muted-foreground hover:text-foreground">View All</button>
            </div>
            <div className="space-y-8">
              {pollsData.map(poll => (
                <div key={poll.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-medium">{poll.question}</p>
                    <span className="text-sm text-muted-foreground">{poll.responses} responses</span>
                  </div>
                  <div className="space-y-3">
                    {poll.options.map((opt, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-sm">
                          <span>{opt.label}</span>
                          <span className="text-muted-foreground">{opt.percentage}%</span>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${opt.percentage}%` }} />
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{opt.votes} votes</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{poll.event}</span>
                    <button className="hover:text-foreground">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Q&A */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Q&A Questions</h2>
            <div className="space-y-5">
              {qaData.map(q => (
                <div key={q.id} className="flex gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{q.votes}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{q.question}</p>
                      <span className={`shrink-0 text-xs font-semibold ${q.status === "answered" ? "text-success" : "text-warning"}`}>
                        {q.status === "answered" ? "✓ Answered" : "Pending"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Asked by {q.askedBy} • {q.time} • {q.event}
                    </p>
                    {q.answer && (
                      <div className="mt-2 border-l-2 border-primary pl-3">
                        <p className="text-xs text-muted-foreground">Answer: {q.answer}</p>
                      </div>
                    )}
                    {q.status === "pending" && (
                      <Button size="sm" className="mt-2" variant="default">Answer Question</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Engagement;
