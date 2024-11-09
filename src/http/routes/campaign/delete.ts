import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify/types/instance";
import { z } from "zod";
import { GetNotionClientInstance } from "../notionClient";
import { queryCampaignById } from "@/utils/notionsQueries";

const notion = GetNotionClientInstance();

export async function Delete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/campaigns",
    {
      schema: {
        tags: ["Campaigns"],
        summary: "Delete Campaign by ID",
        querystring: z.object({
          id: z.preprocess(
            (val) => Number(val),
            z.number({ description: "Campaign ID" }).nonnegative().int()
          ),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.query;

      const campaign = await queryCampaignById(id);

      if (!campaign) reply.status(404).send({ message: "Campaign not found" });

      try {
        await notion.pages.update({
          page_id: campaign.id,
          archived: true,
        });

        reply.send({ message: "Campaign deleted successfully" });
      } catch (error) {
        reply
          .status(500)
          .send({ error: "An error occurred while deleting the campaign" });
      }
    }
  );
}
