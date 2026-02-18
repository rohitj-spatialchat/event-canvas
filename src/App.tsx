import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "./pages/Index";
import EventSetup from "./pages/EventSetup";
import Registration from "./pages/Registration";
import People from "./pages/People";
import Engagement from "./pages/Engagement";
import Analytics from "./pages/Analytics";
import Recordings from "./pages/Recordings";
import Integrations from "./pages/Integrations";
import Community from "./pages/Community";
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
            <Route path="/event-setup" element={<EventSetup />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/people" element={<People />} />
            <Route path="/engagement" element={<Engagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
