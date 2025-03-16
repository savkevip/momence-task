import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 20px auto;
  padding: 20px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;
