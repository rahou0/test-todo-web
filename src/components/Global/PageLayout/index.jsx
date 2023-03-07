import React from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-theme--colored.Toastify__toast--success {
    background-color: #14c38e;
  }
  .Toastify__toast-theme--colored.Toastify__toast--error {
    background-color: #fe859e;
  }
`;
const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  position: relative;
  min-height: 100vh;
  height: 100%;
  overflow: hidden;
  padding: 0px 30px;
  box-sizing: border-box;
  background-color: #a18aff;
`;
function PageLayout({ children }) {
  return (
    <Container>
      {children}
      <StyledToastContainer limit={3} />
    </Container>
  );
}

export default PageLayout;
