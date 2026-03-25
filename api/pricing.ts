import { pricingData } from "@shared/data";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const category = req.query.category;
  const selectedCategory = Array.isArray(category) ? category[0] : category;

  const filteredPricing =
    selectedCategory === "reel" || selectedCategory === "full-length"
      ? pricingData.filter((item) => item.category === selectedCategory)
      : pricingData;

  return res.status(200).json(filteredPricing);
}
