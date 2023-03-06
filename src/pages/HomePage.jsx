import React, { useState } from "react";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TodoList from "../components/Todos/TodoList";
import AddTodoDialog from "../components/Todos/AddTodoDialog";

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
const Title = styled.p`
  margin: 0px;
  font-size: 30px;
  font-size: 4rem;

  /* font-family: cursive; */
  /* font-family: Roboto; */
`;
const Text = styled.p`
  margin: 0px;
  margin-top: -15px !important;
  font-size: 1rem;
`;

function HomePage() {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Container>
      {/* <Logo /> */}
      {/* <Title>Todo's</Title>
      <Text>3 Total, 2 Completed and 1 Pending</Text> */}
      <TodoList />
      <Fab color="primary" sx={fabStyle} onClick={onOpen}>
        <AddIcon />
      </Fab>
      {open && <AddTodoDialog open={open} onClose={onClose} />}
    </Container>
  );
}

export default HomePage;
