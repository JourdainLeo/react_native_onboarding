import axios from "axios";
import {
  CardType,
  cardsResponseSchema,
  FetchCardsParams,
} from "../schemas/cards";

export const fetchCardsConnector = async ({
  page,
  pageSize,
  search,
}: FetchCardsParams): Promise<CardType[]> => {
  const query = search ? `&fname=${encodeURIComponent(search)}` : "";
  const res = await axios.get(
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${pageSize}&offset=${
      page * pageSize
    }${query}`
  );

  const validated = cardsResponseSchema.parse(res.data);

  const adapter = validated.data.map((card) => ({
    ...card,
  }));

  return adapter;
};
