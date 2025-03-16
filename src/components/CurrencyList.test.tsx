import { describe, it, expect } from "vitest";
import { ThemeProvider } from "styled-components";
import { render, screen } from "@testing-library/react";

import { CurrencyList } from "./CurrencyList";
import { CurrencyType } from "../utils/types";
import { theme } from "../styles/theme";

describe("CurrencyList", () => {
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

  it("renders a list of currencies when not loading", async () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyList currencies={currencies} loading={false} />
      </ThemeProvider>,
    );

    expect(screen.getByText("Australia")).toBeInTheDocument();
    expect(screen.getByText("16.58 AUD")).toBeInTheDocument();
    expect(screen.getByText("Eurozone")).toBeInTheDocument();
    expect(screen.getByText("24.61 EUR")).toBeInTheDocument();
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("22.99 USD")).toBeInTheDocument();
  });

  it("shows a spinner when loading is true", () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyList currencies={[]} loading={true} />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("loader-wrapper")).toBeInTheDocument();
  });
});
