export interface Entity {
  id: number;
  documentId: string | number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt?: string | null; // ISO date string or null
}

export interface Component<T extends string> {
    id: number;
    __component: T;
}