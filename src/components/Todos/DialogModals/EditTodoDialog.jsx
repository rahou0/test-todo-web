import { Dialog } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import {
  useUpdateTodoMutation,
  useGetAllTodosQuery,
} from "../../../redux/api/todoApi";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import TodoDialogSkeleton from "../Skeletons/TodoDialogSkeleton";
import { show_notification } from "../../../utils/notificationHelper";
import TodoForm from "../../Global/TodoForm";

function EditTodoDialog({ open, todo, onClose }) {
  const [cookies] = useCookies(["logged_in"]);
  const [updateTodo, { isLoading, isError, isSuccess }] =
    useUpdateTodoMutation();

  const { isLoadingTodos } = useGetAllTodosQuery(cookies?.logged_in?.id);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: todo?.title ?? "",
      description: todo?.description,
      endDate: todo?.endDate ?? null,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().optional("Description is optional"),
    }),
    onSubmit: async (values, helpers) => {
      //create todo payload
      let payload = {};
      if (todo.title !== values.title) payload.title = values.title;
      if (todo.description !== values.description)
        payload.description = values.description;
      if (todo.endDate !== values.endDate) payload.endDate = values.endDate;
      if (Object.keys(payload).length === 0) {
        formik.resetForm();
        return onClose();
      }
      const data = { id: todo.id, payload };
      updateTodo(data);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      onClose();
      show_notification("Your Todo is successfully edited");
    } else if (isError) {
      show_notification("Failed to edit your Todo", "error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <Dialog open={open} onClose={onClose}>
      {isLoadingTodos ? (
        <TodoDialogSkeleton />
      ) : (
        <TodoForm
          title="Edit Todo"
          isLoading={isLoading}
          formik={formik}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
}

export default EditTodoDialog;
