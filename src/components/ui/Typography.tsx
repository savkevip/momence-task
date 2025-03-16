import styled from "styled-components";

type Props = {
  $align?: "center" | "left" | "right";
};

export const Title = styled.h1<Props>`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: ${({ $align }) => $align || "left"};
`;

export const Subtitle = styled.h2<Props>`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: ${({ $align }) => $align || "left"};
`;

export const Text = styled.p<Props>`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: ${({ $align }) => $align || "left"};
`;

export const TextSecondary = styled.p<Props>`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: ${({ $align }) => $align || "left"};
`;
