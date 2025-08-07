import { describe, it, expect, beforeEach, vi } from "vitest";
import { apiService, ApiError } from "../api.service";

describe("ApiService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should make GET requests correctly", async () => {
    const mockData = { id: 1, name: "test" };
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiService.get("/test");
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/test", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });
  });

  it("should make POST requests correctly", async () => {
    const mockData = { id: 1, name: "test" };
    const postData = { name: "test" };
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiService.post("/test", postData);
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/test", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(postData),
    });
  });

  it("should make PUT requests correctly", async () => {
    const mockData = { id: 1, name: "updated" };
    const putData = { name: "updated" };
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiService.put("/test/1", putData);
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/test/1", {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(putData),
    });
  });

  it("should make DELETE requests correctly", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const result = await apiService.delete("/test/1");
    expect(result).toEqual({});
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/test/1", {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
  });

  it("should handle HTTP errors correctly", async () => {
    const errorResponse = { message: "Not found" };
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: async () => errorResponse,
    });

    try {
      await apiService.get("/test");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).message).toBe("Not found");
    }
  });

  it("should handle network errors correctly", async () => {
    globalThis.fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error("Network error"));

    try {
      await apiService.get("/test");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).message).toBe("Network error");
    }
  });

  it("should handle non-JSON error responses", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: async () => {
        throw new Error("Invalid JSON");
      },
    });

    await expect(apiService.get("/test")).rejects.toThrow(
      "HTTP 500: Internal Server Error"
    );
  });

  it("should create ApiError with correct properties", () => {
    const error = new ApiError("Test error", 404, { details: "test" });

    expect(error.message).toBe("Test error");
    expect(error.status).toBe(404);
    expect(error.response).toEqual({ details: "test" });
    expect(error.name).toBe("ApiError");
    expect(error instanceof Error).toBe(true);
  });

  it("should handle POST requests without body", async () => {
    const mockData = { success: true };
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiService.post("/test");
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/test", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: undefined,
    });
  });
});
