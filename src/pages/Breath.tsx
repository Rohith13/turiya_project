import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

type Mood = "calm" | "focus" | "energy" | "prana";

const moodSettings = {
  calm: {
    duration: 8,
    label: "Calm",
    gradient: "calm" as const,
    color: "200 60% 70%",
    glowColor: "200 80% 85%",
    type: "orb" as const,
  },
  focus: {
    duration: 6,
    label: "Focus",
    gradient: "focus" as const,
    color: "35 70% 65%",
    glowColor: "35 85% 80%",
    type: "orb" as const,
  },
  energy: {
    duration: 4,
    label: "Energy",
    gradient: "energy" as const,
    color: "45 85% 60%",
    glowColor: "45 95% 75%",
    type: "orb" as const,
  },
  prana: {
    duration: 12,
    label: "Prana",
    gradient: "focus" as const,
    color: "180 50% 65%",
    glowColor: "180 70% 80%",
    type: "wave" as const,
    phases: {
      inhale: 4,
      hold: 4,
      exhale: 4,
    },
  },
};

const Breath = () => {
  const [mood, setMood] = useState<Mood>("calm");
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  
  const setting = moodSettings[mood];
  const duration = setting.duration;

  // Timer logic for all modes
  useEffect(() => {
    setTimer(0);
    setPhase("inhale");
    
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (setting.type === "wave") {
          const { inhale, hold, exhale } = setting.phases;
          const totalCycle = inhale + hold + exhale;
          const nextTime = (prev + 0.1) % totalCycle;
          
          if (nextTime < inhale) {
            setPhase("inhale");
          } else if (nextTime < inhale + hold) {
            setPhase("hold");
          } else {
            setPhase("exhale");
          }
          
          return nextTime;
        } else {
          // For orb modes (calm, focus, energy)
          const nextTime = (prev + 0.1) % duration;
          if (nextTime < duration / 2) {
            setPhase("inhale");
          } else {
            setPhase("exhale");
          }
          return nextTime;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [mood, duration, setting]);

  const getDisplayTimer = () => {
    if (setting.type === "wave") {
      const { inhale, hold, exhale } = setting.phases;
      if (phase === "inhale") {
        return Math.ceil(inhale - timer);
      } else if (phase === "hold") {
        return Math.ceil(inhale + hold - timer);
      } else {
        return Math.ceil(inhale + hold + exhale - timer);
      }
    } else {
      // For orb modes, show ascending during inhale, descending during exhale
      const halfDuration = duration / 2;
      if (phase === "inhale") {
        return Math.ceil(timer) + 1;
      } else {
        return Math.ceil(duration - timer);
      }
    }
  };

  return (
    <PageLayout gradient={setting.gradient} tagline="Breathe in light, breathe out peace.">
      <div className="flex flex-col items-center justify-center gap-12 w-full">
        {/* Mood selector */}
        <div className="flex gap-4 flex-wrap justify-center">
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

        {setting.type === "orb" ? (
          <>
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
                <p className="text-6xl font-light text-foreground/90">
                  {getDisplayTimer()}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center space-y-2 max-w-md">
              <p className="text-sm text-muted-foreground font-light">
                Inhale as the light brightens • Exhale as the light dims
              </p>
              <p className="text-xs text-muted-foreground/70 font-light mt-4">
                {duration} second cycle • {Math.round(60 / duration)} breaths per minute
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Prana Wave Animation */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              <svg className="absolute w-full h-full" viewBox="0 0 320 320">
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: `hsl(${setting.color})`, stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: `hsl(${setting.glowColor})`, stopOpacity: 0.3 }} />
                  </linearGradient>
                </defs>
                
                {/* Flowing wave line */}
                <motion.path
                  d="M 40 160 Q 100 160, 160 160 T 280 160"
                  stroke="url(#waveGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: phase === "inhale" ? [0, 1] : phase === "hold" ? 1 : [1, 0],
                    d: phase === "inhale" 
                      ? "M 40 280 Q 100 80, 160 80 T 280 80"
                      : phase === "hold"
                      ? "M 40 80 Q 100 80, 160 80 T 280 80"
                      : "M 40 80 Q 100 280, 160 280 T 280 280",
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: phase === "inhale" ? setting.phases.inhale : phase === "hold" ? setting.phases.hold : setting.phases.exhale,
                    ease: "easeInOut",
                  }}
                />
              </svg>
              
              {/* Center content */}
              <div className="text-center z-10 space-y-2">
                <p className="text-5xl font-light text-foreground/90">
                  {getDisplayTimer()}
                </p>
                <p className="text-sm text-foreground/70 font-light capitalize">
                  {phase}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center space-y-2 max-w-md">
              <p className="text-sm text-muted-foreground font-light">
                {setting.phases.inhale}s Inhale • {setting.phases.hold}s Hold • {setting.phases.exhale}s Exhale
              </p>
              <p className="text-xs text-muted-foreground/70 font-light mt-4">
                Box breathing for lung capacity and calm
              </p>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Breath;
