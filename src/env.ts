import { z } from "zod";

const envSchema = z.object({
  NOTION_API_KEY: z.string().min(1, "api key is required!"),
  DATABASE_ID: z.string().min(1, "database id is required!"),
});

export const env = envSchema.parse(process.env);
