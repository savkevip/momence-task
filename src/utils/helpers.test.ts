import { describe, it, expect } from "vitest";

import { parseExchangeRates } from "./helpers";

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
