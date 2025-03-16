import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CurrencyType } from "../utils/types";
import { Subtitle } from "./ui/Typography";
import { Button } from "./ui/Button";
import { Wrapper } from "./ui/Wrapper";
import { calcualteRate } from "../utils/helpers";

type Props = {
  currencies: CurrencyType[];
};

type Values = {
  amount: string;
  selectedCurrency: string;
};

const validationSchema = Yup.object({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .typeError("Amount must be a valid number"),
  selectedCurrency: Yup.string()
    .required("Currency selection is required")
    .notOneOf([""], "Please select a currency"),
});

export const CurrencyConverter = ({ currencies }: Props) => {
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = (values: Values) => {
    const newResult = calcualteRate({
      amountInCzk: parseFloat(values.amount),
      currencies,
      selectedCurrency: values.selectedCurrency,
    });

    setResult(newResult);
  };

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues: {
        amount: "",
        selectedCurrency: "EUR",
      },
      validationSchema: validationSchema,
      onSubmit: handleConvert,
    });

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setResult(null);
  };

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFieldValue("selectedCurrency", e.target.value);
    setResult(null);
  };

  return (
    <Wrapper>
      <CurrencyForm>
        <label htmlFor="amount">Amount in CZK:</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={values.amount}
          onChange={handleAmountChange}
          onBlur={handleBlur}
          placeholder="Enter amount"
        />
        {touched.amount && errors.amount ? <Error>{errors.amount}</Error> : null}
      </CurrencyForm>

      <CurrencyForm>
        <label htmlFor="currency">Select Currency:</label>
        <select
          id="currency"
          name="selectedCurrency"
          value={values.selectedCurrency}
          onChange={handleCurrencyChange}
          onBlur={handleBlur}
        >
          <option value="">Select Currency</option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.currency.toUpperCase()} ({currency.code})
            </option>
          ))}
        </select>
        {touched.selectedCurrency && errors.selectedCurrency ? (
          <Error>{errors.selectedCurrency}</Error>
        ) : null}
      </CurrencyForm>

      <Button onClick={() => handleSubmit()} disabled={!values.amount || !values.selectedCurrency}>
        Convert
      </Button>

      {result ? (
        <Result>
          <Subtitle $align="center">
            Converted Amount: {result.toFixed(2)} {values.selectedCurrency}
          </Subtitle>
        </Result>
      ) : null}
    </Wrapper>
  );
};

const CurrencyForm = styled.div`
  margin-bottom: 15px;

  input,
  select {
    padding: 12px;
    font-size: 1rem;
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Error = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: right;
  font-size: 0.8rem;
`;

const Result = styled.div`
  margin-top: 20px;
`;
