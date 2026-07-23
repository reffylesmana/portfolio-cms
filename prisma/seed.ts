import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { passwordUtils } from "@/utils/password";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  const existingAdmin = await prisma.admin.findUnique({
    where: {
      username: "admin",
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  const hashedPassword = await passwordUtils.hash("admin123");

  await prisma.admin.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log("Admin created successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });