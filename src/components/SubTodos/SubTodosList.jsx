import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import AddNestedTodoDialog from "./DialogModals/AddNestedTodoDialog";
import AddNewSubTodo from "./AddNewSubTodo";
import SubTodo from "./SubTodo/index";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
  padding: 10px 0px;
  box-sizing: border-box;
`;
function SubTodosList({ nestedTodos, todoId }) {
  const [openAddNestedTodo, setOpenAddNestedTodo] = useState(false);
  const onOpen = () => setOpenAddNestedTodo(true);
  const onClose = () => setOpenAddNestedTodo(false);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Typography variant="subtitle1">{"Sub Todos"}</Typography>
        {nestedTodos?.length > 0 && (
          <Button
            onClick={onOpen}
            variant="contained"
            color="secondary"
            sx={{ color: "white" }}
          >
            {"Add New"}
          </Button>
        )}
      </Box>
      {nestedTodos?.length > 0 ? (
        <div>
          {nestedTodos?.map((nestedTodo) => (
            <SubTodo
              nestedTodo={nestedTodo}
              key={`subTodo-${nestedTodo?.id}`}
            />
          ))}
        </div>
      ) : (
        <>
          <AddNewSubTodo handleClick={onOpen} />
        </>
      )}
      {openAddNestedTodo && (
        <AddNestedTodoDialog
          open={openAddNestedTodo}
          todoId={todoId}
          onClose={onClose}
        />
      )}
    </Container>
  );
}

export default SubTodosList;
