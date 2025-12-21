import { motion } from "framer-motion";
import { FileVideo, Scissors, Palette, Wand2, UploadCloud } from "lucide-react";

const steps = [
  { icon: FileVideo, title: "Import", desc: "Raw Footage Intake" },
  { icon: Scissors, title: "Cut", desc: "Narrative Assembly" },
  { icon: Palette, title: "Color", desc: "Grading & Mood" },
  { icon: Wand2, title: "FX", desc: "VFX & Motion" },
  { icon: UploadCloud, title: "Deliver", desc: "Final Export" },
];

export function Timeline() {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Horizontal Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2 hidden md:block" />
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 relative z-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-card border border-white/10 flex items-center justify-center mb-6 relative group-hover:border-primary/50 transition-colors bg-gradient-to-b from-white/5 to-transparent">
              <step.icon className="text-muted-foreground group-hover:text-primary transition-colors w-7 h-7" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Connector Dot */}
              <div className="absolute -bottom-10 md:top-1/2 md:-right-[calc(50%-2rem)] md:translate-x-1/2 md:-translate-y-1/2 w-3 h-3 bg-card border-2 border-primary rounded-full z-20 hidden md:block" />
            </div>
            
            <h4 className="text-lg font-display font-bold text-white mb-1">{step.title}</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
