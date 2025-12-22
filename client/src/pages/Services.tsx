import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePricing } from "@/hooks/use-pricing";
import { Check, Zap, Film, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { PricingPackage } from "@shared/schema";

export default function Services() {
  const { data: packages, isLoading } = usePricing();

  const reelPackages = packages?.filter(p => p.category === 'reel') || [];
  const fullPackages = packages?.filter(p => p.category === 'full-length') || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-24 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase block mb-4">Pricing</span>
          <h1 className="text-6xl md:text-7xl font-display font-black text-foreground mb-8">
            Professional Rates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transparent pricing for professional video editing. Choose the package that fits your content strategy and budget.
          </p>
        </motion.div>
      </section>

      {/* Reels Section */}
      <section className="py-24 border-y border-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="p-4 bg-primary/20 dark:bg-primary/30 rounded-xl text-primary">
              <Zap size={32} />
            </div>
            <div className="text-left">
              <h2 className="text-4xl font-display font-bold text-foreground">Reels & Shorts</h2>
              <p className="text-muted-foreground mt-1">For TikTok, Instagram Reels, and YouTube Shorts (Under 60s)</p>
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
      <section className="py-24 bg-card/50 border-b border-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="p-4 bg-secondary/20 dark:bg-secondary/30 rounded-xl text-secondary">
              <Film size={32} />
            </div>
            <div className="text-left">
              <h2 className="text-4xl font-display font-bold text-foreground">Full Length</h2>
              <p className="text-muted-foreground mt-1">For YouTube, Documentaries, Commercials, and More</p>
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
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-display font-black text-foreground mb-6">Need Something Custom?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Every project is unique. Let's discuss your specific needs and create a custom package that works for you.
            </p>
            <a href="/contact" className="inline-block px-10 py-4 bg-primary text-white font-bold rounded hover:shadow-lg transition-all">
              GET A CUSTOM QUOTE
            </a>
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
      whileHover={{ y: -8 }}
      className={`relative p-8 md:p-10 rounded-2xl border-2 flex flex-col h-full transition-all ${
        pkg.isPopular 
          ? "bg-primary/10 dark:bg-primary/20 border-primary shadow-lg dark:shadow-[0_0_40px_rgba(109,40,217,0.2)]" 
          : "bg-card border-foreground/10 hover:border-primary/30"
      }`}
      data-testid={`card-pricing-${pkg.id}`}
    >
      {pkg.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          ⭐ Most Popular
        </div>
      )}

      <h3 className="text-2xl font-display font-bold text-foreground mb-3">{pkg.name}</h3>
      <div className="mb-6">
        <span className="text-5xl font-display font-black text-primary">{pkg.price}</span>
        <span className="text-muted-foreground text-sm ml-2">/ project</span>
      </div>
      <p className="text-muted-foreground mb-8 leading-relaxed flex-grow">
        {pkg.description}
      </p>

      <ul className="space-y-4 mb-10">
        {pkg.features?.slice(0, -1).map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-foreground">
            <Check size={18} className="text-primary mt-0.5 shrink-0 font-bold" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-lg font-bold text-sm tracking-wide transition-all ${
          pkg.isPopular 
            ? "bg-primary text-white hover:bg-primary/90 hover:shadow-lg" 
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
        <div key={i} className="h-96 bg-card rounded-2xl animate-pulse border-2 border-foreground/10" />
      ))}
    </>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full py-16 text-center text-muted-foreground border-2 border-dashed border-foreground/20 rounded-xl">
      Pricing packages coming soon.
    </div>
  );
}
