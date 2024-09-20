import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "rbrgs/server/api/trpc";

export const linkRouter = createTRPCRouter({
  createLink: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        short: z.string().min(1).max(255),
        url: z.string().min(1).url(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.roboLink.create({
        data: {
          name: input.name,
          short: input.short,
          url: input.url,
          description: input.description,
          createdById: ctx.session.user.id,
          lastUpdatedById: ctx.session.user.id,
        },
      });
    }),
  getLinks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.roboLink.findMany({
      orderBy: { updatedAt: "desc" },
      include: { lasltyUpdatedBy: true, createdBy: true },
    });
  }),
  fastGetLink: publicProcedure
    .input(z.object({ short: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.roboLink.findFirstOrThrow({
        where: { short: input.short },
        select: { url: true },
      });
    }),
  updateLink: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(255),
        short: z.string().min(1).max(255),
        url: z.string().min(1).url(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.roboLink.update({
        where: { id: input.id },
        data: {
          name: input.name,
          short: input.short,
          url: input.url,
          description: input.description,
          lastUpdatedById: ctx.session.user.id,
        },
      });
    }),
});
