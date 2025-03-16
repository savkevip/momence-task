import { Button } from "./components/ui/Button";
import { Spinner } from "./components/ui/Spinner";
import { Subtitle, Text, Title } from "./components/ui/Typography";
import { Wrapper } from "./components/ui/Wrapper";

export const App = () => {
  return (
    <Wrapper>
      <Title>Momence Task</Title>
      <Button>Exchange Currency</Button>
      <Subtitle>Some Subtitle</Subtitle>
      <Text $align="center">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
      <Spinner />
    </Wrapper>
  );
};
