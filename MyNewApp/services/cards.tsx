import { useState, useEffect } from "react";
import { CardProps } from "../model/card";

type FetchCardsParams = {
  page: number;
  pageSize: number;
  search: string;
};

type UseCardsReturn = {
  cards: CardProps[];
  total: number;
  loading: boolean;
  error: string | null;
};

export const useCards = ({
  page,
  pageSize,
  search,
}: FetchCardsParams): UseCardsReturn => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = search ? `&fname=${encodeURIComponent(search)}` : "";
        const res = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${pageSize}&offset=${
            page * pageSize
          }${query}`
        );
        const json = await res.json();
        setCards(json.data || []);
        setTotal(json.meta?.total_rows ?? json.data?.length ?? 0);
      } catch (err) {
        console.error("Error :", err);
        setCards([]);
        setTotal(0);
        setError("Can't load cards");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [page, pageSize, search]);

  return { cards, total, loading, error };
};
