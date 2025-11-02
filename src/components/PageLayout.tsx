import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  gradient?: "calm" | "focus" | "energy" | "sacred";
  tagline?: string;
}

const PageLayout = ({ children, gradient = "calm", tagline }: PageLayoutProps) => {
  const gradientClass = `bg-gradient-${gradient}`;
  
  return (
    <div className={`min-h-screen ${gradientClass} flex flex-col items-center justify-center p-8 pt-24 animate-fade-in`}>
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl">
        {children}
      </main>
      
      {tagline && (
        <footer className="text-xs text-muted-foreground/70 text-center mt-8 font-light">
          {tagline}
        </footer>
      )}
      
      <footer className="w-full flex items-center justify-center gap-8 text-xs text-muted-foreground/60 mt-4 font-light tracking-wide px-4">
        <span className="text-center flex-1">
          Turiya Project — Digital Sanctuaries for the Modern Mind
        </span>
        <span className="text-right whitespace-nowrap">
          © 2025 Turiya Project. All rights reserved by Revora Labs.
        </span>
      </footer>
    </div>
  );
};

export default PageLayout;
