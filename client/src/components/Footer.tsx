import { Link } from "wouter";
import { Instagram, Youtube, Mail, Film, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import circLogo from "@assets/Picsart_25-10-04_22-03-18-563_1766355441351.png";

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative bg-card border-t border-foreground/10 py-8 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 dark:opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 dark:opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={circLogo} alt="Logo" className="w-10 h-10 opacity-80" />
              </motion.div>
              <span className="font-display font-bold text-xl tracking-wider bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                CINEMORA
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium video editing services tailored for creators and brands. 
              We turn raw footage into cinematic masterpieces.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-foreground font-display font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
              NAVIGATION
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/">
                  <motion.span 
                    className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    Home
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link href="/work">
                  <motion.span 
                    className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    Portfolio
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <motion.span 
                    className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    Services
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <motion.span 
                    className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    Contact
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.span>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-foreground font-display font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-secondary to-primary rounded-full"></span>
              SERVICES
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <motion.li whileHover={{ x: 5 }} className="transition-colors hover:text-primary cursor-pointer">Reels & Shorts</motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-colors hover:text-primary cursor-pointer">Commercial Editing</motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-colors hover:text-primary cursor-pointer">Color Grading</motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-colors hover:text-primary cursor-pointer">Motion Graphics</motion.li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-foreground font-display font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
              CONNECT
            </h4>
            <div className="flex gap-4">
              <motion.a 
                href="https://www.instagram.com/cinemora_studio_?igsh=MXdkbXJxZ3Z6a2k1bA==" 
                className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all text-muted-foreground"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all text-muted-foreground"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Youtube size={18} />
              </motion.a>
              <motion.a 
                href="https://mail.google.com/mail/u/0/#drafts?compose=DmwnWrRtsncVfNNBqQbwPvPlqSqbfgTSZBVplRlhVShdCPtWGQkLszpftnSpTgTFWVMvVmmPNtzL" 
                className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-secondary hover:text-black flex items-center justify-center transition-all text-muted-foreground"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} Cinemora Studio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <motion.span 
              className="hover:text-primary cursor-pointer transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.span>
            <motion.span 
              className="hover:text-primary cursor-pointer transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
