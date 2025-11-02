import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Tone from "tone";
import { toast } from "sonner";

const Beads = () => {
  const [count, setCount] = useState(0);
  const [mantra, setMantra] = useState("");
  const [editingMantra, setEditingMantra] = useState(false);

  useEffect(() => {
    // Load from localStorage
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

    // Bell sound every 108th bead
    if (newCount % 108 === 0) {
      playBellSound();
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

  return (
    <PageLayout gradient="calm" tagline="Offline devotion tracker — sacred, silent, secure.">
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
          className="w-64 h-64 rounded-full bg-primary/20 hover:bg-primary/30 transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 animate-pulse-glow"
        >
          <div className="text-center">
            <div className="text-6xl font-light text-foreground">{count}</div>
            <div className="text-sm text-muted-foreground mt-2">beads</div>
            <div className="text-xs text-muted-foreground/70 mt-1">
              {Math.floor(count / 108)} malas complete
            </div>
          </div>
        </button>

        {/* Bead visualization */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
          {Array.from({ length: Math.min(count % 108, 108) }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/60 animate-fade-in"
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
