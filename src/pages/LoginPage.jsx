import React from "react";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 30px;
`;
function LoginPage() {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

export default LoginPage;
