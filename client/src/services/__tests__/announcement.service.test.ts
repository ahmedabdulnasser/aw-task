import { describe, it, expect, beforeEach, vi } from "vitest";
import { announcementService } from "../announcement.service";

const mockAnnouncements = [
  {
    _id: "1",
    title: "Test Announcement",
    content: "Test content",
    createdBy: "user1",
    postedAt: "2025-08-07T10:00:00.000Z",
    createdAt: "2025-08-07T10:00:00.000Z",
    updatedAt: "2025-08-07T10:00:00.000Z",
    __v: 0,
  },
];

describe("announcementService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch all announcements", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockAnnouncements,
    });

    const result = await announcementService.getAllAnnouncements();
    expect(result).toEqual(mockAnnouncements);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/announcements",
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      }
    );
  });

  it("should handle fetch errors", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: async () => ({ message: "Not found" }),
    });

    await expect(announcementService.getAllAnnouncements()).rejects.toThrow(
      "Not found"
    );
  });

  it("should fetch announcement by id", async () => {
    const mockAnnouncement = mockAnnouncements[0];
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockAnnouncement,
    });

    const result = await announcementService.getAnnouncementById("1");
    expect(result).toEqual(mockAnnouncement);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/announcements/1",
      {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      }
    );
  });

  it("should create announcement", async () => {
    const newAnnouncement = {
      title: "New Announcement",
      content: "New content",
      createdBy: "user1",
      postedAt: "2025-08-07T10:00:00.000Z",
    };
    const createdAnnouncement = {
      ...newAnnouncement,
      _id: "2",
      createdAt: "2025-08-07T10:00:00.000Z",
      updatedAt: "2025-08-07T10:00:00.000Z",
      __v: 0,
    };

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => createdAnnouncement,
    });

    const result = await announcementService.createAnnouncement(
      newAnnouncement
    );
    expect(result).toEqual(createdAnnouncement);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/announcements",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(newAnnouncement),
      }
    );
  });

  it("should update announcement", async () => {
    const updateData = { title: "Updated Title" };
    const updatedAnnouncement = { ...mockAnnouncements[0], ...updateData };

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => updatedAnnouncement,
    });

    const result = await announcementService.updateAnnouncement(
      "1",
      updateData
    );
    expect(result).toEqual(updatedAnnouncement);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/announcements/1",
      {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(updateData),
      }
    );
  });

  it("should delete announcement", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await announcementService.deleteAnnouncement("1");
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/announcements/1",
      {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      }
    );
  });
});
