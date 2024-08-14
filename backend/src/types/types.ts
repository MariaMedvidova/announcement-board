export interface Category {
  id: number;
  name: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  publicationDate: string;
  updatedAt: string;
  categoryIds: number[];
  categories?: Category[];
}

export interface AnnouncementCreateRequest {
  title: string;
  content: string;
  publicationDate: string;
  categoryIds: number[];
}

export interface PaginatedAnnouncements {
  announcements: Announcement[];
  pagination: {
    totalCount: number;
    totalPages: number;
  };
}
