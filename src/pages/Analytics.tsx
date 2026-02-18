import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Analytics = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
      <p className="text-sm text-muted-foreground">Registration funnels, attendance metrics, and engagement reports.</p>
    </div>
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <BarChart3 className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Analytics Coming Soon</p>
        <p className="mt-1 text-sm text-muted-foreground">Charts, heatmaps, and exportable reports.</p>
      </CardContent>
    </Card>
  </div>
);

export default Analytics;
