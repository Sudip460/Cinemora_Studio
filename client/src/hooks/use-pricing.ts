import { useQuery } from "@tanstack/react-query";
import { pricingData } from "@shared/data";
import { api } from "@shared/routes";

export function usePricing() {
  return useQuery({
    queryKey: [api.pricing.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.pricing.list.path);
        if (!res.ok) {
          throw new Error(`Failed to fetch pricing: ${res.status}`);
        }

        return api.pricing.list.responses[200].parse(await res.json());
      } catch (error) {
        console.warn("Falling back to bundled pricing data", error);
        return pricingData;
      }
    },
  });
}
