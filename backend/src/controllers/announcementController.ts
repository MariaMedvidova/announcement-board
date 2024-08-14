import { Request, Response } from "express";
import {
  getAnnouncements,
  createAnnouncement,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} from "../services/announcementService";
import { announcementSchema } from "../validation/announcementSchema";

export const getAnnouncementsController = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    return res.status(400).json({ message: "Invalid page number" });
  }

  if (isNaN(pageSize) || pageSize < 1) {
    return res.status(400).json({ message: "Invalid limit" });
  }

  try {
    const result = await getAnnouncements(pageNumber, pageSize);
    res.status(200).json({
      announcements: result.announcements,
      pagination: {
        currentPage: pageNumber,
        pageSize: pageSize,
        totalCount: result.pagination.totalCount,
        totalPages: result.pagination.totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Error fetching announcements" });
  }
};

export const createAnnouncementController = async (req: Request, res: Response) => {
  const result = announcementSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.errors.map((e) => e.message).join(", "),
    });
  }

  try {
    const announcement = await createAnnouncement(result.data);
    res.status(201).json(announcement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(400).json({ message: "Error creating announcement" });
  }
};

export const getAnnouncementByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const announcement = await getAnnouncementById(parseInt(id, 10));
    res.status(200).json(announcement);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    res.status(404).json({ message: "Error fetching announcement" });
  }
};

export const updateAnnouncementController = async (req: Request, res: Response) => {
  const result = announcementSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.errors.map((e) => e.message).join(", "),
    });
  }

  const { id } = req.params;

  try {
    const announcement = await updateAnnouncement(parseInt(id, 10), result.data);
    res.status(200).json(announcement);
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(400).json({ message: "Error updating announcement" });
  }
};

export const deleteAnnouncementController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteAnnouncement(parseInt(id, 10));
    res.status(200).json(response);
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(404).json({ message: "Error deleting announcement" });
  }
};
