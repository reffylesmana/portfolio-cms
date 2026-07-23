import { prisma } from "@/lib/prisma";

export const adminRepository = {
  async findByUsername(username: string) {
    return prisma.admin.findUnique({
      where: {
        username,
      },
    });
  },

  async findById(id: string) {
    return prisma.admin.findUnique({
      where: {
        id,
      },
    });
  },
};