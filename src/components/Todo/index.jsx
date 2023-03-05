import { Alert, AlertTitle, IconButton } from "@mui/material";
import React, { useEffect } from "react";
// import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteTodoMutation } from "../../redux/api/todoApi";
import { toast } from "react-toastify";

function Todo({ todo }) {
  const [deleteTodo, { isLoading, error, isSuccess, isError }] =
    useDeleteTodoMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Todo deleted successfully");
    }

    if (isError) {
      toast.error("Failed to delete Todo");
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  const onDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      deleteTodo(id);
    }
  };
  return (
    <div>
      <Alert severity="info">
        <AlertTitle>{todo?.title}</AlertTitle>
        {todo?.description}
        <IconButton
          aria-label="delete"
          onClick={() => onDeleteHandler(todo.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Alert>
    </div>
  );
}

export default Todo;
