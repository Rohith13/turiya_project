import { useState, useEffect, useCallback } from "react";
import PageLayout from "@/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";

type Module = "nearfar" | "palming" | "blink";

const Vision = () => {
  const [activeModule, setActiveModule] = useState<Module>("nearfar");
  const [focusPoint, setFocusPoint] = useState<"near" | "far">("near");
  const [palmingElapsed, setPalmingElapsed] = useState(0);
  const [palmingBreathPhase, setPalmingBreathPhase] = useState<"in" | "out">("in");
  const [blinkCount, setBlinkCount] = useState(0);
  const [showCircle, setShowCircle] = useState(false);
  const [circleDirection, setCircleDirection] = useState<"clockwise" | "anticlockwise">("clockwise");
  const [rotationCount, setRotationCount] = useState(1);

  const PALMING_DURATION = 30; // total seconds for the subtle progress arc

  useEffect(() => {
    if (activeModule === "nearfar") {
      const interval = setInterval(() => {
        setFocusPoint((prev) => (prev === "near" ? "far" : "near"));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeModule]);

  useEffect(() => {
    if (activeModule === "palming" && palmingTimer > 0) {
      const timer = setTimeout(() => setPalmingTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [activeModule, palmingTimer]);

  useEffect(() => {
    if (activeModule === "blink" && blinkCount < 10) {
      const interval = setInterval(() => {
        setBlinkCount((prev) => prev + 1);
      }, 2000);
      return () => clearInterval(interval);
    } else if (blinkCount === 10 && !showCircle) {
      setTimeout(() => setShowCircle(true), 1000);
    }
  }, [activeModule, blinkCount, showCircle]);

  useEffect(() => {
    if (showCircle) {
      setRotationCount(1);
      const interval = setInterval(() => {
        setCircleDirection((prev) => {
          const newDirection = prev === "clockwise" ? "anticlockwise" : "clockwise";
          setRotationCount(1);
          return newDirection;
        });
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [showCircle]);

  useEffect(() => {
    if (showCircle) {
      const interval = setInterval(() => {
        setRotationCount((prev) => {
          if (circleDirection === "clockwise") {
            return prev < 5 ? prev + 1 : 1;
          } else {
            return prev > 1 ? prev - 1 : 5;
          }
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [showCircle, circleDirection]);

  const resetModule = (module: Module) => {
    setFocusPoint("near");
    setPalmingTimer(10);
    setBlinkCount(0);
    setShowCircle(false);
    setCircleDirection("clockwise");
    setRotationCount(1);
    setActiveModule(module);
  };

  return (
    <PageLayout tagline="Gentle exercises for eye focus and clarity">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Module Selector Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16"
        >
          <button
            onClick={() => resetModule("nearfar")}
            className={`px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-light tracking-wide transition-all duration-300 ${
              activeModule === "nearfar"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/50 text-muted-foreground hover:text-foreground hover:bg-background/80 border border-border/50"
            }`}
          >
            Near–Far Focus
          </button>
          <button
            onClick={() => resetModule("palming")}
            className={`px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-light tracking-wide transition-all duration-300 ${
              activeModule === "palming"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/50 text-muted-foreground hover:text-foreground hover:bg-background/80 border border-border/50"
            }`}
          >
            Palming Warmth
          </button>
          <button
            onClick={() => resetModule("blink")}
            className={`px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-light tracking-wide transition-all duration-300 ${
              activeModule === "blink"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/50 text-muted-foreground hover:text-foreground hover:bg-background/80 border border-border/50"
            }`}
          >
            Blink & Refresh
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
          {/* Near-Far Focus Module — single dot that transitions between near and far */}
          {activeModule === "nearfar" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <p className="text-sm md:text-base text-muted-foreground mb-12 max-w-md mx-auto">
                Look at your thumb (20–30 cm away), then look at a distant object.
                <br />
                Perform this back and forth for 10–15 seconds while breathing naturally.
              </p>
              <div className="relative h-64 md:h-96 flex items-center justify-center">
                {/* Single focus dot — near: center, large, warm / far: above center, small, cool */}
                <motion.div
                  animate={{
                    scale: focusPoint === "near" ? 1 : 0.4,
                    y: focusPoint === "near" ? 0 : -60,
                    opacity: 1,
                  }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="absolute"
                >
                  {/* Glow */}
                  <motion.div
                    animate={{
                      background: focusPoint === "near"
                        ? "radial-gradient(circle, rgba(212,149,106,0.5) 0%, rgba(212,149,106,0.1) 60%, transparent 100%)"
                        : "radial-gradient(circle, rgba(140,170,200,0.4) 0%, rgba(140,170,200,0.08) 60%, transparent 100%)",
                    }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full"
                    style={{ filter: "blur(12px)" }}
                  />
                  {/* Core dot */}
                  <motion.div
                    animate={{
                      backgroundColor: focusPoint === "near" ? "#D4956A" : "#8CAAC8",
                      width: focusPoint === "near" ? 48 : 20,
                      height: focusPoint === "near" ? 48 : 20,
                    }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="absolute rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </motion.div>
              </div>
              <motion.p
                key={focusPoint}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-base md:text-lg text-foreground capitalize mt-8"
              >
                {focusPoint}
              </motion.p>
            </motion.div>
          )}

          {/* Palming Warmth Module — single centered warm glow */}
          {activeModule === "palming" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <p className="text-sm md:text-base text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
                Rub your palms until warm and gently cup them over your closed eyes.
                <br />
                Stay here for a few breaths.
              </p>
              <div className="relative h-64 md:h-96 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(212,149,106,0.4) 0%, rgba(212,149,106,0.1) 50%, transparent 80%)",
                    filter: "blur(30px)",
                  }}
                />
              </div>
              <AnimatePresence>
                {palmingTimer > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-2xl md:text-3xl text-foreground mt-8"
                  >
                    {palmingTimer}s
                  </motion.p>
                )}
              </AnimatePresence>
              {palmingTimer === 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground mt-8">
                  Complete ✨
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Blink & Refresh Module */}
          {activeModule === "blink" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              {!showCircle ? (
                <>
                  <p className="text-sm md:text-base text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
                    Blink slowly 10 times.
                    <br />
                    Keep your shoulders relaxed.
                    <br />
                    Breathe softly as you blink.
                  </p>
                  <div className="relative h-64 md:h-96 flex items-center justify-center">
                    <div className="relative w-36 h-24 md:w-48 md:h-32">
                      <motion.div
                        animate={{
                          scaleY: blinkCount % 2 === 1 ? 0.1 : 1,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40"
                        style={{ filter: "blur(20px)" }}
                      />
                      <motion.div
                        animate={{
                          scaleY: blinkCount % 2 === 1 ? 0.1 : 1,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/60 to-secondary/60"
                      />
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-foreground mt-8">{blinkCount} / 10</p>
                </>
              ) : (
                <>
                  <p className="text-sm md:text-base text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
                    Now let your gaze travel in a gentle circular motion.
                    <br />
                    Slow, smooth, and calm.
                  </p>
                  <div className="relative h-64 md:h-96 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40"
                      style={{ filter: "blur(20px)" }}
                    />
                    <motion.div
                      animate={{
                        rotate: circleDirection === "clockwise" ? 360 : -360,
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute w-48 h-48 md:w-64 md:h-64"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          strokeDasharray="10 5"
                          opacity="0.6"
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <p className="text-2xl md:text-3xl text-foreground mt-8">{rotationCount}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 capitalize">{circleDirection}</p>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Vision;
