import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.NODE_ENV === "production" ? process.env.DATABASE_URL_PRODUCTION + "/" + process.env.DATABASE_NAME : process.env.DATABASE_URL_DEVELOPMENT + "/" + process.env.DATABASE_NAME}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };