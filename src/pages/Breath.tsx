import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Mood = "calm" | "focus" | "energy";

const moodSettings = {
  calm: {
    duration: 8,
    label: "Calm",
    gradient: "calm" as const,
    color: "200 60% 70%", // cool blue
    glowColor: "200 80% 85%",
  },
  focus: {
    duration: 6,
    label: "Focus",
    gradient: "focus" as const,
    color: "35 70% 65%", // soft amber
    glowColor: "35 85% 80%",
  },
  energy: {
    duration: 4,
    label: "Energy",
    gradient: "energy" as const,
    color: "45 85% 60%", // warm gold
    glowColor: "45 95% 75%",
  },
};

const Breath = () => {
  const [mood, setMood] = useState<Mood>("calm");
  const [customDuration, setCustomDuration] = useState<number | null>(null);
  const [feelingInput, setFeelingInput] = useState("");
  
  const setting = moodSettings[mood];
  const duration = customDuration || setting.duration;

  const handleFeelingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple emotion-to-duration mapping
    const feeling = feelingInput.toLowerCase();
    if (feeling.includes("anxious") || feeling.includes("stressed")) {
      setCustomDuration(8);
    } else if (feeling.includes("tired") || feeling.includes("sleepy")) {
      setCustomDuration(10);
    } else if (feeling.includes("energetic") || feeling.includes("excited")) {
      setCustomDuration(4);
    } else {
      setCustomDuration(6);
    }
  };

  return (
    <PageLayout gradient={setting.gradient} tagline="Breathe in light, breathe out peace.">
      <div className="flex flex-col items-center justify-center gap-12 w-full">
        {/* Mood selector */}
        <div className="flex gap-4">
          {(Object.keys(moodSettings) as Mood[]).map((m) => (
            <Button
              key={m}
              onClick={() => {
                setMood(m);
                setCustomDuration(null);
              }}
              variant={mood === m ? "default" : "outline"}
              size="lg"
              className="min-w-[100px] transition-all duration-300"
            >
              {moodSettings[m].label}
            </Button>
          ))}
        </div>

        {/* Glow Aura Effect */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* Main luminous orb with breathing effect */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "200px",
              height: "200px",
              background: `radial-gradient(circle, hsl(${setting.color}) 0%, hsl(${setting.glowColor}) 30%, transparent 70%)`,
            }}
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.4, 1, 0.4],
              filter: [
                `blur(20px) brightness(0.8)`,
                `blur(40px) brightness(1.5)`,
                `blur(20px) brightness(0.8)`,
              ],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Inner core glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "120px",
              height: "120px",
              background: `radial-gradient(circle, hsl(${setting.color}) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [0.9, 1.2, 0.9],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <div className="text-center z-10">
            <p className="text-sm text-foreground/70 font-light">
              Breathe with the light
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2 max-w-md">
          <p className="text-sm text-muted-foreground font-light">
            Inhale as the light brightens
          </p>
          <p className="text-sm text-muted-foreground font-light">
            Exhale as the light dims
          </p>
          <p className="text-xs text-muted-foreground/70 font-light mt-4">
            {duration} second cycle • {Math.round(60 / duration)} breaths per minute
          </p>
        </div>

        {/* Optional "How do you feel?" input */}
        <form onSubmit={handleFeelingSubmit} className="flex flex-col items-center gap-3 w-full max-w-sm">
          <label htmlFor="feeling" className="text-sm text-muted-foreground font-light">
            How do you feel? (optional)
          </label>
          <div className="flex gap-2 w-full">
            <Input
              id="feeling"
              type="text"
              placeholder="e.g., anxious, calm, tired..."
              value={feelingInput}
              onChange={(e) => setFeelingInput(e.target.value)}
              className="flex-1 bg-background/50 backdrop-blur-sm border-border/50"
            />
            <Button type="submit" variant="outline">
              Adjust
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default Breath;
