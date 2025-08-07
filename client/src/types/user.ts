import type { BaseEntity } from "./common";

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "teacher" | "student";
  isActive: boolean;
}
