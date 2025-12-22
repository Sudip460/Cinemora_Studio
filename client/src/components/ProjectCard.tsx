import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative cursor-pointer"
      data-testid={`card-project-${project.id}`}
    >
      <div className="aspect-[16/9] rounded-xl overflow-hidden relative bg-card border-2 border-foreground/10 group-hover:border-primary/50 transition-colors shadow-lg group-hover:shadow-xl">
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.2 }}
            className="w-16 h-16 rounded-full bg-primary/30 dark:bg-primary/50 border-2 border-primary text-primary flex items-center justify-center shadow-[0_0_30px_rgba(109,40,217,0.6)]"
          >
            <Play fill="currentColor" size={24} className="ml-1" />
          </motion.div>
        </div>
        
        <div className="absolute top-4 left-4 px-3 py-1 bg-foreground/90 dark:bg-black/80 backdrop-blur text-xs font-mono text-background dark:text-white rounded-full border border-foreground/20 dark:border-white/20">
          {project.category === 'reel' ? '⚡ REEL' : '🎬 FULL LENGTH'}
        </div>
      </div>
      
      <div className="mt-4 px-1">
        <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors" data-testid={`text-title-${project.id}`}>
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {project.description}
        </p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {project.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider text-accent bg-accent/20 dark:bg-accent/30 px-2.5 py-1 rounded-full font-semibold">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
