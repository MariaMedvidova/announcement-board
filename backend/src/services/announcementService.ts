import db from "../config/db";
import { Announcement, AnnouncementCreateRequest, Category, PaginatedAnnouncements } from "../types/types";

export const getAnnouncements = async (
  page: number,
  limit: number
): Promise<PaginatedAnnouncements> => {
  const announcements = await db("announcements")
    .orderBy("publicationDate", "desc")
    .offset((page - 1) * limit)
    .limit(limit);

  const categories = await db("categories").select("*");
  const categoryMap = new Map<number, { id: number; name: string }>(
    categories.map((category) => [category.id, category])
  );

  const announcementsWithCategories = announcements.map((announcement) => {
    const relatedCategories = announcement.categoryIds
      .map((id: number) => categoryMap.get(id))
      .filter((category: Category) => category !== undefined);

    return {
      id: announcement.id,
      title: announcement.title,
      content: announcement.content,
      publicationDate: announcement.publicationDate,
      categories: relatedCategories,
      updatedAt: announcement.updatedAt,
    } as Announcement;
  });

  const totalCountResult = await db("announcements")
    .count("* as count")
    .first();
  const totalCount = totalCountResult?.count
    ? parseInt(totalCountResult.count as string, 10)
    : 0;

  return {
    announcements: announcementsWithCategories,
    pagination: {
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};

export const createAnnouncement = async (data: AnnouncementCreateRequest) => {
  const { title, content, publicationDate, categoryIds } = data;

  const existingCategories = await db("categories")
    .whereIn("id", categoryIds)
    .select("id");
  const existingCategoryIds = existingCategories.map((category) => category.id);
  const invalidCategoryIds = categoryIds.filter(
    (id) => !existingCategoryIds.includes(id)
  );

  if (invalidCategoryIds.length > 0) {
    throw new Error(`Invalid category IDs: ${invalidCategoryIds.join(", ")}`);
  }

  const [newAnnouncement] = await db("announcements")
    .insert({
      title,
      content,
      publicationDate,
      categoryIds,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning("*");

  const relatedCategories = await db("categories")
    .whereIn("id", newAnnouncement.categoryIds)
    .select("id", "name");

  return {
    id: newAnnouncement.id,
    title: newAnnouncement.title,
    content: newAnnouncement.content,
    publicationDate: newAnnouncement.publicationDate,
    categories: relatedCategories,
    updatedAt: newAnnouncement.updatedAt,
  };
};

export const getAnnouncementById = async (id: number) => {
  const announcement = await db("announcements").where({ id }).first();

  if (!announcement) {
    throw new Error("Announcement not found!");
  }

  const relatedCategories = await db("categories")
    .whereIn("id", announcement.categoryIds)
    .select("id", "name");

  return {
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    publicationDate: announcement.publicationDate,
    categories: relatedCategories,
    updatedAt: announcement.updatedAt,
  } as Announcement;
};

export const updateAnnouncement = async (
  id: number,
  data: AnnouncementCreateRequest
) => {
  const { title, content, publicationDate, categoryIds } = data;

  const existingCategories = await db("categories")
    .whereIn("id", categoryIds)
    .select("id");
  const existingCategoryIds = existingCategories.map((category) => category.id);
  const invalidCategoryIds = categoryIds.filter(
    (id) => !existingCategoryIds.includes(id)
  );

  if (invalidCategoryIds.length > 0) {
    throw new Error(`Invalid category IDs: ${invalidCategoryIds.join(", ")}`);
  }

  const [updatedAnnouncement] = await db("announcements")
    .where({ id })
    .update({
      title,
      content,
      publicationDate,
      categoryIds,
      updatedAt: new Date(),
    })
    .returning("*");

  if (!updatedAnnouncement) {
    throw new Error("Announcement not found!");
  }

  const relatedCategories = await db("categories")
    .whereIn("id", updatedAnnouncement.categoryIds)
    .select("id", "name");

  return {
    id: updatedAnnouncement.id,
    title: updatedAnnouncement.title,
    content: updatedAnnouncement.content,
    publicationDate: updatedAnnouncement.publicationDate,
    categories: relatedCategories,
    updatedAt: updatedAnnouncement.updatedAt,
  } as Announcement;
};

export const deleteAnnouncement = async (id: number) => {
  const rowsDeleted = await db("announcements").where({ id }).del();

  if (rowsDeleted === 0) {
    throw new Error("Announcement not found!");
  }

  return { message: "Announcement deleted successfully!" };
};
