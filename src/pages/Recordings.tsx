import { Card, CardContent } from "@/components/ui/card";
import { Video } from "lucide-react";

const Recordings = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Recordings</h1>
      <p className="text-sm text-muted-foreground">Session recordings and replay analytics.</p>
    </div>
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Video className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Recordings Coming Soon</p>
        <p className="mt-1 text-sm text-muted-foreground">Session library with replay tracking and download options.</p>
      </CardContent>
    </Card>
  </div>
);

export default Recordings;
