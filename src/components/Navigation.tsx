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
    { path: "/geometry", label: "Geometry" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          to="/stillness" 
          className="text-lg font-light tracking-wide text-foreground hover:text-primary transition-colors"
        >
          The Stillpoint Project
        </Link>
        
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-light tracking-wide transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-primary font-normal"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onAmbientToggle}
            className="text-muted-foreground hover:text-foreground transition-colors"
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
