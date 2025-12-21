import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import rectLogo from "@assets/cine_1766355441350.jpg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative overflow-hidden rounded-sm border border-white/10 group-hover:border-primary/50 transition-colors">
              <img 
                src={rectLogo} 
                alt="Cinemora Logo" 
                className="h-10 w-auto object-contain"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white hidden sm:block">
              CINEMORA <span className="text-primary">STUDIO</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span 
                className={`cursor-pointer font-medium text-sm tracking-wide transition-colors duration-200 hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label.toUpperCase()}
              </span>
            </Link>
          ))}
          <Link href="/contact">
            <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold tracking-wider rounded transition-all hover:shadow-[0_0_20px_rgba(109,40,217,0.5)]">
              GET A QUOTE
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className={`block py-2 text-lg font-display font-bold cursor-pointer ${
                      location === link.href ? "text-primary" : "text-white"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label.toUpperCase()}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
