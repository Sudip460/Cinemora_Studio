import { projectsData } from "@shared/data";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const category = req.query.category;
  const selectedCategory = Array.isArray(category) ? category[0] : category;

  const filteredProjects =
    selectedCategory === "reel" || selectedCategory === "full-length"
      ? projectsData.filter((project) => project.category === selectedCategory)
      : projectsData;

  return res.status(200).json(filteredProjects);
}
