import { Link } from "wouter";
import { Instagram, Youtube, Mail, Film } from "lucide-react";
import circLogo from "@assets/Picsart_25-10-04_22-03-18-563_1766355441351.png";

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={circLogo} alt="Logo" className="w-10 h-10 opacity-80" />
              <span className="font-display font-bold text-xl tracking-wider text-white">
                CINEMORA
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium video editing services tailored for creators and brands. 
              We turn raw footage into cinematic masterpieces.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-6">NAVIGATION</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/"><span className="hover:text-primary cursor-pointer transition-colors">Home</span></Link></li>
              <li><Link href="/work"><span className="hover:text-primary cursor-pointer transition-colors">Portfolio</span></Link></li>
              <li><Link href="/services"><span className="hover:text-primary cursor-pointer transition-colors">Services</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-primary cursor-pointer transition-colors">Contact</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-6">SERVICES</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Reels & Shorts</li>
              <li>Commercial Editing</li>
              <li>Color Grading</li>
              <li>Motion Graphics</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-6">CONNECT</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/cinemora_studio_?igsh=MXdkbXJxZ3Z6a2k1bA==" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all text-muted-foreground">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all text-muted-foreground">
                <Youtube size={18} />
              </a>
              <a href="https://mail.google.com/mail/u/0/#drafts?compose=DmwnWrRmVpXRqVzkWWfPSpHjglVNNTrjZVbRchzMzTHRBWJlgfnkKlcFsZgMqPdbTldMbfffwmtL" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary hover:text-black flex items-center justify-center transition-all text-muted-foreground">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Cinemora Studio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
