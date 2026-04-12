import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";

const Support = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://chaaiya.lovable.app/widget.js";
    script.setAttribute("data-username", "rohith");
    script.setAttribute("data-color", "#E85D26");
    script.setAttribute("data-position", "right");
    script.setAttribute("data-label", "☕ Buy me a chai");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <PageLayout gradient="calm">
      <div className="w-full max-w-3xl mx-auto space-y-14 animate-fade-in">
        {/* Headline with ambient orb */}
        <div className="relative flex items-center justify-center py-8">
          <div
            className="absolute w-56 h-56 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,149,106,0.3) 0%, rgba(212,149,106,0.08) 50%, transparent 80%)",
              filter: "blur(40px)",
            }}
          />
          <h1
            className="relative z-10 text-3xl md:text-4xl font-light text-center tracking-wide"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Support the Calm
          </h1>
        </div>

        {/* Philosophy — consolidated */}
        <div className="space-y-5 text-center px-4 max-w-2xl mx-auto">
          <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80">
            The Turiya Project was created as a free mindfulness companion, a quiet digital space amidst today's noise.
            Always free. No subscriptions. No ads.
          </p>

          <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80">
            If Turiya has brought peace or clarity to you or your loved ones, we welcome your kind gesture through a small Gratitude Contribution.
          </p>
        </div>

        {/* Earning line */}
        <p
          className="text-sm md:text-base font-light italic text-center text-muted-foreground/70 px-4"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Every small gesture helps us keep Turiya ad-free, accessible, and tranquil for all.
        </p>
      </div>
    </PageLayout>
  );
};

export default Support;
