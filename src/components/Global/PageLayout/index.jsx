import React from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer limit={3} />
    </Container>
  );
}

export default PageLayout;
