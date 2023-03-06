import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDeleteTodoMutation } from "../../redux/api/todoApi";
import { show_notification } from "../../utils/notificationHelper";
import BackDrop from "../Global/BackDrop";

function DeleteTodoDialog({ open, todo, onClose }) {
  const [deleteTodo, { isLoading, error, isSuccess, isError }] =
    useDeleteTodoMutation();

  useEffect(() => {
    if (isSuccess) {
      show_notification("Todo is deleted successfully");
      onClose();
    }

    if (isError) {
      show_notification("Failed to delete Todo", "error");
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  const onDeleteHandler = () => {
    deleteTodo(todo?.id);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Delete Todo"}</DialogTitle>
      <DialogContent>
        <Typography>
          This Todo will be removed from your feed and you won’t be able to see
          it. There is no undo.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={onDeleteHandler}
          variant="contained"
          color="error"
          sx={{ color: "white" }}
        >
          Delete
        </Button>
      </DialogActions>
      <BackDrop open={isLoading} />
    </Dialog>
  );
}

export default DeleteTodoDialog;
