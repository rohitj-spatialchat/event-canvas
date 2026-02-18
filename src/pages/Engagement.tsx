import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

const Engagement = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Engagement</h1>
      <p className="text-sm text-muted-foreground">Polls, Q&A, chat monitoring, and engagement scores.</p>
    </div>
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Zap className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Engagement Tools Coming Soon</p>
        <p className="mt-1 text-sm text-muted-foreground">Live polls, Q&A management, and engagement scoring.</p>
      </CardContent>
    </Card>
  </div>
);

export default Engagement;
