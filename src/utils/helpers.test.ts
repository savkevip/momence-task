import { describe, it, expect } from "vitest";

import { calcualteRate, parseExchangeRates } from "./helpers";
import { CurrencyType } from "./types";

const sampleData = `23.02.2024 #39
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|16.582
Eurozone|euro|1|EUR|24.615
United States|dollar|1|USD|22.986`;

describe("parseExchangeRates", () => {
  it("should parse valid exchange rate data", () => {
    const result = parseExchangeRates(sampleData);

    expect(result).toEqual([
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
      {
        country: "United States",
        currency: "dollar",
        amount: 1,
        code: "USD",
        rate: 22.986,
      },
    ]);
  });

  it("should return an empty array for an empty string", () => {
    expect(parseExchangeRates("")).toEqual([]);
  });

  it("should handle invalid formatted data gracefully", () => {
    const badData = `Country|Currency|Amount|Code
    Australia|dollar|1|AUD`;

    expect(parseExchangeRates(badData)).toEqual([]);
  });
});

describe("calcualteRate", () => {
  const currencies: CurrencyType[] = [
    {
      country: "Australia",
      currency: "Dollar",
      amount: 1,
      code: "AUD",
      rate: 16.582,
    },
    {
      country: "Eurozone",
      currency: "Euro",
      amount: 1,
      code: "EUR",
      rate: 24.615,
    },
    {
      country: "United States",
      currency: "Dollar",
      amount: 1,
      code: "USD",
      rate: 22.986,
    },
  ];

  it("calculates the conversion correctly when a valid currency is selected", () => {
    const result = calcualteRate({
      amountInCzk: 5000,
      selectedCurrency: "AUD",
      currencies,
    });
    const expected = (5000 / 16.582) * 1;

    expect(result).toBeCloseTo(expected, 2);
  });

  it("calculates the conversion correctly when using a different currency", () => {
    const result = calcualteRate({
      amountInCzk: 5000,
      selectedCurrency: "EUR",
      currencies,
    });
    const expected = (5000 / 24.615) * 1;

    expect(result).toBeCloseTo(expected, 2);
  });

  it("returns the correct result when no matching currency is found", () => {
    const result = calcualteRate({
      amountInCzk: 5000,
      selectedCurrency: "GBP",
      currencies,
    });
    const expected = (5000 / 1) * 1;

    expect(result).toBe(expected);
  });

  it("handles the case when rate is 1", () => {
    const result = calcualteRate({
      amountInCzk: 5000,
      selectedCurrency: "USD",
      currencies,
    });
    const expected = (5000 / 22.986) * 1;

    expect(result).toBeCloseTo(expected, 2);
  });
});
