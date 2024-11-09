import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify/types/instance";
import { CampaignSchemaInput } from "@/types/campaign";
import { env } from "@/env";
import { mapDataToCampaignProperties } from "@/utils/mapUtils";
import { GetNotionClientInstance } from "../notionClient";

const notion = GetNotionClientInstance();

export async function createCampaign(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/campaigns",
    {
      schema: {
        tags: ["Campaigns"],
        summary: "Create a new campaign",
        body: CampaignSchemaInput,
      },
    },
    async (request, reply) => {
      try {
        await notion.pages.create({
          parent: {
            database_id: env.DATABASE_ID,
          },
          properties: mapDataToCampaignProperties(request.body),
        });

        reply.status(201).send("Campaign created successfully");
      } catch (error) {
        reply
          .status(500)
          .send({ error: "An error occurred while creating the campaign." });
      }
    }
  );
}
