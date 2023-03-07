import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import SubTodosList from "../../SubTodos/SubTodosList";

function TodoDetailsDialog({ todo, open, onClose, nestedTodos }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{todo?.title ?? ""}</DialogTitle>
      <DialogContent sx={{ mt: -2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Typography variant="body2">
                {todo?.endDate
                  ? moment(todo?.endDate, "DD/MM/YYYY").format("DD MMM YYYY")
                  : ""}
              </Typography>
              <Typography
                variant="body2"
                color={todo?.completed ? "text.success" : "text.info"}
              >
                {todo?.completed ? "Completed" : "Pending"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{"Description"}</Typography>
            <Typography variant="body2">{todo?.description ?? "/"}</Typography>
          </Grid>

          <Grid item xs={12} sx={{}}>
            <SubTodosList nestedTodos={nestedTodos} todoId={todo?.id} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TodoDetailsDialog;
