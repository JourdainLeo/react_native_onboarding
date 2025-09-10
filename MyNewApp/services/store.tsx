import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { CardProps } from "../model/card";
import { useCards } from "./cards";

type AppState = {
  cards: CardProps[];
  page: number;
  total: number;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  setPage: (p: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

const StoreContext = createContext<AppState | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 50;

  const { cards, total, loading, error } = useCards({ page, pageSize, search });

  const nextPage = useCallback(() => {
    if ((page + 1) * pageSize < total) setPage((prev) => prev + 1);
  }, [page, total]);

  const prevPage = useCallback(() => {
    if (page > 0) setPage((prev) => prev - 1);
  }, [page]);

  const value = {
    cards,
    page,
    total,
    loading,
    error,
    search,
    setSearch,
    setPage,
    nextPage,
    prevPage,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
};
