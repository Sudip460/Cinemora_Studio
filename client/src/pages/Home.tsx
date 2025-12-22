import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, PlayCircle, Zap, Film, Sparkles, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { useProjects } from "@/hooks/use-projects";
import circLogo from "@assets/Picsart_25-10-04_22-03-18-563_1766355441351.png";

export default function Home() {
  const { data: projects, isLoading } = useProjects();
  const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* HERO - Video Editing Themed */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 -left-40 w-80 h-80 bg-primary/20 dark:bg-primary/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-40 w-80 h-80 bg-secondary/20 dark:bg-secondary/30 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="container relative z-20 px-4 md:px-6 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center"
          >
            <motion.img 
              src={circLogo} 
              alt="Logo" 
              className="w-28 h-28 md:w-40 md:h-40 drop-shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Main Heading with character animation */}
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-display font-black text-foreground mb-6 tracking-tighter leading-none"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="block"
            >
              CINEMORA
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gradient block"
            >
              STUDIO
            </motion.span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 font-light leading-relaxed"
          >
            Raw footage meets creative vision. 
            <br className="hidden md:block" />
            We transform content into <span className="text-primary font-semibold">cinematic masterpieces</span>.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/work">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-white font-bold tracking-wider rounded hover:shadow-lg dark:shadow-[0_0_20px_rgba(109,40,217,0.4)] flex items-center gap-2 transition-all"
              >
                <PlayCircle size={20} />
                VIEW OUR WORK
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent/20 dark:bg-transparent border border-foreground/20 text-foreground font-bold tracking-wider rounded hover:bg-accent/30 dark:hover:border-accent transition-all"
              >
                GET STARTED
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
              <div className="w-0.5 h-6 bg-gradient-to-b from-primary to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are - Creative Section */}
      <section className="py-24 bg-gradient-to-br from-background via-card to-background border-y border-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="mb-4">
                <span className="text-accent font-mono text-sm tracking-widest uppercase">About us</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-foreground">
                We Edit. <br/>
                <span className="text-gradient">You Impact.</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                At Cinemora Studio, every frame is an opportunity. Whether you're producing high-energy Instagram Reels or immersive documentaries, we understand the art and science of professional video editing. Our approach combines technical precision with creative storytelling.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
                  <h3 className="text-4xl font-display font-bold text-primary mb-2">500+</h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Projects Completed</p>
                </div>
                <div className="p-6 bg-secondary/10 dark:bg-secondary/20 rounded-lg border border-secondary/20">
                  <h3 className="text-4xl font-display font-bold text-secondary mb-2">100%</h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Client Satisfaction</p>
                </div>
              </div>
            </motion.div>
            
            {/* Visual - Stacked Cards with Film Theme */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="space-y-6 translate-y-8">
                <div className="aspect-[3/4] rounded-lg overflow-hidden border-4 border-foreground/20 shadow-xl hover:shadow-2xl transition-shadow">
                  <img src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80" alt="Editing" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] rounded-lg overflow-hidden border-4 border-accent/30 shadow-xl hover:shadow-2xl transition-shadow">
                  <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80" alt="Color Grade" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              <motion.div className="space-y-6 mt-8">
                <div className="aspect-[3/4] rounded-lg overflow-hidden border-4 border-secondary/30 shadow-xl hover:shadow-2xl transition-shadow">
                  <img src="https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&q=80" alt="Timeline" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] rounded-lg overflow-hidden border-4 border-primary/30 shadow-xl hover:shadow-2xl transition-shadow">
                  <img src="https://images.unsplash.com/photo-1598899138022-ddfb0587ae1d?w=800&q=80" alt="Effects" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Work - Portfolio */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <span className="text-accent font-mono text-sm tracking-widest mb-3 block uppercase">Latest Cuts</span>
              <h2 className="text-5xl md:text-6xl font-display font-black text-foreground">Featured Work</h2>
            </div>
            <Link href="/work">
              <motion.span 
                className="hidden md:flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                EXPLORE ALL <ArrowRight size={18} />
              </motion.span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
               [1, 2, 3].map(i => (
                 <div key={i} className="aspect-[16/9] bg-card border border-foreground/10 animate-pulse rounded-lg" />
               ))
            ) : featuredProjects.length > 0 ? (
               featuredProjects.map((project, i) => (
                 <ProjectCard key={project.id} project={project} index={i} />
               ))
            ) : null}
          </div>
        </div>
      </section>

      {/* The Process - Timeline */}
      <section className="py-24 bg-card border-y border-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="text-primary font-mono text-sm tracking-widest uppercase block mb-4">The Workflow</span>
            <h2 className="text-5xl md:text-6xl font-display font-black text-foreground mb-6">From Raw to Ready</h2>
            <p className="text-muted-foreground text-lg">Our editing process is streamlined for maximum quality and efficiency. Watch how we transform your footage.</p>
          </motion.div>
          <Timeline />
        </div>
      </section>
      
      {/* Services Quick Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-secondary font-mono text-sm tracking-widest uppercase block mb-3">Services</span>
            <h2 className="text-5xl md:text-6xl font-display font-black text-foreground">What We Do</h2>
          </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0 }}
               className="group p-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border border-primary/20 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
             >
               <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                 <Zap size={24} />
               </div>
               <h3 className="text-2xl font-display font-bold text-foreground mb-3">Reels & Shorts</h3>
               <p className="text-muted-foreground mb-6 leading-relaxed">High-retention, fast-paced editing designed for viral growth on Instagram, TikTok, and YouTube Shorts.</p>
               <Link href="/services"><span className="text-sm font-bold text-primary border-b border-primary pb-1 cursor-pointer hover:text-primary/70 transition-colors">VIEW PRICING</span></Link>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="group p-8 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 border border-secondary/20 hover:border-secondary/50 hover:shadow-lg transition-all duration-300"
             >
               <div className="w-14 h-14 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                 <Film size={24} />
               </div>
               <h3 className="text-2xl font-display font-bold text-foreground mb-3">Full Length</h3>
               <p className="text-muted-foreground mb-6 leading-relaxed">Engaging storytelling, professional sound design, and retention-focused cuts for YouTube, documentaries, and commercials.</p>
               <Link href="/services"><span className="text-sm font-bold text-secondary border-b border-secondary pb-1 cursor-pointer hover:text-secondary/70 transition-colors">VIEW PRICING</span></Link>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="group p-8 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 border border-accent/20 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
             >
               <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                 <Sparkles size={24} />
               </div>
               <h3 className="text-2xl font-display font-bold text-foreground mb-3">Custom Projects</h3>
               <p className="text-muted-foreground mb-6 leading-relaxed">High-end color grading, VFX, motion graphics, and specialized editing for unique creative visions.</p>
               <Link href="/contact"><span className="text-sm font-bold text-accent border-b border-accent pb-1 cursor-pointer hover:text-accent/70 transition-colors">GET IN TOUCH</span></Link>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 dark:from-primary/30 dark:via-accent/30 dark:to-secondary/30" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"
        />
        
        <div className="container relative z-10 text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black text-foreground mb-8"
          >
            Ready to Create Magic?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Book your project with us today. We take on a limited number of clients per month to ensure every video gets the attention it deserves.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-primary text-white font-bold text-lg rounded hover:shadow-xl transition-all tracking-wider flex items-center gap-3 mx-auto"
              >
                START YOUR PROJECT <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
