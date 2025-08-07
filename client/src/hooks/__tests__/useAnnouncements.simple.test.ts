import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAnnouncements } from "../useAnnouncements";

// Mock the announcement service
vi.mock("../../services/announcement.service", () => ({
  announcementService: {
    getAllAnnouncements: vi.fn(),
  },
}));

describe("useAnnouncements", () => {
  it("should return initial state", () => {
    const { result } = renderHook(() => useAnnouncements());

    expect(result.current.announcements).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("should return the expected properties", () => {
    const { result } = renderHook(() => useAnnouncements());

    expect(result.current).toHaveProperty("announcements");
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("error");
  });
});
