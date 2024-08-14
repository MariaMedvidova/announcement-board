export interface Category {
  id: number;
  name: string;
}

export interface Announcement {
  id: number;
  title: string;
  publicationDate: string;
  updatedAt: string;
  categories: Category[];
  content: string;
}

export interface DbAnnouncement {
  id: number;
  title: string;
  publicationDate: string;
  updatedAt: string;
  categoryIds: number[];
  content: string;
}

export interface CategorySelect {
  value: string;
  label: string;
}
