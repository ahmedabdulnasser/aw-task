import { apiService } from "./api.service";
import type { User } from "../types/user";

export const userService = {
  async getAllUsers(): Promise<User[]> {
    return apiService.get<User[]>("/users");
  },

  async getUserById(id: string): Promise<User> {
    return apiService.get<User>(`/users/${id}`);
  },

  async createUser(
    user: Omit<User, "_id" | "createdAt" | "updatedAt" | "__v">
  ): Promise<User> {
    return apiService.post<User>("/users", user);
  },

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    return apiService.put<User>(`/users/${id}`, user);
  },

  async deleteUser(id: string): Promise<void> {
    return apiService.delete<void>(`/users/${id}`);
  },
};
