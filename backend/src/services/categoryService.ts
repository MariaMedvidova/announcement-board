import db from "../config/db";
import { Category } from "../types/types";

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const categories = await db("categories").select("id", "name");
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Error fetching categories");
  }
};
