import { z } from 'zod';

export const announcementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  publicationDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  categoryIds: z.array(z.number().positive().int()).nonempty("Category IDs cannot be empty"),
});
