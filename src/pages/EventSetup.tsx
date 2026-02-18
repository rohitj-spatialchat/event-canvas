import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const EventSetup = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Event Setup</h1>
      <p className="text-sm text-muted-foreground">Create and configure your events.</p>
    </div>
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <CalendarDays className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Event Setup Coming Soon</p>
        <p className="mt-1 text-sm text-muted-foreground">Multi-step wizard for event creation and room management.</p>
      </CardContent>
    </Card>
  </div>
);

export default EventSetup;
