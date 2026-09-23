import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowUpRight, Check, Clapperboard, Film, Play, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { DynamicBackground } from "@/components/DynamicBackground";
import { serviceData } from "@shared/data";
import type { ServicePackage } from "@shared/schema";

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

const iconSpinVariants = {
  rotate: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
    },
  }),
};

export default function Services() {
  const reelServices = serviceData.filter((service) => service.category === "reel");
  const fullServices = serviceData.filter((service) => service.category === "full-length");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Header */}
      <section className="container relative mx-auto overflow-hidden px-4 pb-20 pt-28 text-center md:px-6 sm:pb-24 sm:pt-40">
        <DynamicBackground />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <motion.span 
            className="text-primary font-mono text-sm tracking-widest uppercase block mb-6 font-bold"
            animate={{ x: [0, 5, 0], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ✦ Services
          </motion.span>
          <motion.h1 
            className="mb-6 text-5xl font-serif font-black text-foreground glow-text sm:text-6xl md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Professional Editing
          </motion.h1>
          <motion.p 
            className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Purposeful editing for social content, long-form stories, and standout brand films.
          </motion.p>
        </motion.div>
      </section>

      {/* Reels Section */}
      <section className="relative overflow-hidden border-y border-foreground/10 bg-gradient-to-b from-card/30 to-background py-20 sm:py-24 lg:py-32">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col items-start gap-4 sm:mb-16 sm:flex-row sm:items-center sm:gap-6"
          >
            <motion.div 
              className="p-5 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl text-primary"
              variants={iconSpinVariants}
              animate="rotate"
              whileHover={pulseVariants.pulse}
            >
              <Zap size={36} />
            </motion.div>
            <div className="text-left">
              <motion.h2 
                className="text-4xl font-serif font-black text-foreground sm:text-5xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Reels & Shorts
              </motion.h2>
              <motion.p 
                className="mt-2 text-base text-muted-foreground sm:text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Fast-paced editing for TikTok, Instagram Reels, and YouTube Shorts (under 60 seconds)
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
             {reelServices.length > 0 ? (
               reelServices.map((service, i) => <ServiceCard key={service.id} service={service} delay={i} />)
             ) : <EmptyState />}
          </motion.div>
        </div>
      </section>

      {/* Full Length Section */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col items-start gap-4 sm:mb-16 sm:flex-row sm:items-center sm:gap-6"
          >
            <motion.div 
              className="p-5 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-2xl text-secondary"
              variants={iconSpinVariants}
              animate="rotate"
              whileHover={pulseVariants.pulse}
            >
              <Film size={36} />
            </motion.div>
            <div className="text-left">
              <motion.h2 
                className="text-4xl font-serif font-black text-foreground sm:text-5xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Full Length
              </motion.h2>
              <motion.p 
                className="mt-2 text-base text-muted-foreground sm:text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Professional storytelling for YouTube, documentaries, commercials, and branded content
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
             {fullServices.length > 0 ? (
               fullServices.map((service, i) => <ServiceCard key={service.id} service={service} delay={i} />)
             ) : <EmptyState />}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-card via-background to-card py-20 sm:py-24 lg:py-32">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="mb-6 text-4xl font-serif font-black text-foreground glow-text sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Need Something Custom?
            </motion.h2>
            <motion.p 
              className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:mb-12 sm:text-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Every story is unique. Let's discuss your creative vision and shape an edit that fits it.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.a 
                href="/contact"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-block overflow-hidden rounded-xl bg-gradient-to-r from-primary to-orange-500 px-8 py-4 text-base font-black tracking-wider text-white transition-all hover:shadow-xl dark:to-orange-400 sm:px-12 sm:py-5 sm:text-lg"
              >
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative">START A CONVERSATION</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ServiceCard({ service, delay }: { service: ServicePackage; delay: number }) {
  const isReel = service.category === "reel";
  const ServiceIcon = isReel ? (service.id % 2 ? Play : Sparkles) : Clapperboard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.15, duration: 0.5 }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-[linear-gradient(145deg,hsl(var(--card))_0%,hsl(var(--card))_45%,hsl(var(--background))_100%)] p-1 shadow-[0_24px_70px_rgba(0,0,0,0.12)] transition-shadow hover:border-primary/60 hover:shadow-[0_28px_80px_rgba(255,127,0,0.2)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:rounded-[2rem]"
      data-testid={`card-service-${service.id}`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.55rem] bg-card/70 p-6 sm:rounded-[1.8rem] sm:p-8 lg:p-9">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="absolute -bottom-32 -left-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
        </div>

        <div className="relative z-10 mb-8 flex items-start justify-between">
          <motion.div
            className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
            whileHover={{ rotate: isReel ? 12 : -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          >
            <ServiceIcon size={26} strokeWidth={1.7} />
          </motion.div>
          <div className="flex gap-1.5 pt-2" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className={`h-1.5 w-1.5 rounded-full ${dot === 2 ? "bg-primary" : "bg-foreground/15"}`} />
            ))}
          </div>
        </div>

        <motion.h3
          className="relative z-10 mb-4 max-w-[15ch] font-serif text-3xl font-black leading-[1.05] text-foreground sm:text-4xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay * 0.15 + 0.1 }}
        >
          {service.name}
        </motion.h3>

        <motion.p
          className="relative z-10 mb-8 min-h-[4.5rem] max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay * 0.15 + 0.2 }}
        >
          {service.description}
        </motion.p>

        <motion.ul
          className="relative z-10 mb-9 grid gap-3 border-y border-foreground/10 py-5 sm:mb-10 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {service.features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-center gap-2.5 text-sm font-medium text-foreground"
              variants={itemVariants}
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                <Check size={13} strokeWidth={3} />
              </span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.a
          href="/contact"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay * 0.15 + 0.3 }}
          className="relative z-10 mt-auto flex w-full items-center justify-between overflow-hidden rounded-xl border border-primary/50 bg-primary px-5 py-4 text-sm font-black tracking-[0.16em] text-primary-foreground shadow-[0_12px_30px_rgba(255,127,0,0.2)] transition-colors hover:bg-orange-600"
          data-testid={`button-contact-${service.id}`}
        >
          <span>GET IN TOUCH</span>
          <ArrowUpRight size={19} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.a>
        <div className="relative z-10 mt-5 flex gap-1" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} className={`h-1 flex-1 rounded-full ${index % 3 === 0 ? "bg-primary/70" : "bg-foreground/10"}`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div 
      className="col-span-full py-20 text-center text-muted-foreground border-2 border-dashed border-foreground/20 rounded-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.p 
        className="text-xl font-serif font-black"
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Services coming soon
      </motion.p>
    </motion.div>
  );
}
