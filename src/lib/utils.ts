import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const NewCategoryThreshold = 7;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNew = (timestamp: number): boolean => {
  const NewCategoryThreshold = 7; // Number of days after which a category should not be considered "new"
  const createdAtDate = new Date(timestamp * 1000);
  const currentDate = new Date();
  const daysSinceCreation = Math.floor(
    (currentDate.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysSinceCreation <= NewCategoryThreshold;
};
