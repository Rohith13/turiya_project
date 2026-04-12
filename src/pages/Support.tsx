import PageLayout from "@/components/PageLayout";

const CHAAIYA_URL = "https://chaaiya.lovable.app/rohith";

const Support = () => {
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

        {/* Chaaiya CTA */}
        <div className="flex justify-center pb-8">
          <a
            href={CHAAIYA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-light tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, rgba(212,149,106,0.15) 0%, rgba(212,149,106,0.08) 100%)",
              border: "1px solid rgba(212, 149, 106, 0.25)",
              color: "#5C4A32",
              fontFamily: "'Lora', serif",
            }}
          >
            <span className="text-xl">☕</span>
            Buy me a chai
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default Support;
