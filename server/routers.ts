import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createEnquiry, getAllEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry } from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  enquiry: router({
    list: publicProcedure.query(async () => {
      return await getAllEnquiries();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const enquiry = await getEnquiryById(input.id);
        if (!enquiry) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Enquiry not found",
          });
        }
        return enquiry;
      }),

    create: publicProcedure
      .input(
        z.object({
          clientName: z.string().min(1, "Client name is required").max(255),
          projectName: z.string().min(1, "Project name is required").max(255),
          phoneNumber: z.string().min(1, "Phone number is required").max(20),
          projectDescription: z.string().min(10, "Description must be at least 10 characters"),
          budget: z.string().min(1, "Budget is required").max(100),
          relevantLinks: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const enquiry = await createEnquiry({
            clientName: input.clientName,
            projectName: input.projectName,
            phoneNumber: input.phoneNumber,
            projectDescription: input.projectDescription,
            budget: input.budget,
            relevantLinks: input.relevantLinks || null,
            status: "new",
          });
          return enquiry;
        } catch (error) {
          console.error("Error creating enquiry:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create enquiry",
          });
        }
      }),

    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          clientName: z.string().max(255).optional(),
          projectName: z.string().max(255).optional(),
          phoneNumber: z.string().max(20).optional(),
          projectDescription: z.string().optional(),
          budget: z.string().max(100).optional(),
          relevantLinks: z.string().optional(),
          status: z.enum(["new", "reviewed", "in-progress", "completed"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        try {
          const enquiry = await updateEnquiry(id, data);
          return enquiry;
        } catch (error) {
          console.error("Error updating enquiry:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update enquiry",
          });
        }
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        try {
          await deleteEnquiry(input.id);
          return { success: true };
        } catch (error) {
          console.error("Error deleting enquiry:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete enquiry",
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
