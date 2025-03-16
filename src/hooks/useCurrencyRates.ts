import { useQuery } from "@tanstack/react-query";

import { parseExchangeRates } from "../utils/helpers";

export const useCurrencyRates = () => {
  return useQuery({
    queryKey: ["currency-rates"],
    queryFn: async (): Promise<string> => {
      const response = await fetch("/api/currency");
      if (!response.ok) {
        throw new Error("Failed to fetch currency rates.");
      }
      return response.text();
    },
    select: (data) => parseExchangeRates(data),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
