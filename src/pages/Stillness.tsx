import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";

const koans = [
  "What is the sound of one hand clapping?",
  "Before you were born, what was your original face?",
  "If you meet the Buddha, kill the Buddha.",
  "The wild geese do not intend to cast their reflection. The water has no mind to receive their image.",
  "When walking, just walk. When sitting, just sit. Above all, don't wobble.",
  "The obstacle is the path.",
  "Let go or be dragged.",
  "Silence is the language of God; all else is poor translation.",
  "Empty your mind, be formless, shapeless — like water.",
  "The present moment is the only moment available to us.",
  "You are the sky. Everything else is just the weather.",
  "Be still and know.",
  "To study the self is to forget the self.",
  "The tighter you squeeze, the less you have.",
  "Not knowing is most intimate.",
  "The way out is through.",
  "Show me your face before your parents were born.",
  "A finger pointing at the moon is not the moon.",
  "In the beginner's mind there are many possibilities, in the expert's mind there are few.",
  "No snowflake ever falls in the wrong place.",
  "The quieter you become, the more you can hear.",
  "Sitting quietly, doing nothing, spring comes and the grass grows by itself.",
  "When you realize nothing is lacking, the whole world belongs to you.",
  "The way is not in the sky; the way is in the heart.",
];

const getRandomKoan = (exclude?: string) => {
  const filtered = exclude ? koans.filter((k) => k !== exclude) : koans;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

const Stillness = () => {
  const [koan, setKoan] = useState(() => getRandomKoan());
  const [quoteKey, setQuoteKey] = useState(0);
  const [pauseActive, setPauseActive] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const nextKoan = useCallback(() => {
    if (pauseActive) return;
    setKoan((prev) => getRandomKoan(prev));
    setQuoteKey((k) => k + 1);
  }, [pauseActive]);

  const beginPause = useCallback(() => {
    setPauseActive(true);
    setCountdown(60);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!pauseActive || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [pauseActive, countdown]);

  // When countdown reaches 0, show new quote
  useEffect(() => {
    if (pauseActive && countdown === 0) {
      const timeout = setTimeout(() => {
        setKoan(getRandomKoan(koan));
        setQuoteKey((k) => k + 1);
        setPauseActive(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [pauseActive, countdown, koan]);

  return (
    <PageLayout gradient="sacred" tagline="Pause for a moment — the app forgets, so you can too.">
      <div className="flex flex-col items-center justify-center gap-8 min-h-[60vh] relative">
        <AnimatePresence mode="wait">
          {pauseActive ? (
            <motion.div
              key="pause"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-6"
            >
              {/* Dimmed overlay effect via reduced opacity on everything else */}
              <motion.span
                key={countdown}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="text-6xl md:text-8xl font-extralight tracking-wider"
                style={{ color: "#D4956A" }}
              >
                {countdown}
              </motion.span>
              <p className="text-sm text-muted-foreground/50 font-light tracking-widest">
                just breathe
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-10"
            >
              {/* Ambient Orb */}
              <button
                onClick={nextKoan}
                className="relative w-48 h-48 flex items-center justify-center cursor-pointer group focus:outline-none"
                aria-label="Next quote"
              >
                <motion.div
                  animate={{
                    scale: [0.85, 1.1, 0.85],
                    opacity: [0.25, 0.5, 0.25],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(212,149,106,0.35) 0%, rgba(212,149,106,0.05) 70%, transparent 100%)" }}
                />
                <motion.div
                  animate={{
                    scale: [0.9, 1.15, 0.9],
                    opacity: [0.3, 0.55, 0.3],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute inset-6 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(212,149,106,0.45) 0%, rgba(212,149,106,0.1) 70%, transparent 100%)" }}
                />
                <motion.div
                  animate={{
                    scale: [0.95, 1.08, 0.95],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
                  className="absolute inset-12 rounded-full group-hover:opacity-80 transition-opacity"
                  style={{ background: "radial-gradient(circle, rgba(212,149,106,0.55) 0%, rgba(212,149,106,0.15) 70%, transparent 100%)" }}
                />
              </button>

              {/* Quote */}
              <div className="max-w-2xl text-center space-y-6">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={quoteKey}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-2xl md:text-4xl font-light leading-relaxed"
                    style={{ fontFamily: "'Lora', serif", color: "hsl(var(--foreground) / 0.9)" }}
                  >
                    {koan}
                  </motion.h1>
                </AnimatePresence>
                <p className="text-sm text-muted-foreground/60 font-light tracking-widest">
                  Breathe. Reflect. Release.
                </p>
              </div>

              {/* Begin Pause */}
              <motion.button
                onClick={beginPause}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-4 text-xs font-light tracking-[0.2em] uppercase border-b pb-1 transition-colors duration-300 hover:opacity-70"
                style={{ color: "#D4956A", borderColor: "rgba(212,149,106,0.3)" }}
              >
                Begin your pause
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};

export default Stillness;
