import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchCardsConnector,
  FetchCardsParams,
} from "../connectors/cardsConnector";
import { CardType } from "../schemas/cards";

export const useCards = (params: FetchCardsParams) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["cards", params.search],
    queryFn: ({ pageParam = 0 }) =>
      fetchCardsConnector({ ...params, page: pageParam }),
    initialPageParam: 0,
    gcTime: 5 * 60 * 1000,
    staleTime: Infinity,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === params.pageSize) {
        return allPages.length;
      }
      return undefined;
    },
  });

  const flatCards: CardType[] = data?.pages.flatMap((page) => page) ?? [];

  return { cards: flatCards, isLoading: isLoading, fetchNextPage, hasNextPage };
};
