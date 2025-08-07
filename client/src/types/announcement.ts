import type { BaseEntity } from "./common";

export interface Announcement extends BaseEntity {
  title: string;
  content: string;
  createdBy: string;
  postedAt: string;
}
