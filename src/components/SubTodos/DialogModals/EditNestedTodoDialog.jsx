import { Dialog } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { show_notification } from "../../../utils/notificationHelper";
import { useUpdateNestedTodoMutation } from "../../../redux/api/nestedTodoApi";
import TodoForm from "../../Global/TodoForm";

function EditNestedTodoDialog({ open, nestedTodo, onClose }) {
  const [updateNestedTodo, { isLoading, isError, isSuccess }] =
    useUpdateNestedTodoMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: nestedTodo?.title ?? "",
      description: nestedTodo?.description,
      endDate: nestedTodo?.endDate ?? null,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().optional("Description is optional"),
    }),
    onSubmit: async (values, helpers) => {
      //create todo payload
      let payload = {};
      if (nestedTodo.title !== values.title) payload.title = values.title;
      if (nestedTodo.description !== values.description)
        payload.description = values.description;
      if (nestedTodo.endDate !== values.endDate)
        payload.endDate = values.endDate;
      if (Object.keys(payload).length === 0) {
        formik.resetForm();
        return onClose();
      }
      const data = { id: nestedTodo.id, payload };
      updateNestedTodo(data);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      onClose();
      show_notification("Your Nested Todo is successfully edited");
    } else if (isError) {
      show_notification("Failed to edit your Nested Todo", "error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <Dialog open={open} onClose={onClose}>
      <TodoForm
        title="Edit Nested Todo"
        isLoading={isLoading}
        formik={formik}
        onClose={onClose}
      />
    </Dialog>
  );
}

export default EditNestedTodoDialog;
