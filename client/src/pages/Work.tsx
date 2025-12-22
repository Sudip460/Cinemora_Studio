import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";

const tabs = [
  { id: "all", label: "ALL WORK", icon: "🎞️" },
  { id: "reel", label: "REELS / SHORTS", icon: "⚡" },
  { id: "full-length", label: "FULL LENGTH", icon: "🎬" },
];

export default function Work() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { data: projects, isLoading } = useProjects(
    activeTab === "all" ? undefined : (activeTab as "reel" | "full-length")
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4 md:px-6">
        {/* Header with dynamic background */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 relative"
        >
          {/* Decorative background circles */}
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.span 
            className="text-accent font-mono text-sm tracking-widest uppercase block mb-6 font-bold relative z-10"
            whileInView={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ Portfolio
          </motion.span>
          <h1 className="text-7xl md:text-8xl font-serif font-black text-foreground mb-8 glow-text relative z-10">Our Work</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg relative z-10 leading-relaxed">
            A showcase of professional video editing across reels, shorts, documentaries, and commercial projects. Each edit tells its own story.
          </p>
        </motion.div>

        {/* Filter Tabs - Artistic */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-20 overflow-x-auto"
        >
          <div className="flex gap-4 p-2 bg-gradient-to-r from-card via-background to-card rounded-2xl border border-foreground/10 backdrop-blur">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`px-7 py-3 text-sm font-black rounded-xl transition-all flex items-center gap-2 whitespace-nowrap tracking-wide ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg dark:shadow-[0_0_30px_rgba(109,40,217,0.4)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
                data-testid={`button-filter-${tab.id}`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video bg-gradient-to-br from-card to-card/50 animate-pulse rounded-xl border-2 border-foreground/10 relative overflow-hidden">
                <div className="absolute inset-0 film-strip opacity-20" />
              </div>
            ))
          ) : projects && projects.length > 0 ? (
            projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          ) : (
            <div className="col-span-full py-40 text-center border-2 border-dashed border-foreground/20 rounded-2xl bg-card/50 backdrop-blur">
              <p className="text-2xl font-serif font-black text-muted-foreground">No projects yet</p>
              <p className="text-muted-foreground mt-2">Check back soon for our latest edits</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
