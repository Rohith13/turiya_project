import PageLayout from "@/components/PageLayout";
import phonePeQR from "@/assets/qr-phonepe.png";
import payPalQR from "@/assets/qr-paypal.png";

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

        {/* QR Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* PhonePe */}
          <div
            className="flex flex-col items-center space-y-4 p-6 rounded-2xl"
            style={{ border: "1px solid rgba(212, 149, 106, 0.2)" }}
          >
            <img
              src={phonePeQR}
              alt="PhonePe QR Code"
              className="w-56 h-56 md:w-64 md:h-64 rounded-lg"
            />
            <p className="text-xs font-light tracking-[0.15em] uppercase text-muted-foreground/60">
              PhonePe
            </p>
          </div>

          {/* PayPal */}
          <div
            className="flex flex-col items-center space-y-4 p-6 rounded-2xl"
            style={{ border: "1px solid rgba(212, 149, 106, 0.2)" }}
          >
            <img
              src={payPalQR}
              alt="PayPal QR Code"
              className="w-56 h-56 md:w-64 md:h-64 rounded-lg"
            />
            <p className="text-xs font-light tracking-[0.15em] uppercase text-muted-foreground/60">
              PayPal
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Support;
