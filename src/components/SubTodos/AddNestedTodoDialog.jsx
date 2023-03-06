import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { show_notification } from "../../utils/notificationHelper";
import { useCreateNestedTodoMutation } from "../../redux/api/nestedTodoApi";

function AddNestedTodoDialog({ open, todoId, onClose }) {
  const [createNestedTodo, { isLoading, isError, error, isSuccess }] =
    useCreateNestedTodoMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      endDate: null,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().optional("Description is optional"),
    }),
    onSubmit: async (values, helpers) => {
      //create todo payload
      const payload = {
        todoId: todoId,
        title: values.title,
        description: values.description,
        endDate: values.endDate,
        completed: false,
      };

      createNestedTodo(payload);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      onClose();
      show_notification("Your Nested Todo is successfully added");
    } else if (isError) {
      show_notification("Failed to add your Nested Todo", "error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Add New Nested Todo"}</DialogTitle>
      <DialogContent>
        <p></p>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              sx={{ minWidth: "300px" }}
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
              placeholder="Title of the Nested Todo"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ minWidth: "300px" }}
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
              placeholder="Description of the Nested Todo"
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
    </Dialog>
  );
}

export default AddNestedTodoDialog;
