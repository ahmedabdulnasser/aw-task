import { describe, it, expect, vi, beforeEach } from "vitest";
import { announcementService } from "../announcement.service";

// Mock the API service
vi.mock("../api.service", () => ({
  apiService: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("AnnouncementService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have getAllAnnouncements method", () => {
    expect(typeof announcementService.getAllAnnouncements).toBe("function");
  });

  it("should have getAnnouncementById method", () => {
    expect(typeof announcementService.getAnnouncementById).toBe("function");
  });

  it("should have createAnnouncement method", () => {
    expect(typeof announcementService.createAnnouncement).toBe("function");
  });

  it("should have updateAnnouncement method", () => {
    expect(typeof announcementService.updateAnnouncement).toBe("function");
  });

  it("should have deleteAnnouncement method", () => {
    expect(typeof announcementService.deleteAnnouncement).toBe("function");
  });
});
