import PageLayout from "@/components/PageLayout";
import phonePeQR from "@/assets/qr-phonepe.png";
import payPalQR from "@/assets/qr-paypal.png";

const Support = () => {
  return (
    <PageLayout gradient="calm">
      <div className="w-full max-w-3xl mx-auto space-y-12 animate-fade-in">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-light text-center tracking-wide">
          Support the Calm
        </h1>

        {/* Introduction Text */}
        <div className="space-y-6 text-center px-4">
          <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80">
            The Turiya Project was created as a free mindfulness companion, a quiet digital space amidst today's noise.
          </p>
          
          <p className="text-base md:text-lg font-semibold tracking-wide text-foreground/90">
            Always free. No subscriptions. No ads.
          </p>
          
          <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80">
            Sustained by generous individuals and organizations who believe in the power of collective calm.
          </p>
          
          <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80">
            If Turiya has brought peace or clarity to you or your loved ones, we welcome your kind gesture through a small Gratitude Contribution.
          </p>
          
          <p className="text-base md:text-lg font-light leading-relaxed text-foreground/80">
            Your support helps us nurture this digital sanctuary and keep it open for everyone, everywhere.
          </p>
        </div>

        {/* Ways to Contribute Section */}
        <div className="space-y-8 pt-8">
          <h2 className="text-2xl md:text-3xl font-light text-center tracking-wide">
            Ways to Contribute
          </h2>
          
          <p className="text-sm md:text-base font-light leading-relaxed text-center text-muted-foreground/80 px-4">
            Your presence here already supports the calm we wish to share. If you'd like to extend that intention, you may offer a Gratitude Contribution through the options below.
          </p>

          {/* QR Codes Container */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 pt-4">
            <div className="flex flex-col items-center space-y-3 animate-fade-in">
              <img 
                src={phonePeQR} 
                alt="PhonePe QR Code" 
                className="w-64 h-64 md:w-72 md:h-72 rounded-lg shadow-lg"
              />
              <p className="text-sm font-light text-muted-foreground/70">PhonePe</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3 animate-fade-in">
              <img 
                src={payPalQR} 
                alt="PayPal QR Code" 
                className="w-64 h-64 md:w-72 md:h-72 rounded-lg shadow-lg"
              />
              <p className="text-sm font-light text-muted-foreground/70">PayPal</p>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-xs md:text-sm font-light italic text-center text-muted-foreground/70 pt-8 px-4">
            Every small gesture helps us keep Turiya ad-free, accessible, and tranquil for all. Thank You
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Support;
