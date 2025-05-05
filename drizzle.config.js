import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "postgresql",
    schema: "./utils/schema.js",
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_lfr9HxwIRGi5@ep-bitter-lab-a4z5da8s-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
    }
});
