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

function NestedTodoDetailsDialog({ nestedTodo, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{nestedTodo?.title ?? ""}</DialogTitle>
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
                {nestedTodo?.endDate
                  ? moment(nestedTodo?.endDate, "DD/MM/YYYY").format(
                      "DD MMM YYYY"
                    )
                  : ""}
              </Typography>
              <Typography
                variant="body2"
                color={nestedTodo?.completed ? "text.success" : "text.info"}
              >
                {nestedTodo?.completed ? "Completed" : "Pending"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">{"Description"}</Typography>
            <Typography variant="body2">
              {nestedTodo?.description ?? "/"}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NestedTodoDetailsDialog;
