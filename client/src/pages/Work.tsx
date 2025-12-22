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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase block mb-4">Portfolio</span>
          <h1 className="text-6xl md:text-7xl font-display font-black text-foreground mb-6">Our Work</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our collection of professionally edited videos across various niches and styles. Each project tells a unique story.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-20 overflow-x-auto"
        >
          <div className="flex gap-3 p-2 bg-card border border-foreground/10 rounded-xl">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 text-sm font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg dark:shadow-[0_0_20px_rgba(109,40,217,0.3)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
                data-testid={`button-filter-${tab.id}`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video bg-card animate-pulse rounded-xl border-2 border-foreground/10" />
            ))
          ) : projects && projects.length > 0 ? (
            projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-foreground/20 rounded-xl bg-card/30">
              <p className="text-xl text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
