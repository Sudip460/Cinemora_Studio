import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";

const tabs = [
  { id: "all", label: "ALL WORK" },
  { id: "reel", label: "REELS / SHORTS" },
  { id: "full-length", label: "FULL LENGTH" },
];

export default function Work() {
  const [activeTab, setActiveTab] = useState<string>("all");
  // Pass undefined if 'all' to fetch everything, otherwise pass the category
  const { data: projects, isLoading } = useProjects(
    activeTab === "all" ? undefined : (activeTab as "reel" | "full-length")
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-16 container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">SELECTED WORK</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of edits across various niches. 
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-16">
          <div className="flex gap-2 p-1 bg-card border border-white/10 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 text-sm font-bold rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video bg-card animate-pulse rounded-lg border border-white/5" />
            ))
          ) : projects && projects.length > 0 ? (
            projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center border border-dashed border-white/10 rounded-2xl bg-card/50">
              <p className="text-xl text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
