import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import * as Tone from "tone";

type Tone = "peace" | "energy" | "healing" | "focus";

const affirmations = {
  peace: [
    "I am at peace with myself and the world around me.",
    "Calmness flows through me with every breath.",
    "I release all tension and embrace serenity.",
    "Peace is my natural state of being.",
    "I am grounded, centered, and at ease.",
  ],
  energy: [
    "I am filled with boundless energy and vitality.",
    "Every cell in my body radiates vibrant life force.",
    "I channel my energy toward what matters most.",
    "I am powerful, capable, and unstoppable.",
    "My passion fuels my purpose.",
  ],
  healing: [
    "My body knows how to heal itself.",
    "Every day, in every way, I am becoming healthier.",
    "I release what no longer serves me.",
    "Healing energy flows through every part of my being.",
    "I am whole, I am well, I am healed.",
  ],
  focus: [
    "My mind is clear, sharp, and focused.",
    "I direct my attention with intention and ease.",
    "Distractions fall away as I center my awareness.",
    "I am fully present in this moment.",
    "Clarity is my superpower.",
  ],
};

const toneSettings = {
  peace: { color: "from-blue-400/20 to-purple-400/20", label: "Peace" },
  energy: { color: "from-orange-400/20 to-yellow-400/20", label: "Energy" },
  healing: { color: "from-green-400/20 to-emerald-400/20", label: "Healing" },
  focus: { color: "from-indigo-400/20 to-cyan-400/20", label: "Focus" },
};

const Affirmations = () => {
  const [selectedTone, setSelectedTone] = useState<Tone>("peace");
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [visualizing, setVisualizing] = useState(false);

  useEffect(() => {
    const savedTone = localStorage.getItem("affirmationTone") as Tone;
    if (savedTone && affirmations[savedTone]) {
      setSelectedTone(savedTone);
    }
    generateNewAffirmation(savedTone || "peace");
  }, []);

  const playGentleHaptic = () => {
    // Gentle haptic feedback - soft, brief vibration
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // 50ms gentle pulse
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
    setTimeout(() => setVisualizing(false), 3000);
  };

  return (
    <PageLayout gradient="calm" tagline="Every word is a mirror — see what you wish to become.">
      <div className="flex flex-col items-center justify-center gap-12 w-full max-w-3xl">
        {/* Tone selector */}
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

        {/* Affirmation display */}
        <div className="relative w-full min-h-[300px] flex items-center justify-center">
          {/* Background glow */}
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${
              toneSettings[selectedTone].color
            } blur-3xl transition-all duration-1000 ${
              visualizing ? "scale-150 opacity-100" : "scale-100 opacity-50"
            }`}
          />

          {/* Orb animations when visualizing */}
          {visualizing && (
            <>
              <div className="absolute w-32 h-32 rounded-full bg-primary/30 animate-ping" />
              <div
                className="absolute w-48 h-48 rounded-full bg-primary/20 animate-pulse"
                style={{ animationDuration: "2s" }}
              />
              <div
                className="absolute w-64 h-64 rounded-full bg-primary/10 animate-pulse"
                style={{ animationDuration: "3s" }}
              />
            </>
          )}

          {/* Affirmation text */}
          <p
            className={`relative z-10 text-2xl md:text-3xl font-light text-center px-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "'Lora', serif" }}
          >
            {currentAffirmation}
          </p>
        </div>

        {/* Controls */}
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
      </div>
    </PageLayout>
  );
};

export default Affirmations;
