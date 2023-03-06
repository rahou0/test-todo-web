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
      <DialogTitle>{"Details"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{"Title"}</Typography>
            <Typography variant="body2">{nestedTodo?.title ?? "/"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{"Description"}</Typography>
            <Typography variant="body2">
              {nestedTodo?.description ?? "/"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Typography variant="subtitle1">{"End Date"}</Typography>
              <Typography variant="body2">
                {nestedTodo?.endDate
                  ? moment(nestedTodo?.endDate, "DD/MM/YYYY").format(
                      "DD MMM YYYY"
                    )
                  : "Not specified"}
              </Typography>
            </Box>
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
