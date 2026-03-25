import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePricing } from "@/hooks/use-pricing";
import { Check, Zap, Film } from "lucide-react";
import { motion } from "framer-motion";
import { DynamicBackground } from "@/components/DynamicBackground";
import type { PricingPackage } from "@shared/schema";

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
  const { data: packages, isLoading } = usePricing();

  const reelPackages = packages?.filter(p => p.category === 'reel') || [];
  const fullPackages = packages?.filter(p => p.category === 'full-length') || [];

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
            ✦ Pricing
          </motion.span>
          <motion.h1 
            className="mb-6 text-5xl font-serif font-black text-foreground glow-text sm:text-6xl md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Professional Rates
          </motion.h1>
          <motion.p 
            className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Transparent, competitive pricing for professional video editing. Choose the package that matches your creative needs and budget.
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
             {isLoading ? <LoadingCards count={2} /> : reelPackages.length > 0 ? (
               reelPackages.map((pkg, i) => <PricingCard key={pkg.id} pkg={pkg} delay={i} />)
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
             {isLoading ? <LoadingCards count={2} /> : fullPackages.length > 0 ? (
               fullPackages.map((pkg, i) => <PricingCard key={pkg.id} pkg={pkg} delay={i} />)
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
              Every project is unique. Let's discuss your specific creative vision and build a custom package tailored to your needs.
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
                <span className="relative">GET A QUOTE</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PricingCard({ pkg, delay }: { pkg: PricingPackage; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.15, duration: 0.5 }}
      whileHover={{ y: -16, transition: { duration: 0.3 } }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 p-6 transition-all sm:p-8 lg:p-10 ${
        pkg.isPopular 
          ? "bg-gradient-to-r from-primary/25 dark:from-primary/35 to-transparent border-primary shadow-xl dark:shadow-[0_0_40px_rgba(255,127,0,0.3)]" 
          : "bg-gradient-to-r from-card/90 to-background border-foreground/10 hover:border-primary/40"
      }`}
      data-testid={`card-pricing-${pkg.id}`}
    >
      {/* Animated background glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 group-hover:opacity-10 rounded-2xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {pkg.isPopular && (
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-orange-600 px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white shadow-lg sm:px-6 sm:text-xs"
        >
          ⭐ MOST POPULAR
        </motion.div>
      )}

      <motion.h3 
        className="relative z-10 mb-4 text-2xl font-serif font-black text-foreground sm:text-3xl"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.15 + 0.1 }}
      >
        {pkg.name}
      </motion.h3>

      <motion.div 
        className="mb-6 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.15 + 0.15 }}
      >
        <motion.span 
          className="text-5xl font-serif font-black text-gradient sm:text-6xl"
          whileInView={{ scale: [0.95, 1.05, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay * 0.15 + 0.2 }}
        >
          {pkg.price}
        </motion.span>
        <motion.span 
          className="text-muted-foreground text-base ml-3 font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay * 0.15 + 0.25 }}
        >
          / project
        </motion.span>
      </motion.div>

      <motion.p 
        className="relative z-10 mb-8 flex-grow text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.15 + 0.2 }}
      >
        {pkg.description}
      </motion.p>

      <motion.ul 
        className="space-y-4 mb-10 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {pkg.features?.map((feature, i) => (
          <motion.li 
            key={i} 
            className="flex items-start gap-3 text-sm text-foreground font-medium"
            variants={itemVariants}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: i * 0.1, duration: 0.4, repeat: Infinity, repeatDelay: 2 }}
            >
              <Check size={20} className="text-primary mt-0.5 shrink-0 font-bold" />
            </motion.div>
            <span>{feature}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.button 
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay * 0.15 + 0.3 }}
        className={`w-full py-4 rounded-xl font-black text-base tracking-wider transition-all relative overflow-hidden group/btn z-10 ${
          pkg.isPopular 
            ? "bg-gradient-to-r from-primary to-orange-600 text-white hover:shadow-lg dark:shadow-[0_0_20px_rgba(255,127,0,0.3)]" 
            : "bg-foreground/10 text-foreground hover:bg-foreground/20 border border-foreground/20"
        }`}
        data-testid={`button-choose-${pkg.id}`}
      >
        <motion.div 
          className="absolute inset-0 bg-white/20"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.4 }}
        />
        <span className="relative">CHOOSE PLAN</span>
      </motion.button>
    </motion.div>
  );
}

function LoadingCards({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <motion.div 
          key={i} 
          className="h-96 bg-gradient-to-br from-card/50 to-background rounded-2xl border-2 border-foreground/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <motion.div 
            className="absolute inset-0 film-strip opacity-10"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ["−100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      ))}
    </>
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
        Pricing packages coming soon
      </motion.p>
    </motion.div>
  );
}
