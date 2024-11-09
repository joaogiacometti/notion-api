import { env } from "@/env";
import { Client } from "@notionhq/client";

export function GetNotionClientInstance() {
  return new Client({ auth: env.NOTION_API_KEY });
}
