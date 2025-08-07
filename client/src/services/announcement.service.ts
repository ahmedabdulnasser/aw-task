import { apiService } from "./api.service";
import type { Announcement } from "../types/announcement";

export const announcementService = {
  async getAllAnnouncements(): Promise<Announcement[]> {
    return apiService.get<Announcement[]>("/announcements");
  },

  async getAnnouncementById(id: string): Promise<Announcement> {
    return apiService.get<Announcement>(`/announcements/${id}`);
  },

  async createAnnouncement(
    announcement: Omit<Announcement, "_id" | "createdAt" | "updatedAt" | "__v">
  ): Promise<Announcement> {
    return apiService.post<Announcement>("/announcements", announcement);
  },

  async updateAnnouncement(
    id: string,
    announcement: Partial<Announcement>
  ): Promise<Announcement> {
    return apiService.put<Announcement>(`/announcements/${id}`, announcement);
  },

  async deleteAnnouncement(id: string): Promise<void> {
    return apiService.delete<void>(`/announcements/${id}`);
  },
};
