import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";
import type { Project } from "@shared/schema";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const isInstagramUrl = (url: string) => url.includes("instagram.com");

const isGoogleDriveUrl = (url: string) => url.includes("drive.google.com");

const isYouTubeUrl = (url: string) =>
  url.includes("youtube.com") || url.includes("youtu.be");

const getInstagramReelId = (url: string) => {
  const match = url.match(/\/reel\/([^/?]+)/);
  return match ? match[1] : null;
};

const getYouTubeEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    let videoId: string | null = null;

    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1) || null;
    } else if (parsedUrl.pathname.startsWith("/embed/")) {
      videoId = parsedUrl.pathname.split("/")[2] || null;
    } else {
      videoId = parsedUrl.searchParams.get("v");
    }

    if (!videoId) {
      return url;
    }

    const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
    embedUrl.searchParams.set("rel", "0");
    embedUrl.searchParams.set("playsinline", "1");
    return embedUrl.toString();
  } catch {
    return url;
  }
};

const CATEGORY_LABELS = {
  reel: "REEL",
  "full-length": "FULL LENGTH",
} as const;

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isReel = project.category === "reel";
  const instagramReelId = isInstagramUrl(project.videoUrl)
    ? getInstagramReelId(project.videoUrl)
    : null;
  const videoEmbedUrl = isYouTubeUrl(project.videoUrl)
    ? getYouTubeEmbedUrl(project.videoUrl)
    : project.videoUrl;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group relative flex h-full cursor-pointer flex-col"
          data-testid={`card-project-${project.id}`}
        >
          <div
            className={`relative overflow-hidden rounded-[1.25rem] border border-foreground/10 bg-card shadow-lg transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-2xl ${isReel ? "aspect-[9/16]" : "aspect-[16/9]"}`}
          >
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/15 to-black/10 opacity-100 backdrop-blur-[1px] transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.12 }}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md sm:h-16 sm:w-16"
              >
                <Play fill="currentColor" size={24} className="ml-1" />
              </motion.div>
            </div>

            <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-mono tracking-[0.24em] text-white backdrop-blur-md sm:left-4 sm:top-4">
              {CATEGORY_LABELS[project.category]}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 sm:hidden">
              <div className="rounded-2xl border border-white/10 bg-black/45 p-3 backdrop-blur-md">
                <p className="line-clamp-1 text-sm font-display font-bold tracking-wide text-white">
                  {project.title}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/70">
                  Tap to open
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 px-1">
            <h3
              className="text-lg font-display font-bold text-foreground transition-colors group-hover:text-primary"
              data-testid={`text-title-${project.id}`}
            >
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent dark:bg-accent/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent
        showClose={false}
        className={`left-1/2 top-1/2 w-[100vw] max-w-none translate-x-[-50%] translate-y-[-50%] overflow-hidden border-0 bg-transparent p-0 shadow-none sm:w-[min(96vw,1120px)] ${isReel ? "sm:max-h-[92vh]" : "sm:max-h-[90vh]"}`}
      >
        <div
          className={`relative overflow-hidden bg-neutral-950 text-white sm:rounded-[1.75rem] ${isReel ? "flex h-[100dvh] flex-col sm:h-auto sm:grid sm:grid-cols-[minmax(0,1fr)_380px]" : "flex h-[100dvh] flex-col sm:h-auto"}`}
        >
          <DialogClose className="absolute right-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/65 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-0 sm:right-5 sm:top-5">
            <X size={18} />
            <span className="sr-only">Close viewer</span>
          </DialogClose>

          <div
            className={`relative flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(0,0,0,0.45))] ${isReel ? "min-h-0 flex-1 px-3 pb-3 pt-16 sm:p-6" : "px-3 pb-3 pt-16 sm:p-6"}`}
          >
            <div
              className={`relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${isReel ? "mx-auto aspect-[9/16] max-h-full max-w-[min(100%,420px)] sm:max-h-[calc(92vh-3rem)]" : "aspect-video"}`}
            >
              {instagramReelId ? (
                <div className="h-full w-full overflow-hidden bg-black">
                  <iframe
                    src={`https://www.instagram.com/reel/${instagramReelId}/embed/`}
                    title={`${project.title} Instagram reel`}
                    className="h-full w-full"
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    scrolling="no"
                    style={{ background: "#000" }}
                  />
                </div>
              ) : isGoogleDriveUrl(project.videoUrl) ? (
                <div className="h-full w-full bg-black">
                  <iframe
                    src={videoEmbedUrl}
                    title={project.title}
                    className="h-full w-full"
                    frameBorder="0"
                    allow="autoplay"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="h-full w-full bg-black">
                  <iframe
                    src={videoEmbedUrl}
                    title={project.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>

          <div
            className={`relative min-h-0 bg-[linear-gradient(180deg,_rgba(16,16,16,0.96),_rgba(6,6,6,0.98))] ${isReel ? "max-h-[42dvh] overflow-y-auto border-t border-white/10 px-4 pb-8 pt-5 sm:max-h-none sm:border-l sm:border-t-0 sm:px-7 sm:pb-7 sm:pt-20" : "overflow-y-auto border-t border-white/10 px-4 pb-8 pt-5 sm:px-7 sm:pb-7 sm:pt-7"}`}
          >
            <div className="mx-auto max-w-2xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono tracking-[0.24em] text-white/80">
                  {CATEGORY_LABELS[project.category]}
                </span>
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Open Original
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <h2 className="text-2xl font-display font-bold leading-tight text-white sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
