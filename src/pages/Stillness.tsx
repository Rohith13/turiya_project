import { useEffect, useState } from "react";
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

const Stillness = () => {
  const [koan, setKoan] = useState("");

  useEffect(() => {
    // Select random koan on mount
    const randomKoan = koans[Math.floor(Math.random() * koans.length)];
    setKoan(randomKoan);
  }, []);

  return (
    <PageLayout gradient="sacred" tagline="Pause for a moment — the app forgets, so you can too.">
      <div className="flex flex-col items-center justify-center gap-12 animate-fade-in">
        {/* Breathing circle animation */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-breathe" />
          <div className="absolute inset-8 rounded-full bg-primary/30 animate-breathe" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-16 rounded-full bg-primary/40 animate-breathe" style={{ animationDelay: "2s" }} />
        </div>

        {/* Koan text */}
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-light text-foreground/90 leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
            {koan}
          </h1>
          <p className="text-sm text-muted-foreground/70 font-light tracking-wide">
            Breathe. Reflect. Release.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Stillness;
