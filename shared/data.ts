import type { Project, ServicePackage } from "./schema";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Lumewo Bold Fashion",
    description: "Dynamic fashion reel showcasing bold styles and vibrant energy.",
    category: "reel",
    videoUrl: "https://drive.google.com/file/d/14yoViPlj5ZNIf2ttMzT2455PAuzEKNZX/preview",
    thumbnailUrl: "/thumbnailss/reel1.png",
    tags: ["Fashion", "Lifestyle", "Trendy"],
  },
  {
    id: 2,
    title: "Indus Battle Royale | The ULTIMATE Face Off!",
    description: "Epic showdown in Indus Battle Royale! Bengal and Punjab are facing off",
    category: "full-length",
    videoUrl: "https://www.youtube.com/embed/eHWZ4gYqRNw?si=fDl4XgV5Iiqszh95",
    thumbnailUrl: "/thumbnailss/vid1.jpeg",
    tags: ["Gaming", "Entertainment", "YouTube"],
  },
  {
    id: 3,
    title: "How to become RICH in your 20s (In Bengali)",
    description: "If you want to see yourself being successful and rich in 20 years, then this video is for you.",
    category: "full-length",
    videoUrl: "https://www.youtube.com/embed/lI9prf38pe8?si=kv6N3GiR7B42SiVu",
    thumbnailUrl: "/thumbnailss/vid2.jpeg",
    tags: ["Finance", "Education", "YouTube"],
  },
  {
    id: 4,
    title: "GunGod - Season 3 Trailer",
    description: "The ultimate showdown is here! Get ready for the most intense season of GunGod yet.",
    category: "full-length",
    videoUrl: "https://drive.google.com/file/d/19UCuwh_2wY6zGjh9M7vC1JgVB1BYwLfb/preview",
    thumbnailUrl: "/thumbnailss/vid3.jpeg",
    tags: ["Gaming", "Trailer", "Commercial"],
  },
  {
    id: 6,
    title: "Ecommerce Mistakes to Avoid",
    description: "Common pitfalls in e-commerce video marketing and how to steer clear of them for success.",
    category: "reel",
    videoUrl: "https://drive.google.com/file/d/10PRqIuIs2RsAUjj-zmg48pgW-IiHvjuX/preview",
    thumbnailUrl: "/thumbnailss/reel2.png",
    tags: ["Commercial", "E-commerce", "Dynamic"],
  },
  {
    id: 7,
    title: "YouTube Shorts Showcase",
    description: "Quick viral moment captured in YouTube Shorts format.",
    category: "reel",
    videoUrl: "https://drive.google.com/file/d/1uFfxom_j5vV1m5yN8Oq1wqsWy2Rirmpu/preview",
    thumbnailUrl: "/thumbnailss/reel3.png",
    tags: ["Commercial", "Corporate", "Clean"],
  },
];

export const serviceData: ServicePackage[] = [
  {
    id: 1,
    name: "Basic Reel",
    description: "Perfect for quick social media updates.",
    category: "reel",
    features: ["Up to 60 seconds", "Advanced Color Grade", "Sound Design & SFX", "2 Revisions"],
  },
  {
    id: 2,
    name: "Pro Reel",
    description: "High-end editing for viral content.",
    category: "reel",
    features: ["Up to 90 seconds", "Advanced customized Color Grade", "Sound Design & SFX", "Motion Graphics", "5 Revisions"],
  },
  {
    id: 3,
    name: "YouTube Standard",
    description: "Essential editing for YouTubers.",
    category: "full-length",
    features: ["Up to 15 minutes", "Basic Color Grade", "Sound Design & SFX", "Background Music", "2 Revisions"],
  },
  {
    id: 4,
    name: "Cinematic Documentary",
    description: "Full production value for serious projects.",
    category: "full-length",
    features: ["Up to 30 minutes", "Cinematic Color Grading", "Advanced Sound Design", "Motion Graphics", "Unlimited Revisions"],
  },
];
