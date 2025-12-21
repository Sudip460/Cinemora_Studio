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
    >
      <div className="aspect-[16/9] rounded-lg overflow-hidden relative bg-card border border-white/5">
        {/* Thumbnail Image */}
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center shadow-[0_0_30px_rgba(109,40,217,0.4)]"
          >
            <Play fill="currentColor" size={24} className="ml-1" />
          </motion.div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur text-xs font-mono text-white rounded border border-white/10">
          {project.category === 'reel' ? 'REEL' : 'FULL LENGTH'}
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
          {project.description}
        </p>
        <div className="flex gap-2 mt-3">
          {project.tags?.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
