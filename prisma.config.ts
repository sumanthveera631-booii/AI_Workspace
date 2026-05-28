import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "public/prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL!,        // ✅ connection string here
    // shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL, // optional
  },
});
