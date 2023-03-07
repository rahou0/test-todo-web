import { Dialog } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { show_notification } from "../../../utils/notificationHelper";
import { useCreateNestedTodoMutation } from "../../../redux/api/nestedTodoApi";
import TodoForm from "../../Global/TodoForm";

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
      //create nested todo payload
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
      console.log(error);
      show_notification("Failed to add your Nested Todo", "error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <Dialog open={open} onClose={onClose}>
      <TodoForm
        title="Add New Nested Todo"
        isLoading={isLoading}
        formik={formik}
        onClose={onClose}
      />
    </Dialog>
  );
}

export default AddNestedTodoDialog;
