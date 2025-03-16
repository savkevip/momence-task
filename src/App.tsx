import styled from "styled-components";

import { CurrencyList } from "./components/CurrencyList";
import { Title } from "./components/ui/Typography";
import { useCurrencyRates } from "./hooks/useCurrencyRates";

export const App = () => {
  const { data: currencies = [], isLoading } = useCurrencyRates();

  return (
    <Container>
      <Title $align="center">Currency Exchange</Title>
      <CurrencyList currencies={currencies} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
`;
