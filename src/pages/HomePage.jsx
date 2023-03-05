import React from "react";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TodoList from "../components/TodoList";

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
const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 16,
};

function HomePage() {
  return (
    <Container>
      <TodoList />
      <Fab color="primary" sx={fabStyle}>
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default HomePage;
