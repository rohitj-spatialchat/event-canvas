import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";

const Community = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Community</h1>
      <p className="text-sm text-muted-foreground">Persistent rooms, member directory, and recurring events.</p>
    </div>
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Globe className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Community Coming Soon</p>
        <p className="mt-1 text-sm text-muted-foreground">Build ongoing communities around your events.</p>
      </CardContent>
    </Card>
  </div>
);

export default Community;
