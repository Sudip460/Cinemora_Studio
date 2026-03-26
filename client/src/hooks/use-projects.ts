import { useQuery } from "@tanstack/react-query";
import { projectsData } from "@shared/data";
import { api } from "@shared/routes";

export function useProjects(category?: 'reel' | 'full-length') {
  return useQuery({
    queryKey: [api.projects.list.path, category],
    queryFn: async () => {
      const url = category 
        ? `${api.projects.list.path}?category=${category}` 
        : api.projects.list.path;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }

        return api.projects.list.responses[200].parse(await res.json());
      } catch (error) {
        console.warn("Falling back to bundled project data", error);
        return category
          ? projectsData.filter((project) => project.category === category)
          : projectsData;
      }
    },
  });
}
