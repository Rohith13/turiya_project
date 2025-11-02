import { Link, useLocation } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  ambientEnabled: boolean;
  onAmbientToggle: () => void;
}

const Navigation = ({ ambientEnabled, onAmbientToggle }: NavigationProps) => {
  const location = useLocation();
  
  const links = [
    { path: "/stillness", label: "Stillness" },
    { path: "/beads", label: "Beads" },
    { path: "/breath", label: "Breath" },
    { path: "/bell", label: "Bell" },
    { path: "/affirmations", label: "Affirmations" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/stillness" 
            className="text-base md:text-lg font-light tracking-wide text-foreground hover:text-primary transition-colors"
          >
            Turiya Project
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onAmbientToggle}
            className="text-muted-foreground hover:text-foreground transition-colors md:hidden"
            aria-label="Toggle ambient sound"
          >
            {ambientEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-3 md:mt-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="flex items-center gap-3 md:gap-6 overflow-x-auto w-full md:w-auto">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs md:text-sm font-light tracking-wide transition-all duration-300 whitespace-nowrap ${
                  location.pathname === link.path
                    ? "text-primary font-normal"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onAmbientToggle}
            className="text-muted-foreground hover:text-foreground transition-colors hidden md:flex ml-6"
            aria-label="Toggle ambient sound"
          >
            {ambientEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
