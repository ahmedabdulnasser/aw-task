import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useAnnouncements } from "../useAnnouncements";

// Mock the announcement service
vi.mock("../../services", () => ({
  announcementService: {
    getAllAnnouncements: vi.fn(),
  },
}));

describe("useAnnouncements", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return initial state", async () => {
    const { announcementService } = await import("../../services");
    vi.mocked(announcementService.getAllAnnouncements).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useAnnouncements());

    expect(result.current.announcements).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("should load announcements successfully", async () => {
    const mockAnnouncements = [
      {
        _id: "1",
        title: "Test Announcement",
        content: "Test content",
        createdBy: "admin",
        postedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        __v: 0,
      },
    ];

    const { announcementService } = await import("../../services");
    vi.mocked(announcementService.getAllAnnouncements).mockResolvedValue(
      mockAnnouncements
    );

    const { result } = renderHook(() => useAnnouncements());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.announcements).toEqual(mockAnnouncements);
    expect(result.current.error).toBe(null);
  });

  it("should handle errors when loading announcements", async () => {
    const errorMessage = "Failed to fetch announcements";
    const { announcementService } = await import("../../services");
    vi.mocked(announcementService.getAllAnnouncements).mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useAnnouncements());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.announcements).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });
});
