import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, PlayCircle, Star, TrendingUp, MonitorPlay } from "lucide-react";
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Animation / Placeholder Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background z-10" />
          {/* Using a dark abstract image for background since we don't have a video file yet */}
          <img 
            src="https://pixabay.com/get/gcdaaec38ca17aa825f59eadc3a8c3b7afda57476c379f798fc652f7f40504408292d9a6d9b6bf9181706e0afe5cd6d01e81c53f68203a0aec5aa794a58bbb7a2_1280.jpg" 
            alt="Editing Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="container relative z-20 px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8 inline-block relative"
          >
             <img src={circLogo} alt="Logo" className="w-24 h-24 md:w-32 md:h-32 opacity-80 animate-pulse" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-8xl font-display font-bold text-white mb-6 tracking-tight leading-none"
          >
            CINEMORA <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">STUDIO</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light"
          >
            Transforming raw footage into cinematic masterpieces.
            <br className="hidden md:block" /> 
            Professional editing for reels, commercials, and documentaries.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/work">
              <button className="px-8 py-4 bg-primary text-white font-bold tracking-wider rounded-sm hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(109,40,217,0.4)] flex items-center gap-2">
                VIEW OUR WORK <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold tracking-wider rounded-sm hover:bg-white/5 transition-all hover:border-white/50">
                GET STARTED
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-card relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                WE EDIT. <br/>
                <span className="text-muted-foreground">YOU CREATE.</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At Cinemora Studio, we understand that every frame matters. Whether it's a 
                high-energy Instagram Reel or a full-length documentary, our editing process 
                brings out the best in your footage.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-3xl font-bold text-secondary mb-1">500+</h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-1">100%</h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Client Satisfaction</p>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                 <div className="aspect-[3/4] rounded-lg bg-muted overflow-hidden">
                   <img src="https://pixabay.com/get/g6f08f2a83afcf38ac973f82a30a822b78ea38168166cb74a40f849e0c59406713c00ae92fc93e10f1d88b8ff6e25bccab5c3f1e485f9f953478571b822f7be24_1280.jpg" alt="Editing" className="w-full h-full object-cover" />
                 </div>
                 <div className="aspect-[3/4] rounded-lg bg-muted overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80" alt="Color Grade" className="w-full h-full object-cover" />
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="aspect-[3/4] rounded-lg bg-muted overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&q=80" alt="Timeline" className="w-full h-full object-cover" />
                 </div>
                 <div className="aspect-[3/4] rounded-lg bg-muted overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80" alt="Effects" className="w-full h-full object-cover" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-mono text-sm tracking-widest mb-2 block">PORTFOLIO</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">LATEST CUTS</h2>
            </div>
            <Link href="/work">
              <span className="hidden md:flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors cursor-pointer">
                VIEW ALL PROJECTS <ArrowRight size={16} />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
               [1, 2, 3].map(i => (
                 <div key={i} className="aspect-[16/9] bg-muted animate-pulse rounded-lg" />
               ))
            ) : featuredProjects.length > 0 ? (
               featuredProjects.map((project, i) => (
                 <ProjectCard key={project.id} project={project} index={i} />
               ))
            ) : (
               <div className="col-span-3 text-center py-20 text-muted-foreground border border-dashed border-white/10 rounded-lg">
                 No projects loaded. Add seed data to backend.
               </div>
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/work">
              <button className="px-6 py-3 border border-white/20 text-white text-sm font-bold rounded hover:bg-white/5">
                VIEW ALL PROJECTS
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-card border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">THE WORKFLOW</h2>
            <p className="text-muted-foreground">From raw footage to final export, our process is streamlined for quality and speed.</p>
          </div>
          <Timeline />
        </div>
      </section>
      
      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-background border border-white/5 hover:border-primary/50 transition-colors group">
               <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                 <TrendingUp />
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">Reels & TikToks</h3>
               <p className="text-muted-foreground mb-6">High-retention, fast-paced editing designed for viral growth.</p>
               <Link href="/services"><span className="text-sm font-bold text-white border-b border-primary pb-1 cursor-pointer">LEARN MORE</span></Link>
             </div>
             
             <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-background border border-white/5 hover:border-secondary/50 transition-colors group">
               <div className="w-12 h-12 rounded bg-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                 <MonitorPlay />
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">YouTube Videos</h3>
               <p className="text-muted-foreground mb-6">Engaging storytelling, sound design, and retention-focused cuts.</p>
               <Link href="/services"><span className="text-sm font-bold text-white border-b border-secondary pb-1 cursor-pointer">LEARN MORE</span></Link>
             </div>
             
             <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-background border border-white/5 hover:border-purple-500/50 transition-colors group">
               <div className="w-12 h-12 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                 <Star />
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">Commercials</h3>
               <p className="text-muted-foreground mb-6">High-end color grading and visual effects for brands.</p>
               <Link href="/services"><span className="text-sm font-bold text-white border-b border-purple-400 pb-1 cursor-pointer">LEARN MORE</span></Link>
             </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-0"></div>
        
        <div className="container relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">READY TO LEVEL UP?</h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Book your slot now. We only take on a limited number of clients per month to ensure quality.
          </p>
          <Link href="/contact">
            <button className="px-10 py-5 bg-white text-black font-bold text-lg rounded hover:bg-gray-200 transition-colors shadow-2xl">
              START YOUR PROJECT
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
