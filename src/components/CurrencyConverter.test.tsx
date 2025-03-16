import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { ThemeProvider } from "styled-components";

import { CurrencyConverter } from "./CurrencyConverter";
import { CurrencyType } from "../utils/types";
import { theme } from "../styles/theme";

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

describe("CurrencyConverter", () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyConverter currencies={currencies} />
      </ThemeProvider>,
    );
  });

  it("renders the CurrencyConverter and checks initial state", () => {
    expect(screen.getByLabelText(/Amount in CZK/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Currency/)).toBeInTheDocument();
    expect(screen.getByText(/Convert/)).toBeInTheDocument();
  });

  it("shows error message when invalid amount is entered", async () => {
    fireEvent.change(screen.getByLabelText(/Amount in CZK/), {
      target: { value: "invalid" },
    });
    fireEvent.blur(screen.getByLabelText(/Amount in CZK/));

    await waitFor(() =>
      expect(screen.getByText(/Amount must be a valid number/)).toBeInTheDocument(),
    );
  });

  it("calculates the correct conversion result", async () => {
    fireEvent.change(screen.getByLabelText(/Amount in CZK/), {
      target: { value: "5000" },
    });
    fireEvent.change(screen.getByLabelText(/Select Currency/), {
      target: { value: "AUD" },
    });
    fireEvent.click(screen.getByText(/Convert/));

    await waitFor(() =>
      expect(screen.getByText(/Converted Amount: 301.53 AUD/)).toBeInTheDocument(),
    );
  });

  it("resets the result when the amount or currency is changed", async () => {
    fireEvent.change(screen.getByLabelText(/Amount in CZK/), {
      target: { value: "5000" },
    });
    fireEvent.change(screen.getByLabelText(/Select Currency/), {
      target: { value: "AUD" },
    });
    fireEvent.click(screen.getByText(/Convert/));

    await waitFor(() =>
      expect(screen.getByText(/Converted Amount: 301.53 AUD/)).toBeInTheDocument(),
    );

    fireEvent.change(screen.getByLabelText(/Amount in CZK/), {
      target: { value: "1000" },
    });

    await waitFor(() => expect(screen.queryByText(/Converted Amount:/)).not.toBeInTheDocument());
  });
});
