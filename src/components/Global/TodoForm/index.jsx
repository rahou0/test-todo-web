import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import BackDrop from "../BackDrop";

function TodoForm({ isLoading, title, formik, onClose }) {
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p></p>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              sx={{ sm: { minWidth: "100%" }, md: { minWidth: "300px" } }}
              error={Boolean(formik.touched.title && formik.errors.title)}
              fullWidth
              helperText={formik.touched.title && formik.errors.title}
              label="Title"
              name="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              disabled={isLoading}
              required
              value={formik.values.title}
              placeholder="Title of the Todo"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ sm: { minWidth: "100%" }, md: { minWidth: "300px" } }}
              error={Boolean(
                formik.touched.description && formik.errors.description
              )}
              fullWidth
              helperText={
                formik.touched.description && formik.errors.description
              }
              label="Description"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              disabled={isLoading}
              value={formik.values.description}
              placeholder="Description of the Todo"
              multiline
              maxRows={4}
              minRows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                sx={{ minWidth: "100%" }}
                label="End date"
                fullWidth
                inputFormat="DD/MM/YYYY"
                onChange={(value) => {
                  formik.setFieldValue(
                    "endDate",
                    moment(value).format("DD/MM/YYYY") ?? null
                  );
                }}
                name="endDate"
                disabled={isLoading}
                value={
                  formik.values.endDate
                    ? moment(formik.values.endDate, "DD/MM/YYYY")
                    : null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiInputBase-root": { pr: "8px" },
                      "& .MuiFilledInput-input": { padding: "6px" },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => {
            formik.handleSubmit();
          }}
          variant="contained"
          color="secondary"
          sx={{ color: "white" }}
        >
          Add
        </Button>
      </DialogActions>
      <BackDrop open={isLoading} />
    </>
  );
}

export default TodoForm;
