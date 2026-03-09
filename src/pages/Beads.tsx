import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Tone from "tone";
import { toast } from "sonner";

const Beads = () => {
  const [count, setCount] = useState(0);
  const [mantra, setMantra] = useState("");
  const [editingMantra, setEditingMantra] = useState(false);
  const [showMalaPulse, setShowMalaPulse] = useState(false);
  const [clickedBead, setClickedBead] = useState<number | null>(null);

  useEffect(() => {
    const savedCount = localStorage.getItem("beadCount");
    const savedMantra = localStorage.getItem("beadMantra");
    
    if (savedCount) setCount(parseInt(savedCount));
    if (savedMantra) setMantra(savedMantra);
  }, []);

  const playBellSound = async () => {
    await Tone.start();
    const bell = new Tone.MetalSynth({
      envelope: { attack: 0.01, decay: 2.5, release: 5 },
      harmonicity: 5.1,
      modulationIndex: 12,
      resonance: 400,
      octaves: 1,
    }).toDestination();
    
    bell.volume.value = -15;
    bell.triggerAttackRelease("G4", "2n");
  };

  const handleBeadClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem("beadCount", newCount.toString());

    // Vibration on mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Trigger bead animation
    setClickedBead(newCount % 108);
    setTimeout(() => setClickedBead(null), 300);

    // Bell sound and mala pulse every 108th bead
    if (newCount % 108 === 0) {
      playBellSound();
      setShowMalaPulse(true);
      setTimeout(() => setShowMalaPulse(false), 1500);
      toast.success("One mala complete! 🙏");
    }
  };

  const handleMantraSave = () => {
    localStorage.setItem("beadMantra", mantra);
    setEditingMantra(false);
    toast.success("Mantra saved");
  };

  const handleReset = () => {
    setCount(0);
    localStorage.setItem("beadCount", "0");
    toast.info("Counter reset");
  };

  const currentBeadInMala = count % 108;

  return (
    <PageLayout gradient="calm" tagline="Offline devotion tracker — sacred, silent, secure.">
      {/* Full-screen amber pulse on mala completion */}
      <AnimatePresence>
        {showMalaPulse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ backgroundColor: "#D4956A" }}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md">
        {/* Mantra display/edit */}
        <div className="w-full text-center mb-8">
          {editingMantra ? (
            <div className="flex gap-2">
              <Input
                value={mantra}
                onChange={(e) => setMantra(e.target.value)}
                placeholder="Enter your mantra..."
                className="text-center bg-card/50 backdrop-blur border-border/50"
              />
              <Button onClick={handleMantraSave} variant="secondary" size="sm">
                Save
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setEditingMantra(true)}
              className="text-lg font-light text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {mantra || "Set your mantra..."}
            </button>
          )}
        </div>

        {/* Main bead counter */}
        <button
          onClick={handleBeadClick}
          className="w-64 h-64 rounded-full bg-primary/20 hover:bg-primary/30 transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95"
        >
          <div className="text-center overflow-hidden">
            <div className="relative h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={count}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="text-6xl font-light text-foreground"
                >
                  {count}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="text-sm text-muted-foreground mt-2">beads</div>
            <div className="text-xs text-muted-foreground/70 mt-1">
              {Math.floor(count / 108)} malas complete
            </div>
          </div>
        </button>

        {/* Bead visualization */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
          {Array.from({ length: Math.min(currentBeadInMala, 108) }).map((_, i) => (
            <motion.div
              key={i}
              initial={i === currentBeadInMala - 1 ? { scale: 1.3, backgroundColor: "rgba(212, 149, 106, 0.2)" } : {}}
              animate={
                clickedBead === i + 1
                  ? { 
                      scale: [1.3, 1.1], 
                      backgroundColor: ["rgba(212, 149, 106, 0.8)", "rgba(212, 149, 106, 0.6)"]
                    }
                  : { scale: 1, backgroundColor: "rgba(212, 149, 106, 0.6)" }
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#D4956A99" }}
            />
          ))}
        </div>

        <Button onClick={handleReset} variant="ghost" size="sm" className="mt-4">
          Reset Counter
        </Button>
      </div>
    </PageLayout>
  );
};

export default Beads;
