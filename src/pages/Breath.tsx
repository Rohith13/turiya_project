import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

type Mood = "calm" | "focus" | "energy";

const moodSettings = {
  calm: {
    duration: 8,
    label: "Calm",
    gradient: "calm" as const,
  },
  focus: {
    duration: 6,
    label: "Focus",
    gradient: "focus" as const,
  },
  energy: {
    duration: 4,
    label: "Energy",
    gradient: "energy" as const,
  },
};

const Breath = () => {
  const [mood, setMood] = useState<Mood>("calm");
  const setting = moodSettings[mood];

  return (
    <PageLayout gradient={setting.gradient} tagline="A visual guide to your breath — science and spirit in sync.">
      <div className="flex flex-col items-center justify-center gap-12 w-full">
        {/* Mood selector */}
        <div className="flex gap-4">
          {(Object.keys(moodSettings) as Mood[]).map((m) => (
            <Button
              key={m}
              onClick={() => setMood(m)}
              variant={mood === m ? "default" : "outline"}
              size="lg"
              className="min-w-[100px] transition-all duration-300"
            >
              {moodSettings[m].label}
            </Button>
          ))}
        </div>

        {/* Breathing visualization */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-full bg-primary/30 animate-breathe"
            style={{ animationDuration: `${setting.duration}s` }}
          />
          <div 
            className="absolute inset-8 rounded-full bg-primary/50 animate-breathe"
            style={{ 
              animationDuration: `${setting.duration}s`,
              animationDelay: `${setting.duration * 0.25}s` 
            }}
          />
          <div 
            className="absolute inset-16 rounded-full bg-primary/70 animate-breathe"
            style={{ 
              animationDuration: `${setting.duration}s`,
              animationDelay: `${setting.duration * 0.5}s` 
            }}
          />
          
          <div className="text-center z-10">
            <p className="text-sm text-foreground/70 font-light">
              Breathe with the rhythm
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2 max-w-md">
          <p className="text-sm text-muted-foreground font-light">
            Inhale as the circle expands
          </p>
          <p className="text-sm text-muted-foreground font-light">
            Exhale as the circle contracts
          </p>
          <p className="text-xs text-muted-foreground/70 font-light mt-4">
            {setting.duration} second cycle • {60 / setting.duration} breaths per minute
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Breath;
