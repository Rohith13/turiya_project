import PageLayout from "@/components/PageLayout";

const Support = () => {
  return (
    <PageLayout gradient="calm">
      <div className="w-full max-w-3xl mx-auto space-y-14 animate-fade-in">
        {/* Headline with ambient orb */}
        <div className="relative flex items-center justify-center py-8">
          {/* Warm orb — static, candle-like */}
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

        {/* Earning line — above QR cards */}
        <p
          className="text-sm md:text-base font-light italic text-center text-muted-foreground/70 px-4"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Every small gesture helps us keep Turiya ad-free, accessible, and tranquil for all.
        </p>

        {/* Chai support button */}
        <div className="flex justify-center px-4">
          <a
            href="https://razorpay.me/@revoralabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-light tracking-[0.12em] uppercase text-foreground/90 transition-all duration-500 hover:scale-[1.03]"
            style={{
              border: "1px solid rgba(212, 149, 106, 0.35)",
              background: "rgba(212, 149, 106, 0.08)",
            }}
          >
            ☕ Buy me a chai
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default Support;
