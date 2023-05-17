import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import { createInput, toggleInput, updateInput  } from "server/dto/post";

export const postRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    
    const posts = await ctx.prisma.post.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts.map(({ id, title, body, isPublish }) => ({
      id,
      title,
      body,
      isPublish,
    }));
  }),

  create: protectedProcedure.input(createInput).mutation(({ ctx, input }) => {
    const { title, body } = input;

    return ctx.prisma.post.create({
      data: {
        title: title,
        body: body,
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),

  toggle: protectedProcedure.input(toggleInput).mutation(({ ctx, input }) => {
    const { id, is_publish } = input;
    return ctx.prisma.post.update({
      where: {
        id,
      },
      data: {
        isPublish: is_publish,
      },
    });
  }),

  update: protectedProcedure.input(updateInput).mutation(({ ctx, input }) => {
    const { id, title, body } = input;
    return ctx.prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        body,
      },
    });
  }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.post.delete({
      where: {
        id: input,
      },
    });
  }),
});