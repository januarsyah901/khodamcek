import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import "dotenv/config";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

try {
  const connectionString = (process.env.DATABASE_URL || "file:./dev.db").trim();
  console.log(`[PRISMA INIT] Attempting with URL: "${connectionString}"`);
  
  const adapter = new PrismaLibSql({
    url: connectionString,
  });

  prismaInstance = new PrismaClient({ adapter });
} catch (e) {
  console.error(`[PRISMA INIT ERROR] Failed to initialize Prisma:`, e);
  throw e;
}

export const prisma = globalForPrisma.prisma ?? prismaInstance;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
