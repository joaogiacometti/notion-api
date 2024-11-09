import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify/types/instance";
import { Campaign, StructuredCampaign } from "@/types/campaign";
import { mapRowToStructuredCampaign } from "@/utils/mapUtils";
import { z } from "zod";
import { queryCampaignById } from "@/utils/notionsQueries";

export async function GetById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/campaigns/get-by-id",
    {
      schema: {
        tags: ["Campaigns"],
        summary: "Get Campaign by ID",
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

      // @ts-ignore
      const rows = campaign.properties as Campaign;

      const campaignProperties: StructuredCampaign =
        mapRowToStructuredCampaign(rows);

      reply.send(campaignProperties);
    }
  );
}
