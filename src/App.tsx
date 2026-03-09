import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import Stillness from "./pages/Stillness";
import Beads from "./pages/Beads";
import Breath from "./pages/Breath";
import Vision from "./pages/Vision";
import Bell from "./pages/Bell";
import Affirmations from "@/pages/Affirmations";
import Support from "@/pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/stillness" replace />} />
        <Route path="/stillness" element={<PageTransition><Stillness /></PageTransition>} />
        <Route path="/beads" element={<PageTransition><Beads /></PageTransition>} />
        <Route path="/breath" element={<PageTransition><Breath /></PageTransition>} />
        <Route path="/vision" element={<PageTransition><Vision /></PageTransition>} />
        <Route path="/bell" element={<PageTransition><Bell /></PageTransition>} />
        <Route path="/affirmations" element={<PageTransition><Affirmations /></PageTransition>} />
        <Route path="/support" element={<PageTransition><Support /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

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
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
