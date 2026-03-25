import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, PlayCircle, Zap, Film, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { DynamicBackground } from "@/components/DynamicBackground";
import {
  distributeFeaturedProjects,
  getFeaturedWorkLayout,
  type FeaturedWorkLayout,
} from "@/lib/project-layout";
import { useProjects } from "@/hooks/use-projects";
import { useEffect, useMemo, useRef, useState } from "react";
import circLogo from "@assets/Picsart_25-10-04_22-03-18-563_1766355441351.png";

const FloatingParticle = ({ delay, duration }: { delay: number; duration: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{
      background: `hsl(var(--primary) / ${Math.random() * 0.5 + 0.2})`,
      left: `${Math.random() * 100}%`,
      top: "100%"
    }}
    animate={{
      y: -window.innerHeight,
      opacity: [0, 1, 1, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

export default function Home() {
  const { data: projects, isLoading } = useProjects();
  const scrollIndicatorRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [featuredWorkLayout, setFeaturedWorkLayout] = useState<FeaturedWorkLayout>(() =>
    typeof window === "undefined" ? "desktop" : getFeaturedWorkLayout(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setFeaturedWorkLayout(getFeaturedWorkLayout(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const featuredWorkColumns = useMemo(() => {
    if (!projects?.length) {
      return [];
    }

    const reels = projects.filter((project) => project.category === "reel");
    const fulls = projects.filter((project) => project.category === "full-length");

    return distributeFeaturedProjects(reels, fulls, featuredWorkLayout).map((column) =>
      column.slice(0, 2)
    );
  }, [projects, featuredWorkLayout]);

  const skeletonColumnCount =
    featuredWorkLayout === "desktop" ? 3 : featuredWorkLayout === "tablet" ? 2 : 1;
  const skeletonColumns = Array.from({ length: skeletonColumnCount }, (_, columnIndex) => ({
    id: columnIndex,
    items: Array.from({ length: 2 }, (_, itemIndex) => `${columnIndex}-${itemIndex}`),
  }));

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* HERO - Enhanced with Dynamic Background */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-14 pt-24 sm:px-6 sm:pt-28">
        <DynamicBackground />

        {/* Content */}
        <div className="container relative z-20 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center sm:mb-12"
          >
            <motion.div
              animate={{ y: [0, -15, 0], rotateZ: [-1, 1, -1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <img 
                src={circLogo} 
                alt="Logo" 
                className="h-24 w-24 drop-shadow-2xl sm:h-32 sm:w-32 md:h-48 md:w-48"
              />
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mb-3 text-[clamp(3.5rem,16vw,8rem)] font-serif font-black leading-[0.92] tracking-[-0.06em] text-foreground glow-text sm:mb-4 md:text-[clamp(5.5rem,13vw,9rem)]"
            >
              CINEMORA
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="inline-block"
            >
              <span className="text-[clamp(3.5rem,16vw,8rem)] font-serif font-black tracking-[-0.06em] text-gradient-bold md:text-[clamp(5.5rem,13vw,9rem)]">
                STUDIO
              </span>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary via-accent to-secondary sm:mb-8 sm:w-32"
          />
          
          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="mx-auto mb-10 max-w-4xl text-balance text-lg font-light leading-relaxed text-muted-foreground sm:text-xl md:mb-12 md:text-3xl">
              Where <span className="text-gradient font-semibold">raw footage</span> becomes <span className="text-primary font-bold">cinematic poetry</span>. 
              <br className="hidden md:block" />
              <span className="text-accent font-semibold">Professional video editing</span> for creators who demand excellence.
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <Link href="/work">
              <motion.button 
                whileHover={{ scale: 1.08, boxShadow: "0 0 30px hsl(var(--primary) / 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-primary to-orange-600 px-8 py-4 text-base font-black tracking-wider text-white shadow-xl transition-all dark:to-orange-500 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
              >
                <PlayCircle size={24} />
                EXPLORE WORK
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-lg border-2 border-accent bg-accent/20 px-8 py-4 text-base font-black tracking-wider text-foreground transition-all hover:bg-accent/30 dark:bg-accent/30 dark:hover:bg-accent/40 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
              >
                START PROJECT
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Scroll indicator - outside section for proper centering */}
      <motion.div 
        ref={scrollIndicatorRef}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ opacity: scrollOpacity }}
        className="fixed bottom-8 left-1/2 z-50 hidden sm:block"
      >
        <div className="flex flex-col items-center gap-2 -translate-x-1/2">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">Scroll to explore</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-primary via-secondary to-transparent rounded-full" />
        </div>
      </motion.div>

      {/* About */}
      <section className="relative overflow-hidden border-y border-foreground/10 bg-gradient-to-b from-background via-card/30 to-background py-20 sm:py-24 lg:py-32">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="text-accent font-mono text-sm tracking-widest uppercase block mb-6 font-bold"
                whileInView={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦ About Us
              </motion.span>
              
              <h2 className="mb-6 text-4xl font-serif font-black leading-tight text-foreground sm:text-5xl md:mb-8 md:text-6xl">
                We Edit. <br/>
                <span className="text-gradient">You Impact.</span>
              </h2>
              
              <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                At Cinemora Studio, every frame is an opportunity for creative expression. We specialize in transforming raw footage into compelling visual narratives that captivate audiences and drive engagement.
              </p>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="group p-6 bg-gradient-to-br from-primary/20 dark:from-primary/30 to-primary/5 dark:to-primary/10 rounded-xl border-2 border-primary/30 hover:border-primary/60 transition-all"
                >
                  <h3 className="text-5xl font-serif font-black text-primary mb-2 group-hover:text-glow-primary">250+</h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Videos Edited</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="group p-6 bg-gradient-to-br from-secondary/20 dark:from-secondary/30 to-secondary/5 dark:to-secondary/10 rounded-xl border-2 border-secondary/30 hover:border-secondary/60 transition-all"
                >
                  <h3 className="text-5xl font-serif font-black text-secondary mb-2">100%</h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Client Approved</p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="mx-auto grid max-w-xl grid-cols-2 gap-4 perspective sm:gap-6 lg:mx-0"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="space-y-4 sm:space-y-6 lg:translate-y-8">
                <motion.div
                  whileHover={{ scale: 1.05, rotateZ: 2 }}
                  className="aspect-[3/4] rounded-xl overflow-hidden cine-border shadow-2xl group"
                >
                  <img src="/thumbnailss/poster1.png" alt="Editing" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotateZ: -2 }}
                  className="aspect-[3/4] rounded-xl overflow-hidden border-4 border-accent/40 shadow-2xl group"
                >
                  <img src="/thumbnailss/poster3.png" alt="Color Grade" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
              </motion.div>
              <motion.div className="mt-4 space-y-4 sm:mt-8 sm:space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.05, rotateZ: -2 }}
                  className="aspect-[3/4] rounded-xl overflow-hidden border-4 border-secondary/40 shadow-2xl group"
                >
                  <img src="/thumbnailss/poster2.png" alt="Timeline" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotateZ: 2 }}
                  className="aspect-[3/4] rounded-xl overflow-hidden cine-border shadow-2xl group"
                >
                  <img src="/thumbnailss/poster4.png" alt="Effects" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Work - Grid with Reel/Full-Length Separation */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
        <DynamicBackground />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 md:flex-row md:items-end lg:mb-20"
          >
            <div>
              <motion.span 
                className="text-secondary font-mono text-sm tracking-widest mb-4 block uppercase font-bold"
                whileInView={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦ Latest Cuts
              </motion.span>
              <h2 className="text-4xl font-serif font-black text-foreground sm:text-5xl md:text-6xl lg:text-7xl">Featured Work</h2>
              <Link href="/work">
                <motion.span
                  className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-black uppercase tracking-wider text-primary md:hidden"
                  whileHover={{ x: 4 }}
                >
                  VIEW ALL <ArrowRight size={16} />
                </motion.span>
              </Link>
            </div>
            <Link href="/work">
              <motion.span 
                className="hidden md:flex items-center gap-3 text-base font-black text-foreground hover:text-primary transition-colors cursor-pointer"
                whileHover={{ x: 8 }}
              >
                VIEW ALL <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>

          {isLoading ? (
            <div className={`featured-work-layout featured-work-layout--${skeletonColumnCount}`}>
              {skeletonColumns.map((column) => (
                <div key={column.id} className="featured-work-column">
                  {column.items.map((itemId) => (
                    <div
                      key={itemId}
                      className="featured-work-item aspect-video bg-card border-2 border-foreground/10 animate-pulse rounded-xl"
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : featuredWorkColumns.length > 0 ? (
            <>
              <div className={`featured-work-layout featured-work-layout--${featuredWorkColumns.length}`}>
                {featuredWorkColumns.map((column, columnIndex) => (
                  <div key={`featured-column-${columnIndex}`} className="featured-work-column">
                    {column.map((project, itemIndex) => (
                      <div key={project.id} className="featured-work-item">
                        <ProjectCard
                          project={project}
                          index={columnIndex + itemIndex}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center md:hidden">
                <Link href="/work">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex w-full max-w-sm items-center justify-center gap-3 rounded-lg border-2 border-primary/40 bg-primary/10 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-foreground transition-all hover:border-primary hover:bg-primary/15"
                  >
                    EXPLORE ALL <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden border-y border-foreground/10 bg-gradient-to-r from-card via-background to-card py-20 sm:py-24 lg:py-32">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20"
          >
            <motion.span 
              className="text-primary font-mono text-sm tracking-widest uppercase block mb-4 font-bold"
              whileInView={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ The Workflow
            </motion.span>
            <h2 className="mb-6 text-4xl font-serif font-black text-foreground sm:text-5xl md:text-6xl lg:text-7xl">From Raw to Ready</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">Our streamlined editing process transforms your footage into polished, professional content that stands out.</p>
          </motion.div>
          <Timeline />
        </div>
      </section>
      
      {/* Services */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
        <DynamicBackground />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-14 lg:mb-16"
          >
            <motion.span 
              className="text-accent font-mono text-sm tracking-widest uppercase block mb-4 font-bold"
              whileInView={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ Services
            </motion.span>
            <h2 className="text-4xl font-serif font-black text-foreground sm:text-5xl md:text-6xl lg:text-7xl">What We Do</h2>
          </motion.div>

           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0 }}
               whileHover={{ y: -12 }}
               className="group artistic-card rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 p-6 transition-all duration-300 hover:border-primary/70 hover:shadow-xl dark:from-primary/25 dark:to-primary/10 sm:p-8"
             >
               <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all text-3xl">
                 ⚡
               </div>
               <h3 className="text-2xl font-serif font-black text-foreground mb-4">Reels & Shorts</h3>
               <p className="text-muted-foreground mb-6 leading-relaxed font-medium">High-retention editing for Instagram, TikTok, and YouTube Shorts that drives engagement and viral growth.</p>
               <Link href="/services"><span className="text-sm font-black text-primary border-b-2 border-primary pb-1 cursor-pointer hover:text-primary/80 transition-colors">LEARN MORE →</span></Link>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               whileHover={{ y: -12 }}
               className="group artistic-card rounded-2xl border-2 border-secondary/30 bg-gradient-to-br from-secondary/15 to-secondary/5 p-6 transition-all duration-300 hover:border-secondary/70 hover:shadow-xl dark:from-secondary/25 dark:to-secondary/10 sm:p-8"
             >
               <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all text-3xl">
                 🎬
               </div>
               <h3 className="text-2xl font-serif font-black text-foreground mb-4">Full Length</h3>
               <p className="text-muted-foreground mb-6 leading-relaxed font-medium">Professional editing for YouTube, documentaries, and commercials with cinematic color grading and sound design.</p>
               <Link href="/services"><span className="text-sm font-black text-secondary border-b-2 border-secondary pb-1 cursor-pointer hover:text-secondary/80 transition-colors">LEARN MORE →</span></Link>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               whileHover={{ y: -12 }}
               className="group artistic-card rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/15 to-accent/5 p-6 transition-all duration-300 hover:border-accent/70 hover:shadow-xl dark:from-accent/25 dark:to-accent/10 sm:p-8"
             >
               <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all text-3xl">
                 ✨
               </div>
               <h3 className="text-2xl font-serif font-black text-foreground mb-4">Custom Projects</h3>
               <p className="text-muted-foreground mb-6 leading-relaxed font-medium">Bespoke creative solutions including color grading, VFX, motion graphics, and specialized editing.</p>
               <Link href="/contact"><span className="text-sm font-black text-accent border-b-2 border-accent pb-1 cursor-pointer hover:text-accent/80 transition-colors">GET IN TOUCH →</span></Link>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <DynamicBackground />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-serif font-black leading-tight text-foreground glow-text sm:text-5xl md:mb-8 md:text-7xl lg:text-8xl"
          >
            Ready to Create <span className="text-gradient">Magic?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-10 max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl md:mb-12 md:text-2xl"
          >
            Let's bring your creative vision to life. We work with a limited number of clients monthly to ensure every project receives our full creative attention.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.1, boxShadow: "0 0 40px hsl(var(--primary) / 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="glow-primary mx-auto flex w-full max-w-sm items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-primary to-orange-600 px-8 py-4 text-base font-black tracking-wider text-white transition-all hover:shadow-2xl dark:to-orange-500 sm:px-12 sm:py-6 sm:text-xl"
              >
                START YOUR PROJECT <ArrowRight size={24} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
