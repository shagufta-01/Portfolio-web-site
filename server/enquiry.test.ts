import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock database functions
vi.mock("./db", () => ({
  getAllEnquiries: vi.fn(),
  getEnquiryById: vi.fn(),
  createEnquiry: vi.fn(),
  updateEnquiry: vi.fn(),
  deleteEnquiry: vi.fn(),
}));

import * as db from "./db";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("enquiry procedures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("enquiry.list", () => {
    it("returns all enquiries", async () => {
      const mockEnquiries = [
        {
          id: 1,
          clientName: "John Doe",
          projectName: "Website Redesign",
          phoneNumber: "1234567890",
          projectDescription: "Need a new website design",
          budget: "$5000-$10000",
          relevantLinks: null,
          status: "new" as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(db.getAllEnquiries).mockResolvedValue(mockEnquiries);

      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.enquiry.list();

      expect(result).toEqual(mockEnquiries);
      expect(db.getAllEnquiries).toHaveBeenCalled();
    });
  });

  describe("enquiry.getById", () => {
    it("returns an enquiry by id", async () => {
      const mockEnquiry = {
        id: 1,
        clientName: "John Doe",
        projectName: "Website Redesign",
        phoneNumber: "1234567890",
        projectDescription: "Need a new website design",
        budget: "$5000-$10000",
        relevantLinks: null,
        status: "new" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(db.getEnquiryById).mockResolvedValue(mockEnquiry);

      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.enquiry.getById({ id: 1 });

      expect(result).toEqual(mockEnquiry);
      expect(db.getEnquiryById).toHaveBeenCalledWith(1);
    });

    it("throws NOT_FOUND when enquiry does not exist", async () => {
      vi.mocked(db.getEnquiryById).mockResolvedValue(undefined);

      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.enquiry.getById({ id: 999 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("NOT_FOUND");
      }
    });
  });

  describe("enquiry.create", () => {
    it("creates a new enquiry with valid input", async () => {
      const input = {
        clientName: "Jane Smith",
        projectName: "Mobile App",
        phoneNumber: "9876543210",
        projectDescription: "I need a mobile app for my business",
        budget: "$20000-$30000",
        relevantLinks: "https://example.com",
      };

      const mockCreatedEnquiry = {
        id: 2,
        ...input,
        status: "new" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(db.createEnquiry).mockResolvedValue(mockCreatedEnquiry);

      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.enquiry.create(input);

      expect(result).toEqual(mockCreatedEnquiry);
      expect(db.createEnquiry).toHaveBeenCalled();
    });

    it("validates required fields", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.enquiry.create({
          clientName: "",
          projectName: "Test",
          phoneNumber: "123",
          projectDescription: "Short",
          budget: "1000",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.code).toBe("BAD_REQUEST");
      }
    });

    it("validates minimum description length", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.enquiry.create({
          clientName: "Test",
          projectName: "Test",
          phoneNumber: "123",
          projectDescription: "Short",
          budget: "1000",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.code).toBe("BAD_REQUEST");
      }
    });
  });

  describe("enquiry.update", () => {
    it("updates an enquiry with valid input", async () => {
      const updateData = {
        id: 1,
        status: "reviewed" as const,
      };

      const mockUpdatedEnquiry = {
        id: 1,
        clientName: "John Doe",
        projectName: "Website Redesign",
        phoneNumber: "1234567890",
        projectDescription: "Need a new website design",
        budget: "$5000-$10000",
        relevantLinks: null,
        status: "reviewed" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(db.updateEnquiry).mockResolvedValue(mockUpdatedEnquiry);

      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.enquiry.update(updateData);

      expect(result).toEqual(mockUpdatedEnquiry);
      expect(db.updateEnquiry).toHaveBeenCalledWith(1, { status: "reviewed" });
    });
  });

  describe("enquiry.delete", () => {
    it("deletes an enquiry", async () => {
      vi.mocked(db.deleteEnquiry).mockResolvedValue(true);

      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.enquiry.delete({ id: 1 });

      expect(result).toEqual({ success: true });
      expect(db.deleteEnquiry).toHaveBeenCalledWith(1);
    });
  });
});
