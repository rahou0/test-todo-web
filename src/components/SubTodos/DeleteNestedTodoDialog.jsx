import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDeleteNestedTodoMutation } from "../../redux/api/nestedTodoApi";
import { show_notification } from "../../utils/notificationHelper";
import BackDrop from "../Global/BackDrop";

function DeleteNestedTodoDialog({ open, nestedTodo, onClose }) {
  const [deleteNestedTodo, { isLoading, error, isSuccess, isError }] =
    useDeleteNestedTodoMutation();

  useEffect(() => {
    if (isSuccess) {
      show_notification("Nested Todo is deleted successfully");
      onClose();
    }

    if (isError) {
      show_notification("Failed to delete Nested Todo", "error");
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  const onDeleteHandler = () => {
    deleteNestedTodo(nestedTodo?.id);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Delete Nested Todo"}</DialogTitle>
      <DialogContent>
        <Typography>
          This Nested Todo will be removed from your feed and you won’t be able
          to see it. There is no undo.
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

export default DeleteNestedTodoDialog;
