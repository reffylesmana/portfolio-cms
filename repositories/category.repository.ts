import { prisma } from "@/lib/prisma";

export const categoryRepository = {
  findAll() {
    return prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById(id: string) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  },

  findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: {
        slug,
      },
    });
  },

  create(data: {
    name: string;
    slug: string;
  }) {
    return prisma.category.create({
      data,
    });
  },

  update(
    id: string,
    data: {
      name?: string;
      slug?: string;
    }
  ) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  },

  delete(id: string) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  },
};