import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;
if (process.env.NODE_ENV !== "production") {
  console.log("Creating prisma client for dev environment");
  if (!global.prisma) {
    console.log("initialising global prisma client for dev");
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  console.log("Creating prisma client for production environment");
  prisma = new PrismaClient();
}
export default prisma;
