import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePricing } from "@/hooks/use-pricing";
import { Check, Zap, Film, MonitorPlay } from "lucide-react";
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
      <section className="pt-40 pb-20 container mx-auto px-4 md:px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
        >
          PRICING & PACKAGES
        </motion.h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transparent pricing for professional editing. Choose the package that fits your content strategy.
        </p>
      </section>

      {/* Pricing Section 1: Short Form */}
      <section className="py-16 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-primary/20 rounded-lg text-primary">
              <Zap size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-white">REELS & SHORTS</h2>
              <p className="text-muted-foreground">For TikTok, Instagram Reels, and YouTube Shorts (Under 60s)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {isLoading ? <LoadingCards /> : reelPackages.length > 0 ? (
               reelPackages.map((pkg, i) => <PricingCard key={pkg.id} pkg={pkg} delay={i} />)
             ) : <EmptyState />}
          </div>
        </div>
      </section>

      {/* Pricing Section 2: Long Form */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-secondary/20 rounded-lg text-secondary">
              <MonitorPlay size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-white">FULL LENGTH</h2>
              <p className="text-muted-foreground">For YouTube, Documentaries, and Commercials</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {isLoading ? <LoadingCards count={2} /> : fullPackages.length > 0 ? (
               fullPackages.map((pkg, i) => <PricingCard key={pkg.id} pkg={pkg} delay={i} />)
             ) : <EmptyState />}
          </div>
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
      className={`relative p-8 rounded-2xl border flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 ${
        pkg.isPopular 
          ? "bg-card border-primary/50 shadow-[0_0_40px_-10px_rgba(109,40,217,0.3)]" 
          : "bg-background border-white/10"
      }`}
    >
      {pkg.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Most Popular
        </div>
      )}

      <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-display font-bold text-white">{pkg.price}</span>
        <span className="text-muted-foreground text-sm"> / video</span>
      </div>
      <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
        {pkg.description}
      </p>

      <ul className="space-y-4 mb-8 flex-grow">
        {pkg.features?.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
            <Check size={16} className="text-primary mt-1 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-3 rounded font-bold text-sm tracking-wide transition-all ${
        pkg.isPopular 
          ? "bg-primary text-white hover:bg-primary/90 hover:shadow-lg" 
          : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
      }`}>
        CHOOSE PLAN
      </button>
    </motion.div>
  );
}

function LoadingCards({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="h-96 bg-card/50 rounded-2xl animate-pulse border border-white/5" />
      ))}
    </>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full py-10 text-center text-muted-foreground border border-dashed border-white/10 rounded-lg">
      Pricing packages coming soon.
    </div>
  );
}
