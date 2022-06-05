import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
if (process.env.NODE_ENV !== "production") {
  console.log("Creating prisma client for dev environment");
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      debug: true,
    });
  }
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
}
export default prisma;
