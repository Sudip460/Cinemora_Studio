import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { DynamicBackground } from "@/components/DynamicBackground";
import {
  distributeFeaturedProjects,
  getFeaturedWorkLayout,
  type FeaturedWorkLayout,
} from "@/lib/project-layout";
import { motion } from "framer-motion";

const tabs = [
  { id: "all", label: "ALL WORK", icon: "🎞️" },
  { id: "reel", label: "REELS / SHORTS", icon: "⚡" },
  { id: "full-length", label: "FULL LENGTH", icon: "🎬" },
];

export default function Work() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [featuredWorkLayout, setFeaturedWorkLayout] = useState<FeaturedWorkLayout>(() =>
    typeof window === "undefined" ? "desktop" : getFeaturedWorkLayout(window.innerWidth)
  );
  const { data: projects, isLoading } = useProjects(
    activeTab === "all" ? undefined : (activeTab as "reel" | "full-length")
  );

  useEffect(() => {
    const handleResize = () => {
      setFeaturedWorkLayout(getFeaturedWorkLayout(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allWorkColumns = useMemo(() => {
    if (activeTab !== "all" || !projects?.length) {
      return [];
    }

    const reels = projects.filter((project) => project.category === "reel");
    const fulls = projects.filter((project) => project.category === "full-length");

    return distributeFeaturedProjects(reels, fulls, featuredWorkLayout);
  }, [activeTab, projects, featuredWorkLayout]);

  const skeletonColumnCount =
    featuredWorkLayout === "desktop" ? 3 : featuredWorkLayout === "tablet" ? 2 : 1;
  const skeletonColumns = Array.from({ length: skeletonColumnCount }, (_, columnIndex) => ({
    id: columnIndex,
    items: Array.from({ length: 2 }, (_, itemIndex) => `${columnIndex}-${itemIndex}`),
  }));

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <div className="relative pt-32 pb-20 container mx-auto px-4 md:px-6">
        <DynamicBackground />
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 relative z-10"
        >
          <motion.span 
            className="text-accent font-mono text-sm tracking-widest uppercase block mb-6 font-bold"
            whileInView={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ Portfolio
          </motion.span>
          <h1 className="text-7xl md:text-8xl font-serif font-black text-foreground mb-8 glow-text">Our Work</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg relative z-10 leading-relaxed">
            A showcase of professional video editing across reels, shorts, documentaries, and commercial projects. Each edit tells its own story.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-20 overflow-x-auto relative z-10"
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
                    ? "bg-gradient-to-r from-primary to-orange-600 text-white shadow-lg dark:shadow-[0_0_30px_rgba(255,127,0,0.4)]"
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

        {activeTab === "all" ? (
          <div className="relative z-10">
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
            ) : allWorkColumns.length > 0 ? (
              <div className={`featured-work-layout featured-work-layout--${allWorkColumns.length}`}>
                {allWorkColumns.map((column, columnIndex) => (
                  <div key={`work-column-${columnIndex}`} className="featured-work-column">
                    {column.map((project, itemIndex) => (
                      <div key={project.id} className="featured-work-item">
                        <ProjectCard project={project} index={columnIndex + itemIndex} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-40 text-center border-2 border-dashed border-foreground/20 rounded-2xl bg-card/50 backdrop-blur">
                <p className="text-2xl font-serif font-black text-muted-foreground">No projects yet</p>
                <p className="text-muted-foreground mt-2">Check back soon for our latest edits</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
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
        )}
      </div>
      <Footer />
    </div>
  );
}
