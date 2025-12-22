import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePricing } from "@/hooks/use-pricing";
import { Check, Zap, Film } from "lucide-react";
import { motion } from "framer-motion";
import { DynamicBackground } from "@/components/DynamicBackground";
import type { PricingPackage } from "@shared/schema";

export default function Services() {
  const { data: packages, isLoading } = usePricing();

  const reelPackages = packages?.filter(p => p.category === 'reel') || [];
  const fullPackages = packages?.filter(p => p.category === 'full-length') || [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Header */}
      <section className="relative pt-40 pb-24 container mx-auto px-4 md:px-6 text-center overflow-hidden">
        <DynamicBackground />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <motion.span 
            className="text-primary font-mono text-sm tracking-widest uppercase block mb-6 font-bold"
            whileInView={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ Pricing
          </motion.span>
          <h1 className="text-7xl md:text-8xl font-serif font-black text-foreground mb-8 glow-text">
            Professional Rates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transparent, competitive pricing for professional video editing. Choose the package that matches your creative needs and budget.
          </p>
        </motion.div>
      </section>

      {/* Reels Section */}
      <section className="relative py-32 border-y border-foreground/10 bg-gradient-to-b from-card/30 to-background overflow-hidden">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16"
          >
            <div className="p-5 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl text-primary">
              <Zap size={36} />
            </div>
            <div className="text-left">
              <h2 className="text-5xl font-serif font-black text-foreground">Reels & Shorts</h2>
              <p className="text-muted-foreground mt-2 text-lg">Fast-paced editing for TikTok, Instagram Reels, and YouTube Shorts (under 60 seconds)</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {isLoading ? <LoadingCards count={2} /> : reelPackages.length > 0 ? (
               reelPackages.map((pkg, i) => <PricingCard key={pkg.id} pkg={pkg} delay={i} />)
             ) : <EmptyState />}
          </div>
        </div>
      </section>

      {/* Full Length Section */}
      <section className="relative py-32 bg-background overflow-hidden">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16"
          >
            <div className="p-5 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-2xl text-secondary">
              <Film size={36} />
            </div>
            <div className="text-left">
              <h2 className="text-5xl font-serif font-black text-foreground">Full Length</h2>
              <p className="text-muted-foreground mt-2 text-lg">Professional storytelling for YouTube, documentaries, commercials, and branded content</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {isLoading ? <LoadingCards count={2} /> : fullPackages.length > 0 ? (
               fullPackages.map((pkg, i) => <PricingCard key={pkg.id} pkg={pkg} delay={i} />)
             ) : <EmptyState />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 bg-gradient-to-r from-card via-background to-card overflow-hidden">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-serif font-black text-foreground mb-8 glow-text">Need Something Custom?</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Every project is unique. Let's discuss your specific creative vision and build a custom package tailored to your needs.
            </p>
            <motion.a 
              href="/contact"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-5 bg-gradient-to-r from-accent to-orange-500 dark:to-orange-400 text-white font-black text-lg rounded-xl hover:shadow-xl transition-all tracking-wider"
            >
              GET A QUOTE
            </motion.a>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 }}
      whileHover={{ y: -12 }}
      className={`relative p-10 rounded-2xl border-2 flex flex-col h-full transition-all ${
        pkg.isPopular 
          ? "bg-gradient-to-br from-primary/20 dark:from-primary/30 to-primary/5 dark:to-primary/10 border-primary shadow-xl dark:shadow-[0_0_40px_rgba(255,127,0,0.3)]" 
          : "bg-gradient-to-br from-card to-card/80 border-foreground/10 hover:border-primary/40"
      }`}
      data-testid={`card-pricing-${pkg.id}`}
    >
      {pkg.isPopular && (
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-orange-600 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-wider shadow-lg"
        >
          ⭐ MOST POPULAR
        </motion.div>
      )}

      <h3 className="text-3xl font-serif font-black text-foreground mb-4">{pkg.name}</h3>
      <div className="mb-6">
        <span className="text-6xl font-serif font-black text-gradient">{pkg.price}</span>
        <span className="text-muted-foreground text-base ml-3 font-semibold">/ project</span>
      </div>
      <p className="text-muted-foreground mb-10 leading-relaxed flex-grow text-lg">
        {pkg.description}
      </p>

      <ul className="space-y-4 mb-10">
        {pkg.features?.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-foreground font-medium">
            <Check size={20} className="text-primary mt-0.5 shrink-0 font-bold" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button 
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-4 rounded-xl font-black text-base tracking-wider transition-all ${
          pkg.isPopular 
            ? "bg-gradient-to-r from-primary to-orange-600 text-white hover:shadow-lg dark:shadow-[0_0_20px_rgba(255,127,0,0.3)]" 
            : "bg-foreground/10 text-foreground hover:bg-foreground/20 border border-foreground/20"
        }`}
        data-testid={`button-choose-${pkg.id}`}
      >
        CHOOSE PLAN
      </motion.button>
    </motion.div>
  );
}

function LoadingCards({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="h-96 bg-gradient-to-br from-card/50 to-background rounded-2xl animate-pulse border-2 border-foreground/10 relative overflow-hidden">
          <div className="absolute inset-0 film-strip opacity-10" />
        </div>
      ))}
    </>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full py-20 text-center text-muted-foreground border-2 border-dashed border-foreground/20 rounded-2xl">
      <p className="text-xl font-serif font-black">Pricing packages coming soon</p>
    </div>
  );
}
