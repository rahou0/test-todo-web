import React, { useState } from "react";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TodoList from "../components/Todos/TodoList";
import AddTodoDialog from "../components/Todos/DialogModals/AddTodoDialog";
import NavBar from "../components/NavBar";
import WelcomeText from "../components/Global/WelcomeText";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 15px;
`;
const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 16,
  backgroundColor: "#3fd4f4",
  color: "#fff",
};

function HomePage() {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Container>
      <NavBar />
      <WelcomeText />
      <TodoList />
      <Fab color="primary" sx={fabStyle} onClick={onOpen}>
        <AddIcon />
      </Fab>
      {open && <AddTodoDialog open={open} onClose={onClose} />}
    </Container>
  );
}

export default HomePage;
