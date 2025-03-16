import { CurrencyType } from "./types";

export const parseExchangeRates = (data: string): CurrencyType[] => {
  const lines = data.split("\n").slice(2);
  return lines
    .map((line) => line.trim())
    .filter((line) => line)
    .map((line) => {
      const [country, currency, amount, code, rate] = line.split("|");
      return {
        country,
        currency,
        amount: Number(amount),
        code,
        rate: Number(rate),
      };
    });
};

export const calcualteRate = ({
  amountInCzk,
  selectedCurrency,
  currencies,
}: {
  amountInCzk: number;
  selectedCurrency: string;
  currencies: CurrencyType[];
}) => {
  const rate = currencies.find((currency) => currency.code === selectedCurrency)?.rate || 1;
  const amountForCurrency =
    currencies.find((currency) => currency.code === selectedCurrency)?.amount || 1;

  return (amountInCzk / rate) * amountForCurrency;
};
