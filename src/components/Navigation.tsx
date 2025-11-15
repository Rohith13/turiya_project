import { Link, useLocation } from "react-router-dom";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import turiyaLogo from "@/assets/turiya-logo.png";

interface NavigationProps {
  ambientEnabled: boolean;
  onAmbientToggle: () => void;
}

const Navigation = ({ ambientEnabled, onAmbientToggle }: NavigationProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const links = [
    { path: "/stillness", label: "Stillness" },
    { path: "/beads", label: "Beads" },
    { path: "/breath", label: "Breath" },
    { path: "/vision", label: "Vision" },
    { path: "/bell", label: "Bell" },
    { path: "/affirmations", label: "Self-Talk" },
    { path: "/support", label: "Support Us" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/stillness" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={turiyaLogo} alt="Turiya Project" className="h-14 md:h-16 w-auto" />
            <span className="text-lg font-light tracking-wide text-foreground">
              Turiya Project
            </span>
          </Link>
          
          {/* Desktop Navigation - Right aligned */}
          <div className="hidden md:flex items-center gap-6">
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

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onAmbientToggle}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle ambient sound"
            >
              {ambientEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-64 bg-background/95 backdrop-blur-lg border-l border-border"
              >
                <div className="flex flex-col gap-6 mt-8">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-light tracking-wide transition-all duration-300 ${
                        location.pathname === link.path
                          ? "text-primary font-normal"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
