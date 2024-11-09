import { StructuredCampaign } from "@/types/campaign";

export function mapRowToStructuredCampaign(row: any): StructuredCampaign {
  return {
    ID: row.ID.unique_id.number,
    Company: row.Company.title[0]?.text.content,
    Campaign: row.Campaign.rich_text[0]?.text.content,
    Description: row.Description.rich_text[0]?.text.content,
    PlannedDate: row.PlannedDate.date?.start,
    Where: row.Where.rich_text[0]?.text.content,
    Language: row.Language.select?.name,
    Content: row.Content.rich_text[0]?.text.content,
    ImageContent: row["image content"].rich_text[0]?.text.content,
    Image: row.Image.files[0]?.external.url,
  };
}

export function mapDataToCampaignProperties(data: any) {
  return {
    Company: data.Company
      ? { title: [{ text: { content: data.Company } }] }
      : undefined,
    Campaign: data.Campaign
      ? { rich_text: [{ text: { content: data.Campaign } }] }
      : undefined,
    Description: data.Description
      ? { rich_text: [{ text: { content: data.Description } }] }
      : undefined,
    PlannedDate: data.PlannedDate
      ? { date: { start: new Date(data.PlannedDate).toISOString() } }
      : undefined,
    Where: data.Where
      ? { rich_text: [{ text: { content: data.Where } }] }
      : undefined,
    Language: data.Language ? { select: { name: data.Language } } : undefined,
    Content: data.Content
      ? { rich_text: [{ text: { content: data.Content } }] }
      : undefined,
    "image content": data.ImageContent
      ? { rich_text: [{ text: { content: data.ImageContent } }] }
      : undefined,
    Image: data.Image
      ? { files: [{ external: { url: data.Image }, name: "Image" }] }
      : undefined,
  };
}
