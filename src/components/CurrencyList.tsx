import styled from "styled-components";

import { CurrencyType } from "../utils/types";

import { Spinner } from "./ui/Spinner";

import { Text, TextSecondary, Subtitle } from "./ui/Typography";
import { Wrapper } from "./ui/Wrapper";

type Props = {
  currencies: CurrencyType[];
  loading?: boolean;
};

export const CurrencyList = ({ currencies, loading }: Props) => {
  return (
    <Wrapper>
      {loading ? (
        <Loader data-testid="loader-wrapper">
          <Spinner />
        </Loader>
      ) : currencies.length === 0 ? (
        <Subtitle data-testid="no-data-message" $align="center">
          No data
        </Subtitle>
      ) : (
        currencies.map(({ country, code, rate }) => (
          <CurrencyItem key={code}>
            <TextSecondary>{country}</TextSecondary>

            <Text>
              {rate.toFixed(2)} {code}
            </Text>
          </CurrencyItem>
        ))
      )}
    </Wrapper>
  );
};

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;

const CurrencyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};

  &:last-child {
    border-bottom: none;
  }
`;
