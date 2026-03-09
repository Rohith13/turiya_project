import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

type Tone = "peace" | "energy" | "healing" | "focus";

const affirmations = {
  peace: [
    "I am at peace with myself and the world around me.",
    "Calmness flows through me with every breath.",
    "I release all tension and embrace serenity.",
    "Peace is my natural state of being.",
    "I am grounded, centered, and at ease.",
    "I choose peace over worry in every moment.",
    "My inner stillness is unshakable.",
    "I let go of what I cannot control.",
    "Tranquility surrounds and fills me.",
    "I am a sanctuary of calm and clarity.",
    "Peace begins with me.",
    "I rest in the quiet space within.",
    "My heart is calm, my mind is clear.",
    "I trust the flow of life.",
    "I am safe, I am serene, I am at peace.",
  ],
  energy: [
    "I am filled with boundless energy and vitality.",
    "Every cell in my body radiates vibrant life force.",
    "I channel my energy toward what matters most.",
    "I am powerful, capable, and unstoppable.",
    "My passion fuels my purpose.",
    "I wake up energized and ready to create.",
    "My body is a vessel of vibrant energy.",
    "I attract positive and uplifting energy.",
    "I am alive with enthusiasm and drive.",
    "My energy inspires and uplifts others.",
    "I move through life with strength and grace.",
    "Every breath renews my vitality.",
    "I am dynamically charged with purpose.",
    "My spirit is bold and unstoppable.",
    "I radiate confidence and power.",
  ],
  healing: [
    "My body knows how to heal itself.",
    "Every day, in every way, I am becoming healthier.",
    "I release what no longer serves me.",
    "Healing energy flows through every part of my being.",
    "I am whole, I am well, I am healed.",
    "I trust my body's natural wisdom to heal.",
    "I let go of pain and welcome restoration.",
    "Every cell in my body is renewing itself.",
    "I am worthy of complete healing and wellness.",
    "I embrace the healing journey with patience.",
    "My mind and body are in perfect harmony.",
    "I forgive myself and release all burdens.",
    "Healing light surrounds and restores me.",
    "I am grateful for my body's resilience.",
    "I am becoming stronger and healthier every day.",
  ],
  focus: [
    "My mind is clear, sharp, and focused.",
    "I direct my attention with intention and ease.",
    "Distractions fall away as I center my awareness.",
    "I am fully present in this moment.",
    "Clarity is my superpower.",
    "I move through tasks with calm precision.",
    "My concentration is unwavering and strong.",
    "I prioritize what truly matters.",
    "I am in control of my thoughts and actions.",
    "My focus creates powerful results.",
    "I see clearly and act decisively.",
    "I am fully engaged in what I am doing.",
    "My attention is a gift I give intentionally.",
    "I am grounded in the here and now.",
    "I accomplish my goals with ease and focus.",
  ],
};

const toneSettings = {
  peace: { color: "from-blue-400/20 to-purple-400/20", label: "Peace", fullBg: "hsl(270, 40%, 90%)" },
  energy: { color: "from-orange-400/20 to-yellow-400/20", label: "Energy", fullBg: "hsl(35, 60%, 85%)" },
  healing: { color: "from-green-400/20 to-emerald-400/20", label: "Healing", fullBg: "hsl(140, 30%, 88%)" },
  focus: { color: "from-indigo-400/20 to-cyan-400/20", label: "Focus", fullBg: "hsl(210, 50%, 90%)" },
};

const Affirmations = () => {
  const [selectedTone, setSelectedTone] = useState<Tone | null>(null);
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [visualizing, setVisualizing] = useState(false);
  const [showPills, setShowPills] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPills(true), 600);
    const savedTone = localStorage.getItem("affirmationTone") as Tone;
    if (savedTone && affirmations[savedTone]) {
      setSelectedTone(savedTone);
      generateNewAffirmation(savedTone);
    }
    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss visualize after 10 seconds
  useEffect(() => {
    if (visualizing) {
      const timer = setTimeout(() => setVisualizing(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [visualizing]);

  const playGentleHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const generateNewAffirmation = (tone: Tone) => {
    setIsVisible(false);
    setTimeout(() => {
      const list = affirmations[tone];
      const randomAffirmation = list[Math.floor(Math.random() * list.length)];
      setCurrentAffirmation(randomAffirmation);
      setIsVisible(true);
      playGentleHaptic();
    }, 300);
  };

  const handleToneChange = (tone: Tone) => {
    setSelectedTone(tone);
    localStorage.setItem("affirmationTone", tone);
    generateNewAffirmation(tone);
  };

  const handleVisualize = () => {
    setVisualizing(true);
  };

  return (
    <PageLayout gradient="calm" tagline="Every word is a mirror — see what you wish to become.">
      {/* Full-screen Visualize overlay */}
      <AnimatePresence>
        {visualizing && selectedTone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center px-8"
            style={{ backgroundColor: toneSettings[selectedTone].fullBg }}
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-3xl md:text-5xl lg:text-6xl font-light text-center leading-relaxed max-w-4xl"
              style={{ fontFamily: "'Lora', serif", color: "hsl(30, 12%, 25%)" }}
            >
              {currentAffirmation}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center gap-12 w-full max-w-3xl min-h-[50vh]">
        <AnimatePresence mode="wait">
          {!selectedTone ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-10"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xl md:text-2xl font-light italic text-muted-foreground/70 text-center"
                style={{ fontFamily: "'Lora', serif" }}
              >
                What do you need to hear today?
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showPills ? 1 : 0, y: showPills ? 0 : 10 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                {(Object.keys(toneSettings) as Tone[]).map((tone) => (
                  <Button
                    key={tone}
                    onClick={() => handleToneChange(tone)}
                    variant="outline"
                    size="lg"
                    className="min-w-[110px]"
                  >
                    {toneSettings[tone].label}
                  </Button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="active-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-12 w-full"
            >
              <div className="flex flex-wrap gap-3 justify-center">
                {(Object.keys(toneSettings) as Tone[]).map((tone) => (
                  <Button
                    key={tone}
                    onClick={() => handleToneChange(tone)}
                    variant={selectedTone === tone ? "default" : "outline"}
                    size="lg"
                    className="min-w-[110px]"
                  >
                    {toneSettings[tone].label}
                  </Button>
                ))}
              </div>

              <div className="relative w-full min-h-[300px] flex items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${
                    toneSettings[selectedTone].color
                  } blur-3xl transition-all duration-1000 scale-100 opacity-50`}
                />
                <p
                  className={`relative z-10 text-2xl md:text-3xl font-light text-center px-8 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {currentAffirmation}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => generateNewAffirmation(selectedTone)}
                  variant="outline"
                  size="lg"
                >
                  New Affirmation
                </Button>
                <Button onClick={handleVisualize} size="lg">
                  Visualize
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};

export default Affirmations;
