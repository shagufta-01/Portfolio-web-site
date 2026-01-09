/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

export type Enquiry = {
  id: number;
  clientName: string;
  projectName: string;
  phoneNumber: string;
  projectDescription: string;
  budget: string;
  relevantLinks: string | null;
  status: "new" | "reviewed" | "in-progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
};
