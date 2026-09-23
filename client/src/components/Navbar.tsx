import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
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
      className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300 sm:px-5 ${
        scrolled ? "py-3" : "py-4 sm:py-5"
      }`}
    >
      <div className="ios-glass container mx-auto flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 sm:rounded-[1.35rem] md:px-5">
        <Link href="/">
          <div className="group flex min-w-0 items-center gap-3 cursor-pointer">
            <div className="relative overflow-hidden rounded-xl border border-foreground/15 transition-colors group-hover:border-primary/50">
              <img 
                src={rectLogo} 
                alt="Cinemora Logo" 
                className="h-10 w-auto object-contain"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="hidden truncate font-display text-lg font-bold tracking-wider text-foreground sm:block">
              CINEMORA <span className="text-primary">STUDIO</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span 
                className={`cursor-pointer rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                  location === link.href ? "bg-primary/15 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]" : "text-muted-foreground"
                }`}
              >
                {link.label.toUpperCase()}
              </span>
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-2 border-l border-foreground/10 pl-3">
            <ThemeToggle />
            <Link href="/contact">
              <button className="rounded-full bg-gradient-to-b from-orange-400 to-primary px-5 py-2.5 text-sm font-black tracking-wide text-white shadow-[0_8px_20px_rgba(255,127,0,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(255,127,0,0.42)] active:translate-y-0">
                GET IN TOUCH
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button 
            className="rounded-xl border border-foreground/10 bg-foreground/5 p-2 text-foreground transition-colors hover:bg-primary/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-menu-toggle"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ios-glass mx-auto mt-2 max-w-[calc(100%-0.5rem)] overflow-hidden rounded-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className={`block cursor-pointer rounded-xl px-4 py-3 text-base font-display font-bold transition-colors ${
                      location === link.href ? "bg-primary/15 text-primary" : "text-foreground hover:bg-foreground/5"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label.toUpperCase()}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <button
                  className="mt-2 rounded-xl bg-gradient-to-r from-primary to-orange-500 px-4 py-3.5 text-sm font-black tracking-wider text-white shadow-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  GET IN TOUCH
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
