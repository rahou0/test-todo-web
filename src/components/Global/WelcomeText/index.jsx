import React from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 120px;
  gap: 20px;
  @media (max-width: 576px) {
    margin-top: 80px;
  }
`;
const Title = styled.h3`
  color: white;
  margin: 0px;
  padding: 0px;
  font-family: Libre Baskerville;
  /* font-family: Shantell Sans; */
  font-size: 5rem;
  font-weight: 600;
  word-break: break-all;
  @media (max-width: 576px) {
    font-size: 3.5rem;
  }
`;
const Text = styled.h5`
  color: white;
  font-size: 3rem;
  font-weight: 600;
  margin: 0px;
  font-family: Libre Baskerville;

  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
`;

function WelcomeText() {
  const [cookies] = useCookies(["logged_in"]);
  return (
    <Container>
      <Title>Hi {cookies?.logged_in?.email?.split("@")[0]}, </Title>
      <Text>Welcome Back 👋</Text>
    </Container>
  );
}

export default WelcomeText;
