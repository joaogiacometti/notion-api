import { z } from "zod";

const isFutureOrPresentDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

export const CampaignSchema = z.object({
  ID: z.object({
    id: z.string(),
    unique_id: z.object({
      number: z.number(),
    }),
  }),
  Company: z.object({
    id: z.string(),
    title: z.object({
      text: z.object({
        content: z.string(),
      }),
    }),
  }),
  Campaign: z.object({
    id: z.string(),
    rich_text: z.object({
      text: z.object({
        content: z.string(),
      }),
    }),
  }),
  Description: z.object({
    id: z.string(),
    rich_text: z.object({
      text: z.object({
        content: z.string(),
      }),
    }),
  }),
  PlannedDate: z.object({
    id: z.string(),
    date: z.object({
      start: z.coerce.date(),
    }),
  }),
  Where: z.object({
    id: z.string(),
    rich_text: z.object({
      text: z.object({
        content: z.string(),
      }),
    }),
  }),
  Language: z.object({
    id: z.string(),
    select: z.object({
      name: z.string(),
    }),
  }),
  Content: z.object({
    id: z.string(),
    rich_text: z.object({
      text: z.object({
        content: z.string(),
      }),
    }),
  }),
  "image content": z.object({
    id: z.string(),
    rich_text: z.object({
      text: z.object({
        content: z.string(),
      }),
    }),
  }),
  Image: z.object({
    id: z.string(),
    files: z.object({
      external: z.object({
        url: z.string(),
      }),
    }),
  }),
});

export const StructuredCampaignSchema = z.object({
  ID: z.number(),
  Company: z.string(),
  Campaign: z.string(),
  Description: z.string(),
  PlannedDate: z.coerce.date(),
  Where: z.string(),
  Language: z.string(),
  Content: z.string(),
  ImageContent: z.string(),
  Image: z.string(),
});

export const CampaignSchemaInput = z.object({
  Company: z.string().min(1, { message: "Company cannot be empty" }),
  Campaign: z.string().min(1, { message: "Campaign cannot be empty" }),
  Description: z.string().min(1, { message: "Description cannot be empty" }),
  PlannedDate: z.coerce.date().refine(isFutureOrPresentDate, {
    message: "PlannedDate must be a future date",
  }),
  Where: z.string().min(1, { message: "Where cannot be empty" }),
  Language: z.string().min(1, { message: "Language cannot be empty" }),
  Content: z.string().min(1, { message: "Content cannot be empty" }),
  ImageContent: z.string().min(1, { message: "ImageContent cannot be empty" }),
  Image: z.string().url({ message: "Image must be a valid URL" }),
});

export type Campaign = z.infer<typeof CampaignSchema>;
export type StructuredCampaign = z.infer<typeof StructuredCampaignSchema>;
