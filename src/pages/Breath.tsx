import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [phaseKey, setPhaseKey] = useState(0);
  
  const setting = moodSettings[mood];
  const duration = setting.duration;

  // Timer logic for all modes - 1 second intervals
  useEffect(() => {
    setTimer(0);
    setPhase("inhale");
    setDisplayNumber(1);
    setPhaseKey(0);
    
    let lastPhase = "inhale";
    
    const interval = setInterval(() => {
      setTimer((prev) => {
        const nextTime = prev + 1;
        
        if (setting.type === "wave") {
          const cycleTime = 33;
          const currentTime = nextTime % cycleTime;
          
          let newPhase: "inhale" | "hold" | "exhale" = "inhale";
          
          if (currentTime < 5) {
            newPhase = "inhale";
            setDisplayNumber(currentTime + 1);
          } else if (currentTime === 5) {
            newPhase = "inhale";
            setDisplayNumber(null);
          } else if (currentTime < 21) {
            newPhase = "hold";
            if (currentTime === 6) {
              setDisplayNumber(null);
            } else {
              setDisplayNumber(currentTime - 6 + 1);
            }
          } else if (currentTime === 21) {
            newPhase = "hold";
            setDisplayNumber(null);
          } else if (currentTime < 32) {
            newPhase = "exhale";
            if (currentTime === 22) {
              setDisplayNumber(null);
            } else {
              setDisplayNumber(32 - currentTime);
            }
          } else {
            newPhase = "exhale";
            setDisplayNumber(null);
          }
          
          if (newPhase !== lastPhase) {
            setPhaseKey(k => k + 1);
            lastPhase = newPhase;
          }
          setPhase(newPhase);
          
          return nextTime;
        } else {
          const halfDuration = duration / 2;
          const cycleTime = duration + 2;
          const currentTime = nextTime % cycleTime;
          
          let newPhase: "inhale" | "exhale" = "inhale";
          
          if (currentTime < halfDuration) {
            newPhase = "inhale";
            setDisplayNumber(currentTime + 1);
          } else if (currentTime === halfDuration) {
            newPhase = "inhale";
            setDisplayNumber(null);
          } else if (currentTime < duration + 1) {
            newPhase = "exhale";
            if (currentTime === halfDuration + 1) {
              setDisplayNumber(null);
            } else {
              setDisplayNumber(duration + 1 - currentTime);
            }
          } else {
            newPhase = "exhale";
            setDisplayNumber(null);
          }
          
          if (newPhase !== lastPhase) {
            setPhaseKey(k => k + 1);
            lastPhase = newPhase;
          }
          setPhase(newPhase);
          
          return nextTime;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mood, duration, setting]);

  // Calculate arc progress based on phase and timer
  const getArcProgress = () => {
    if (setting.type === "wave") {
      const cycleTime = 33;
      const currentTime = timer % cycleTime;
      
      if (currentTime < 5) {
        return (currentTime + 1) / 5; // inhale: 0 -> 1
      } else if (currentTime < 21) {
        return 1; // hold at max
      } else if (currentTime < 32) {
        return 1 - ((currentTime - 21) / 10); // exhale: 1 -> 0
      }
      return 0;
    } else {
      const halfDuration = duration / 2;
      const cycleTime = duration + 2;
      const currentTime = timer % cycleTime;
      
      if (currentTime < halfDuration) {
        return (currentTime + 1) / halfDuration; // inhale
      } else if (currentTime < duration + 1) {
        return 1 - ((currentTime - halfDuration) / (halfDuration + 1)); // exhale
      }
      return 0;
    }
  };

  const arcProgress = getArcProgress();

  // Generate sine wave path that breathes
  const generateBreathingArc = (progress: number) => {
    const width = 280;
    const centerY = 160;
    const amplitude = 40 + (progress * 60); // Arc height based on breath
    const points: string[] = [];
    
    for (let x = 20; x <= 300; x += 5) {
      const normalizedX = (x - 20) / width;
      const y = centerY - Math.sin(normalizedX * Math.PI) * amplitude;
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(' L ')}`;
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
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${phase}-${phaseKey}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-foreground/70 font-light capitalize"
                  >
                    {displayNumber !== null && phase}
                  </motion.p>
                </AnimatePresence>
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
            {/* Breathing Arc Animation */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              <svg className="absolute w-full h-full" viewBox="0 0 320 320">
                <defs>
                  <linearGradient id="arcGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" style={{ stopColor: `hsl(${setting.color})`, stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: `hsl(${setting.glowColor})`, stopOpacity: 0.9 }} />
                  </linearGradient>
                  <filter id="arcGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Breathing sine-wave arc */}
                <motion.path
                  d={generateBreathingArc(arcProgress)}
                  stroke="url(#arcGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#arcGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Secondary subtle arc for depth */}
                <motion.path
                  d={generateBreathingArc(arcProgress * 0.7)}
                  stroke={`hsl(${setting.color})`}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.3}
                />
              </svg>
              
              {/* Center content - number is secondary */}
              <div className="text-center z-10 space-y-2">
                <p className="text-3xl font-extralight text-foreground/60">
                  {displayNumber || ""}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${phase}-${phaseKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg text-foreground/80 font-light capitalize tracking-wider"
                  >
                    {displayNumber !== null && phase}
                  </motion.p>
                </AnimatePresence>
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
