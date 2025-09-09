import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { CardProps } from "../model/card";

type AppState = {
  cards: CardProps[];
  page: number;
  total: number;
  loading: boolean;
  search: string;
  setSearch: (s: string) => void;
  setPage: (p: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

const StoreContext = createContext<AppState | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const pageSize = 50;

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
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
        console.error("Erreur de chargement :", err);
        setCards([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [page, search]);

  const nextPage = () => {
    if ((page + 1) * pageSize < total) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  return (
    <StoreContext.Provider
      value={{
        cards,
        page,
        total,
        loading,
        search,
        setSearch,
        setPage,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
};
