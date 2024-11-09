import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify/types/instance";
import { CampaignSchemaInput } from "@/types/campaign";
import { mapDataToCampaignProperties } from "@/utils/mapUtils";
import { z } from "zod";
import { GetNotionClientInstance } from "../notionClient";
import { queryCampaignById } from "@/utils/notionsQueries";

const notion = GetNotionClientInstance();

export async function Update(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/campaigns",
    {
      schema: {
        tags: ["Campaigns"],
        summary: "Update Campaign by ID",
        querystring: z.object({
          id: z.preprocess(
            (val) => Number(val),
            z.number({ description: "Campaign ID" }).nonnegative().int()
          ),
        }),
        body: CampaignSchemaInput,
      },
    },
    async (request, reply) => {
      const updateData = request.body;
      const { id } = request.query;

      const campaign = await queryCampaignById(id);

      if (!campaign) reply.status(404).send({ message: "Campaign not found" });

      try {
        await notion.pages.update({
          page_id: campaign.id,
          properties: mapDataToCampaignProperties(updateData),
        });

        reply.send({ message: "Campaign updated successfully" });
      } catch (error) {
        reply
          .status(500)
          .send({ error: "An error occurred while updating the campaign" });
      }
    }
  );
}
