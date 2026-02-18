import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

const Registration = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Registration</h1>
      <p className="text-sm text-muted-foreground">Manage registration forms and ticket tiers.</p>
    </div>
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <ClipboardList className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Registration Coming Soon</p>
        <p className="mt-1 text-sm text-muted-foreground">Custom form builder, ticket management, and registration analytics.</p>
      </CardContent>
    </Card>
  </div>
);

export default Registration;
