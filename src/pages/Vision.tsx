import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type Module = "select" | "nearfar" | "palming" | "blink";

const Vision = () => {
  const [activeModule, setActiveModule] = useState<Module>("select");
  const [focusPoint, setFocusPoint] = useState<"near" | "far">("near");
  const [palmingTimer, setPalmingTimer] = useState(10);
  const [blinkCount, setBlinkCount] = useState(0);
  const [showCircle, setShowCircle] = useState(false);
  const [circleDirection, setCircleDirection] = useState<"clockwise" | "anticlockwise">("clockwise");

  // Near-Far Focus toggle
  useEffect(() => {
    if (activeModule === "nearfar") {
      const interval = setInterval(() => {
        setFocusPoint(prev => prev === "near" ? "far" : "near");
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeModule]);

  // Palming timer countdown
  useEffect(() => {
    if (activeModule === "palming" && palmingTimer > 0) {
      const timer = setTimeout(() => setPalmingTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (palmingTimer === 0 && activeModule === "palming") {
      setTimeout(() => {
        setPalmingTimer(10);
        setActiveModule("select");
      }, 2000);
    }
  }, [activeModule, palmingTimer]);

  // Blink animation
  useEffect(() => {
    if (activeModule === "blink" && blinkCount < 10) {
      const interval = setInterval(() => {
        setBlinkCount(prev => prev + 1);
      }, 2000);
      return () => clearInterval(interval);
    } else if (blinkCount === 10 && !showCircle) {
      setTimeout(() => setShowCircle(true), 1000);
    }
  }, [activeModule, blinkCount, showCircle]);

  // Circle rotation direction toggle
  useEffect(() => {
    if (showCircle) {
      const interval = setInterval(() => {
        setCircleDirection(prev => prev === "clockwise" ? "anticlockwise" : "clockwise");
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [showCircle]);

  const resetModule = (module: Module) => {
    setFocusPoint("near");
    setPalmingTimer(10);
    setBlinkCount(0);
    setShowCircle(false);
    setCircleDirection("clockwise");
    setActiveModule(module);
  };

  const modules = [
    { id: "nearfar" as Module, label: "Near–Far Focus", icon: "👁️" },
    { id: "palming" as Module, label: "Palming Warmth", icon: "🤲" },
    { id: "blink" as Module, label: "Blink & Refresh", icon: "✨" },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-foreground mb-4">
              Vision
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Gentle exercises for eye focus and clarity
            </p>
          </div>

          {/* 20-20-20 Rule */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50"
          >
            <p className="text-center text-sm text-muted-foreground italic">
              Every 20 minutes, look at something 20 feet (6 meters) away for 20 seconds.
            </p>
          </motion.div>

          {/* Module Selection */}
          {activeModule === "select" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-6 md:grid-cols-3"
            >
              {modules.map((module, index) => (
                <motion.button
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => resetModule(module.id)}
                  className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4">{module.icon}</div>
                  <h3 className="text-lg font-light tracking-wide text-foreground group-hover:text-primary transition-colors">
                    {module.label}
                  </h3>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Near-Far Focus Module */}
          {activeModule === "nearfar" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-12 max-w-md mx-auto">
                Focus on the near point… then gently shift to the far point… breathe naturally.
              </p>
              <div className="relative h-96 flex items-center justify-center">
                {/* Near Dot */}
                <motion.div
                  animate={{
                    scale: focusPoint === "near" ? [1, 1.2, 1] : 0.8,
                    opacity: focusPoint === "near" ? 1 : 0.3,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 blur-sm"
                  style={{ filter: "blur(8px)" }}
                />
                <motion.div
                  animate={{
                    scale: focusPoint === "near" ? [1, 1.2, 1] : 0.8,
                    opacity: focusPoint === "near" ? 1 : 0.3,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute w-16 h-16 rounded-full bg-primary"
                />

                {/* Far Dot */}
                <motion.div
                  animate={{
                    scale: focusPoint === "far" ? [1, 1.2, 1] : 0.6,
                    opacity: focusPoint === "far" ? 1 : 0.2,
                    x: 200,
                    y: -100,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/60 blur-sm"
                  style={{ filter: "blur(6px)" }}
                />
                <motion.div
                  animate={{
                    scale: focusPoint === "far" ? [1, 1.2, 1] : 0.6,
                    opacity: focusPoint === "far" ? 1 : 0.2,
                    x: 200,
                    y: -100,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute w-8 h-8 rounded-full bg-secondary"
                />
              </div>
              <p className="text-lg text-foreground capitalize mt-8">
                {focusPoint}
              </p>
              <Button
                onClick={() => setActiveModule("select")}
                variant="outline"
                className="mt-8"
              >
                Back to Modules
              </Button>
            </motion.div>
          )}

          {/* Palming Warmth Module */}
          {activeModule === "palming" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
                Rub your palms until warm and gently cup them over your closed eyes.<br />
                Stay here for a few breaths.
              </p>
              <div className="relative h-96 flex items-center justify-center">
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
                  className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-300/20"
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
                  className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-amber-300/30 to-orange-200/30"
                  style={{ filter: "blur(30px)" }}
                />
              </div>
              <AnimatePresence>
                {palmingTimer > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-3xl text-foreground mt-8"
                  >
                    {palmingTimer}s
                  </motion.p>
                )}
              </AnimatePresence>
              {palmingTimer === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted-foreground mt-8"
                >
                  Complete ✨
                </motion.p>
              )}
              <Button
                onClick={() => setActiveModule("select")}
                variant="outline"
                className="mt-8"
              >
                Back to Modules
              </Button>
            </motion.div>
          )}

          {/* Blink & Refresh Module */}
          {activeModule === "blink" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              {!showCircle ? (
                <>
                  <p className="text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
                    Blink slowly 10 times.<br />
                    Keep your shoulders relaxed.<br />
                    Breathe softly as you blink.
                  </p>
                  <div className="relative h-96 flex items-center justify-center">
                    {/* Eyelid animation */}
                    <div className="relative w-48 h-32">
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
                  <p className="text-2xl text-foreground mt-8">
                    {blinkCount} / 10
                  </p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
                    Now let your gaze travel in a gentle circular motion.<br />
                    Slow, smooth, and calm.
                  </p>
                  <div className="relative h-96 flex items-center justify-center">
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
                      className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40"
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
                      className="absolute w-64 h-64"
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
                  <p className="text-sm text-muted-foreground mt-8 capitalize">
                    {circleDirection}
                  </p>
                </>
              )}
              <Button
                onClick={() => setActiveModule("select")}
                variant="outline"
                className="mt-8"
              >
                Back to Modules
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Vision;
