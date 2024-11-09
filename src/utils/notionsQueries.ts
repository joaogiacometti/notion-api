import { env } from "@/env";
import { GetNotionClientInstance } from "@/http/routes/notionClient";

const notion = GetNotionClientInstance();

export async function queryCampaignById(id: number) {
  const query = await notion.databases.query({
    database_id: env.DATABASE_ID,
    filter: {
      property: "ID",
      unique_id: {
        equals: id,
      },
    },
    page_size: 1,
  });

  return query.results[0];
}
