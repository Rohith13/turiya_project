import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import Stillness from "./pages/Stillness";
import Beads from "./pages/Beads";
import Breath from "./pages/Breath";
import Bell from "./pages/Bell";
import Affirmations from "@/pages/Affirmations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  useAmbientSound(ambientEnabled);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation 
            ambientEnabled={ambientEnabled} 
            onAmbientToggle={() => setAmbientEnabled(!ambientEnabled)} 
          />
          <Routes>
            <Route path="/" element={<Navigate to="/stillness" replace />} />
            <Route path="/stillness" element={<Stillness />} />
            <Route path="/beads" element={<Beads />} />
            <Route path="/breath" element={<Breath />} />
            <Route path="/bell" element={<Bell />} />
            <Route path="/affirmations" element={<Affirmations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
