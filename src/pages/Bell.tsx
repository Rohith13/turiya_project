import { useEffect, useState, useCallback } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell as BellIcon } from "lucide-react";
import * as Tone from "tone";
import { toast } from "sonner";

const intervals = [
  { value: "10", label: "10 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "random", label: "Random (5-30 min)" },
];

const Bell = () => {
  const [selectedInterval, setSelectedInterval] = useState("30");
  const [isActive, setIsActive] = useState(false);
  const [nextBell, setNextBell] = useState<Date | null>(null);

  const playBell = useCallback(async () => {
    await Tone.start();
    const bell = new Tone.MetalSynth({
      envelope: { attack: 0.01, decay: 2.5, release: 5 },
      harmonicity: 5.1,
      modulationIndex: 12,
      resonance: 400,
      octaves: 1,
    }).toDestination();
    
    bell.volume.value = -12;
    bell.triggerAttackRelease("G4", "2n");
    
    // Vibration
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    
    toast.success("🔔 Return to presence", {
      duration: 3000,
    });
  }, []);

  const scheduleNextBell = useCallback(() => {
    let minutes: number;
    
    if (selectedInterval === "random") {
      minutes = Math.floor(Math.random() * 25) + 5; // 5-30 minutes
    } else {
      minutes = parseInt(selectedInterval);
    }
    
    const next = new Date();
    next.setMinutes(next.getMinutes() + minutes);
    setNextBell(next);
    
    return minutes * 60 * 1000; // Convert to milliseconds
  }, [selectedInterval]);

  useEffect(() => {
    // Load saved settings
    const savedInterval = localStorage.getItem("bellInterval");
    const savedActive = localStorage.getItem("bellActive");
    
    if (savedInterval) setSelectedInterval(savedInterval);
    if (savedActive === "true") setIsActive(true);
  }, []);

  useEffect(() => {
    if (!isActive) {
      setNextBell(null);
      return;
    }

    const delay = scheduleNextBell();
    
    const timer = setTimeout(() => {
      playBell();
      if (isActive) {
        scheduleNextBell();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isActive, selectedInterval, scheduleNextBell, playBell]);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    localStorage.setItem("bellActive", newState.toString());
    
    if (newState) {
      toast.success("Bell activated");
    } else {
      toast.info("Bell paused");
    }
  };

  const handleIntervalChange = (value: string) => {
    setSelectedInterval(value);
    localStorage.setItem("bellInterval", value);
    
    if (isActive) {
      scheduleNextBell();
    }
  };

  return (
    <PageLayout gradient="sacred" tagline="A gentle reminder to return to presence.">
      <div className="flex flex-col items-center justify-center gap-12 w-full max-w-md">
        {/* Bell visualization */}
        <button
          onClick={playBell}
          className="w-48 h-48 rounded-full bg-primary/20 hover:bg-primary/30 transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 hover:animate-pulse-glow"
        >
          <BellIcon size={64} className="text-primary" />
        </button>

        {/* Controls */}
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground font-light">Bell Interval</label>
            <Select value={selectedInterval} onValueChange={handleIntervalChange}>
              <SelectTrigger className="w-full bg-card/50 backdrop-blur border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {intervals.map((interval) => (
                  <SelectItem key={interval.value} value={interval.value}>
                    {interval.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleToggle}
            variant={isActive ? "default" : "outline"}
            size="lg"
            className="w-full"
          >
            {isActive ? "Pause Bell" : "Activate Bell"}
          </Button>

          {isActive && nextBell && (
            <p className="text-center text-sm text-muted-foreground font-light">
              Next bell at {nextBell.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>

        <div className="text-center text-xs text-muted-foreground/70 font-light max-w-xs">
          Click the bell to hear it anytime, or activate automatic reminders to return to mindful presence throughout your day.
        </div>
      </div>
    </PageLayout>
  );
};

export default Bell;
