import { z } from "zod";

const cardSchema = z.object({
  id: z.number(),
  name: z.string(),
  desc: z.string(),
  card_images: z.array(
    z.object({
      id: z.number(),
      image_url: z.string(),
      image_url_small: z.string(),
      image_url_cropped: z.string(),
    })
  ),
});

export const cardsResponseSchema = z.object({
  data: z.array(cardSchema),
  meta: z
    .object({
      total_rows: z.number(),
    })
    .optional(),
});

export type FetchCardsParams = {
  page: number;
  pageSize: number;
  search: string;
};

export type CardType = z.infer<typeof cardSchema>;
