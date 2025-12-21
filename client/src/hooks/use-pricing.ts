import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function usePricing() {
  return useQuery({
    queryKey: [api.pricing.list.path],
    queryFn: async () => {
      const res = await fetch(api.pricing.list.path);
      if (!res.ok) throw new Error("Failed to fetch pricing");
      return api.pricing.list.responses[200].parse(await res.json());
    },
  });
}
