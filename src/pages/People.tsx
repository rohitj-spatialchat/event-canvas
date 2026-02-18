import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const People = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">People</h1>
      <p className="text-sm text-muted-foreground">Manage attendees, speakers, and contacts.</p>
    </div>
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Users className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">People Management Coming Soon</p>
        <p className="mt-1 text-sm text-muted-foreground">Searchable attendee directory with filters, tags, and CRM sync.</p>
      </CardContent>
    </Card>
  </div>
);

export default People;
