import { describe, vi, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useCurrencyRates } from "./useCurrencyRates";

describe("useCurrencyRates", () => {
  const mockSuccessResponse = `23.02.2024 #39
    Country|Currency|Amount|Code|Rate
    Australia|dollar|1|AUD|16.582
    Eurozone|euro|1|EUR|24.615`;

  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and returns exchange rates", async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(mockSuccessResponse, {
        status: 200,
        statusText: "OK",
        headers: new Headers({
          "Content-Type": "text/plain",
        }),
      }),
    );

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCurrencyRates(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([
      {
        country: "Australia",
        currency: "dollar",
        amount: 1,
        code: "AUD",
        rate: 16.582,
      },
      {
        country: "Eurozone",
        currency: "euro",
        amount: 1,
        code: "EUR",
        rate: 24.615,
      },
    ]);
  });

  it("handles API errors gracefully", async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response("", {
        status: 500,
        statusText: "Internal Server Error",
      }),
    );

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCurrencyRates(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
