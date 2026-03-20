import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Interleaves two arrays in strict alternating sequence
 * Pattern: arr1[0], arr2[0], arr1[1], arr2[1], arr1[2], arr2[2], ...
 * 
 * If arrays are unequal length, remaining items are appended at the end.
 * Time Complexity: O(n) where n = arr1.length + arr2.length
 * 
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns New interleaved array (original arrays unchanged)
 */
export function interleave<T>(arr1: T[], arr2: T[]): T[] {
  const result: T[] = [];
  const minLength = Math.min(arr1.length, arr2.length);

  // Alternate items from both arrays
  for (let i = 0; i < minLength; i++) {
    result.push(arr1[i]);
    result.push(arr2[i]);
  }

  // Append remaining items from the longer array
  if (arr1.length > minLength) {
    result.push(...arr1.slice(minLength));
  } else if (arr2.length > minLength) {
    result.push(...arr2.slice(minLength));
  }

  return result;
}
