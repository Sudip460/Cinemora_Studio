import type { Project } from "@shared/schema";

export const MOBILE_BREAKPOINT = 600;
export const DESKTOP_BREAKPOINT = 1024;

export type FeaturedWorkLayout = "desktop" | "tablet" | "mobile";
type ProjectCategory = Project["category"];

function getNextProject(
  preferredCategory: ProjectCategory,
  reels: Project[],
  fulls: Project[],
  reelIndexRef: { current: number },
  fullIndexRef: { current: number },
): Project | null {
  if (preferredCategory === "reel") {
    if (reelIndexRef.current < reels.length) {
      return reels[reelIndexRef.current++];
    }

    if (fullIndexRef.current < fulls.length) {
      return fulls[fullIndexRef.current++];
    }

    return null;
  }

  if (fullIndexRef.current < fulls.length) {
    return fulls[fullIndexRef.current++];
  }

  if (reelIndexRef.current < reels.length) {
    return reels[reelIndexRef.current++];
  }

  return null;
}

function toggleCategory(category: ProjectCategory): ProjectCategory {
  return category === "reel" ? "full-length" : "reel";
}

function distributeProjects(
  reels: Project[],
  fulls: Project[],
  startingCategories: ProjectCategory[],
): Project[][] {
  const columns: Project[][] = startingCategories.map(() => []);
  const nextCategories = [...startingCategories];
  const reelIndexRef = { current: 0 };
  const fullIndexRef = { current: 0 };

  while (reelIndexRef.current < reels.length || fullIndexRef.current < fulls.length) {
    let placedInRound = false;

    for (let columnIndex = 0; columnIndex < columns.length; columnIndex += 1) {
      const project = getNextProject(
        nextCategories[columnIndex],
        reels,
        fulls,
        reelIndexRef,
        fullIndexRef,
      );

      if (!project) {
        continue;
      }

      columns[columnIndex].push(project);
      nextCategories[columnIndex] = toggleCategory(project.category);
      placedInRound = true;
    }

    if (!placedInRound) {
      break;
    }
  }

  return columns.filter((column) => column.length > 0);
}

export function getFeaturedWorkLayout(viewportWidth: number): FeaturedWorkLayout {
  if (viewportWidth >= DESKTOP_BREAKPOINT) {
    return "desktop";
  }

  if (viewportWidth >= MOBILE_BREAKPOINT) {
    return "tablet";
  }

  return "mobile";
}

export function distributeFeaturedProjects(
  reels: Project[],
  fulls: Project[],
  layout: FeaturedWorkLayout,
): Project[][] {
  if (layout === "desktop") {
    return distributeProjects(reels, fulls, ["reel", "full-length", "reel"]);
  }

  if (layout === "tablet") {
    return distributeProjects(reels, fulls, ["reel", "full-length"]);
  }

  return distributeProjects(reels, fulls, ["reel"]);
}
