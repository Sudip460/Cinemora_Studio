import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, PlayCircle, Zap, Film, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { DynamicBackground } from "@/components/DynamicBackground";
import { useProjects } from "@/hooks/use-projects";
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
  const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* HERO - Enhanced with Dynamic Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <DynamicBackground />

        {/* Content */}
        <div className="container relative z-20 px-4 md:px-6 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -15, 0], rotateZ: [-1, 1, -1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <img 
                src={circLogo} 
                alt="Logo" 
                className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-6xl md:text-9xl font-serif font-black text-foreground mb-4 tracking-tighter leading-none glow-text"
            >
              CINEMORA
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="inline-block"
            >
              <span className="text-6xl md:text-9xl font-serif font-black text-gradient-bold tracking-tighter">
                STUDIO
              </span>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 w-32 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-8 rounded-full"
          />
          
          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto mb-12 font-light leading-relaxed">
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
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/work">
              <motion.button 
                whileHover={{ scale: 1.08, boxShadow: "0 0 30px hsl(var(--primary) / 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-primary to-orange-600 dark:to-orange-500 text-white font-black tracking-wider rounded-lg flex items-center gap-3 transition-all shadow-xl text-lg"
              >
                <PlayCircle size={24} />
                EXPLORE WORK
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-accent/20 dark:bg-accent/30 border-2 border-accent text-foreground font-black tracking-wider rounded-lg hover:bg-accent/30 dark:hover:bg-accent/40 transition-all text-lg"
              >
                START PROJECT
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">Scroll to explore</span>
              <div className="w-0.5 h-8 bg-gradient-to-b from-primary via-secondary to-transparent rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="relative py-32 bg-gradient-to-b from-background via-card/30 to-background border-y border-foreground/10 overflow-hidden">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
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
              
              <h2 className="text-5xl md:text-6xl font-serif font-black mb-8 text-foreground leading-tight">
                We Edit. <br/>
                <span className="text-gradient">You Impact.</span>
              </h2>
              
              <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                At Cinemora Studio, every frame is an opportunity for creative expression. We specialize in transforming raw footage into compelling visual narratives that captivate audiences and drive engagement.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="group p-6 bg-gradient-to-br from-primary/20 dark:from-primary/30 to-primary/5 dark:to-primary/10 rounded-xl border-2 border-primary/30 hover:border-primary/60 transition-all"
                >
                  <h3 className="text-5xl font-serif font-black text-primary mb-2 group-hover:text-glow-primary">500+</h3>
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
              className="grid grid-cols-2 gap-6 perspective"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="space-y-6 translate-y-8">
                <motion.div 
                  whileHover={{ scale: 1.05, rotateZ: 2 }}
                  className="aspect-[3/4] rounded-xl overflow-hidden cine-border shadow-2xl group"
                >
                  <img src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80" alt="Editing" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotateZ: -2 }}
                  className="aspect-[3/4] rounded-xl overflow-hidden border-4 border-accent/40 shadow-2xl group"
                >
                  <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80" alt="Color Grade" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
              </motion.div>
              <motion.div className="space-y-6 mt-8">
                <motion.div 
                  whileHover={{ scale: 1.05, rotateZ: -2 }}
                  className="aspect-[3/4] rounded-xl overflow-hidden border-4 border-secondary/40 shadow-2xl group"
                >
                  <img src="https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&q=80" alt="Timeline" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotateZ: 2 }}
                  className="aspect-[3/4] rounded-xl overflow-hidden cine-border shadow-2xl group"
                >
                  <img src="https://images.unsplash.com/photo-1598899138022-ddfb0587ae1d?w=800&q=80" alt="Effects" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="relative py-32 bg-background overflow-hidden">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-20"
          >
            <div>
              <motion.span 
                className="text-secondary font-mono text-sm tracking-widest mb-4 block uppercase font-bold"
                whileInView={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦ Latest Cuts
              </motion.span>
              <h2 className="text-6xl md:text-7xl font-serif font-black text-foreground">Featured Work</h2>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
               [1, 2, 3].map(i => (
                 <div key={i} className="aspect-[16/9] bg-card border-2 border-foreground/10 animate-pulse rounded-xl" />
               ))
            ) : featuredProjects.length > 0 ? (
               featuredProjects.map((project, i) => (
                 <ProjectCard key={project.id} project={project} index={i} />
               ))
            ) : null}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-32 bg-gradient-to-r from-card via-background to-card border-y border-foreground/10 overflow-hidden">
        <DynamicBackground />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.span 
              className="text-primary font-mono text-sm tracking-widest uppercase block mb-4 font-bold"
              whileInView={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ The Workflow
            </motion.span>
            <h2 className="text-6xl md:text-7xl font-serif font-black text-foreground mb-6">From Raw to Ready</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">Our streamlined editing process transforms your footage into polished, professional content that stands out.</p>
          </motion.div>
          <Timeline />
        </div>
      </section>
      
      {/* Services */}
      <section className="relative py-32 bg-background overflow-hidden">
        <DynamicBackground />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <motion.span 
              className="text-accent font-mono text-sm tracking-widest uppercase block mb-4 font-bold"
              whileInView={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦ Services
            </motion.span>
            <h2 className="text-6xl md:text-7xl font-serif font-black text-foreground">What We Do</h2>
          </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0 }}
               whileHover={{ y: -12 }}
               className="group p-8 rounded-2xl artistic-card bg-gradient-to-br from-primary/15 dark:from-primary/25 to-primary/5 dark:to-primary/10 border-2 border-primary/30 hover:border-primary/70 hover:shadow-xl transition-all duration-300"
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
               className="group p-8 rounded-2xl artistic-card bg-gradient-to-br from-secondary/15 dark:from-secondary/25 to-secondary/5 dark:to-secondary/10 border-2 border-secondary/30 hover:border-secondary/70 hover:shadow-xl transition-all duration-300"
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
               className="group p-8 rounded-2xl artistic-card bg-gradient-to-br from-accent/15 dark:from-accent/25 to-accent/5 dark:to-accent/10 border-2 border-accent/30 hover:border-accent/70 hover:shadow-xl transition-all duration-300"
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
      <section className="relative py-40 overflow-hidden">
        <DynamicBackground />
        
        <div className="container relative z-10 text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-serif font-black text-foreground mb-8 glow-text leading-tight"
          >
            Ready to Create <span className="text-gradient">Magic?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
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
                className="px-12 py-6 bg-gradient-to-r from-primary to-orange-600 dark:to-orange-500 text-white font-black text-xl rounded-lg hover:shadow-2xl transition-all tracking-wider flex items-center gap-3 mx-auto glow-primary"
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
