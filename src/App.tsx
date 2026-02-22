import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Registration from "./pages/Registration";
import People from "./pages/People";
import Engagement from "./pages/Engagement";
import Analytics from "./pages/Analytics";
import Revenue from "./pages/Revenue";
import Recordings from "./pages/Recordings";
import Networking from "./pages/Networking";
import Integrations from "./pages/Integrations";
import AIAssistant from "./pages/AIAssistant";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<Events />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/people" element={<People />} />
            <Route path="/engagement" element={<Engagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
