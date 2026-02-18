import { Card, CardContent } from "@/components/ui/card";
import { Plug } from "lucide-react";

const Integrations = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
      <p className="text-sm text-muted-foreground">Connect CRM, email, analytics, and automation tools.</p>
    </div>
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Plug className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Integrations Hub Coming Soon</p>
        <p className="mt-1 text-sm text-muted-foreground">HubSpot, Salesforce, Mailchimp, Zapier, and more.</p>
      </CardContent>
    </Card>
  </div>
);

export default Integrations;
