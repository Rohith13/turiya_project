import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";

type Module = "nearfar" | "palming" | "blink";

const Vision = () => {
  const [activeModule, setActiveModule] = useState<Module>("nearfar");
  const [focusPoint, setFocusPoint] = useState<"near" | "far">("near");
  const [palmingTimer, setPalmingTimer] = useState(10);
  const [blinkCount, setBlinkCount] = useState(0);
  const [showCircle, setShowCircle] = useState(false);
  const [circleDirection, setCircleDirection] = useState<"clockwise" | "anticlockwise">("clockwise");
  const [rotationCount, setRotationCount] = useState(1);

  // Near-Far Focus toggle
  useEffect(() => {
    if (activeModule === "nearfar") {
      const interval = setInterval(() => {
        setFocusPoint((prev) => (prev === "near" ? "far" : "near"));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeModule]);

  // Palming timer countdown
  useEffect(() => {
    if (activeModule === "palming" && palmingTimer > 0) {
      const timer = setTimeout(() => setPalmingTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [activeModule, palmingTimer]);

  // Blink animation
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

  // Circle rotation direction toggle and counter
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

  // Rotation counter
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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
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
          {/* Near-Far Focus Module */}
          {activeModule === "nearfar" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <p className="text-sm md:text-base text-muted-foreground mb-12 max-w-md mx-auto">
                Look at your thumb (20–30 cm away), then look at a distant object.
                <br />
                Perform this back and forth for 10–15 seconds while breathing naturally.
                <br />
              </p>
              <div className="relative h-64 md:h-96 flex items-center justify-center">
                {/* Near Dot */}
                <motion.div
                  animate={{
                    scale: focusPoint === "near" ? [1, 1.2, 1] : 0.8,
                    opacity: focusPoint === "near" ? 1 : 0.3,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 blur-sm"
                  style={{ filter: "blur(8px)" }}
                />
                <motion.div
                  animate={{
                    scale: focusPoint === "near" ? [1, 1.2, 1] : 0.8,
                    opacity: focusPoint === "near" ? 1 : 0.3,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary"
                />

                {/* Far Dot */}
                <motion.div
                  animate={{
                    scale: focusPoint === "far" ? [1, 1.2, 1] : 0.6,
                    opacity: focusPoint === "far" ? 1 : 0.2,
                    x: [150, 200],
                    y: [-80, -100],
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/60 blur-sm"
                  style={{ filter: "blur(6px)" }}
                />
                <motion.div
                  animate={{
                    scale: focusPoint === "far" ? [1, 1.2, 1] : 0.6,
                    opacity: focusPoint === "far" ? 1 : 0.2,
                    x: [150, 200],
                    y: [-80, -100],
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary"
                />
              </div>
              <p className="text-base md:text-lg text-foreground capitalize mt-8">{focusPoint}</p>
            </motion.div>
          )}

          {/* Palming Warmth Module */}
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
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-300/20"
                  style={{ filter: "blur(40px)" }}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-amber-300/30 to-orange-200/30"
                  style={{ filter: "blur(30px)" }}
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
                    {/* Eyelid animation */}
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
                    {/* Center glow */}
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

                    {/* Rotating ring */}
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
