import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  gradient?: "calm" | "focus" | "energy" | "sacred";
  tagline?: string;
}

const PageLayout = ({ children, gradient = "calm", tagline }: PageLayoutProps) => {
  const gradientClass = `bg-gradient-${gradient}`;

  return (
    <div
      className={`min-h-screen ${gradientClass} flex flex-col items-center p-8 pt-28 animate-fade-in`}
    >
      <p className="text-sm md:text-base font-light tracking-wide text-muted-foreground/60 text-center mt-4 mb-12 animate-fade-in">
        Turiya — Pure Consciousness
      </p>
      
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl -mt-8">{children}</main>

      {tagline && <footer className="text-xs text-muted-foreground/70 text-center mt-8 font-light">{tagline}</footer>}

      <footer className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 md:gap-8 text-xs text-muted-foreground/60 mt-4 font-light tracking-wide px-4">
        <span className="text-center md:text-left order-2 md:order-1">
          © 2025 Turiya Project. All rights reserved by{" "}
          <a
            href="https://www.revoralabs.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Revora Labs
          </a>
          .
        </span>
        <span className="text-center md:text-right order-1 md:order-2">
          Digital Sanctuary for the Modern Mind
        </span>
      </footer>
    </div>
  );
};

export default PageLayout;
