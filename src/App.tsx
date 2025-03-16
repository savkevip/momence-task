import { Button } from "./components/ui/Button";
import { Spinner } from "./components/ui/Spinner";
import { Subtitle, Text, Title } from "./components/ui/Typography";
import { Wrapper } from "./components/ui/Wrapper";
import { useCurrencyRates } from "./hooks/useCurrencyRates";

export const App = () => {
  const { data: currencies = [], isLoading } = useCurrencyRates();

  return (
    <Wrapper>
      <Title>Momence Task</Title>
      <Button>Exchange Currency</Button>
      <Subtitle>Some Subtitle</Subtitle>
      {isLoading ? <Spinner /> : <Text $align="center">{JSON.stringify(currencies)}</Text>}
    </Wrapper>
  );
};
