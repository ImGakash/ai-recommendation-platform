import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Create the PostgreSQL connection pool using your .env DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Pass the pool to the Prisma PostgreSQL adapter
const adapter = new PrismaPg(pool);

// Initialize PrismaClient with the driver adapter
const prisma = new PrismaClient({ adapter });

export default prisma;