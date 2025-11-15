import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

type Mood = "calm" | "focus" | "prana";

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
  prana: {
    duration: 33,
    label: "Prana",
    gradient: "focus" as const,
    color: "180 50% 65%",
    glowColor: "180 70% 80%",
    type: "wave" as const,
    phases: {
      inhale: 5,
      gap1: 1,
      hold: 15,
      gap2: 1,
      exhale: 10,
      gap3: 1,
    },
  },
};

const Breath = () => {
  const [mood, setMood] = useState<Mood>("calm");
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [displayNumber, setDisplayNumber] = useState<number | null>(1);
  
  const setting = moodSettings[mood];
  const duration = setting.duration;

  // Timer logic for all modes - 1 second intervals
  useEffect(() => {
    setTimer(0);
    setPhase("inhale");
    setDisplayNumber(1);
    
    const interval = setInterval(() => {
      setTimer((prev) => {
        const nextTime = prev + 1;
        
        if (setting.type === "wave") {
          // Prana mode with gaps
          const cycleTime = 33; // 5 inhale + 1 gap + 15 hold + 1 gap + 10 exhale + 1 gap
          const currentTime = nextTime % cycleTime;
          
          if (currentTime < 5) {
            setPhase("inhale");
            setDisplayNumber(currentTime + 1);
          } else if (currentTime === 5) {
            setPhase("inhale");
            setDisplayNumber(null);
          } else if (currentTime < 21) {
            setPhase("hold");
            if (currentTime === 6) {
              setDisplayNumber(null);
            } else {
              setDisplayNumber(currentTime - 6 + 1);
            }
          } else if (currentTime === 21) {
            setPhase("hold");
            setDisplayNumber(null);
          } else if (currentTime < 32) {
            setPhase("exhale");
            if (currentTime === 22) {
              setDisplayNumber(null);
            } else {
              setDisplayNumber(32 - currentTime);
            }
          } else {
            setPhase("exhale");
            setDisplayNumber(null);
          }
          
          return nextTime;
        } else {
          // For orb modes (calm, focus, energy) with gaps
          const halfDuration = duration / 2;
          const cycleTime = duration + 2; // inhale + gap + exhale + gap
          const currentTime = nextTime % cycleTime;
          
          if (currentTime < halfDuration) {
            setPhase("inhale");
            setDisplayNumber(currentTime + 1);
          } else if (currentTime === halfDuration) {
            setPhase("inhale");
            setDisplayNumber(null);
          } else if (currentTime < duration + 1) {
            setPhase("exhale");
            if (currentTime === halfDuration + 1) {
              setDisplayNumber(null);
            } else {
              setDisplayNumber(duration + 1 - currentTime);
            }
          } else {
            setPhase("exhale");
            setDisplayNumber(null);
          }
          
          return nextTime;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mood, duration, setting]);


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
              
              <div className="text-center z-10 space-y-1">
                <p className="text-6xl font-light text-foreground/90">
                  {displayNumber || ""}
                </p>
                <p className="text-sm text-foreground/70 font-light capitalize">
                  {displayNumber !== null && phase}
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
                    duration: phase === "inhale" ? 5 : phase === "hold" ? 15 : 10,
                    ease: "linear",
                  }}
                />
              </svg>
              
              {/* Center content */}
              <div className="text-center z-10 space-y-2">
                <p className="text-5xl font-light text-foreground/90">
                  {displayNumber || ""}
                </p>
                <p className="text-sm text-foreground/70 font-light capitalize">
                  {displayNumber !== null && phase}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center space-y-2 max-w-md">
              <p className="text-sm text-muted-foreground font-light">
                5s Inhale • 15s Hold • 10s Exhale
              </p>
              <p className="text-xs text-muted-foreground/70 font-light mt-4">
                Breath retention for lung capacity and calm
              </p>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Breath;
