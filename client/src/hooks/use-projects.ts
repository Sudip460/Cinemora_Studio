import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useProjects(category?: 'reel' | 'full-length') {
  return useQuery({
    queryKey: [api.projects.list.path, category],
    queryFn: async () => {
      const url = category 
        ? `${api.projects.list.path}?category=${category}` 
        : api.projects.list.path;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}
