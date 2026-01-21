/**
 * Utility function to merge className strings
 * Simple version that combines class names and filters out empty strings
 * 
 * For more advanced merging (handling Tailwind conflicts), install:
 * npm install clsx tailwind-merge
 * Then use: twMerge(clsx(...inputs))
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
    return inputs
        .filter(Boolean)
        .join(" ")
        .trim();
}
