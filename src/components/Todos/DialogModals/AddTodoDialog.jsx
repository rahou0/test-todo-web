import { Dialog } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import {
  useCreateTodoMutation,
  useGetAllTodosQuery,
} from "../../../redux/api/todoApi";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import TodoDialogSkeleton from "../Skeletons/TodoDialogSkeleton";
import { show_notification } from "../../../utils/notificationHelper";
import TodoForm from "../../Global/TodoForm";

function AddTodoDialog({ open, onClose }) {
  const [cookies] = useCookies(["logged_in"]);
  const [createTodo, { isLoading, isError, error, isSuccess }] =
    useCreateTodoMutation();

  const { isLoadingTodos, data: todos } = useGetAllTodosQuery(
    cookies?.logged_in?.id
  );

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
        userId: cookies?.logged_in?.id,
        title: values.title,
        description: values.description,
        endDate: values.endDate,
        completed: false,
        pos: todos?.length === 0 ? 1 : todos[todos.length - 1].pos + 1,
      };

      createTodo(payload);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      onClose();
      show_notification("Your Todo is successfully added");
    } else if (isError) {
      console.log(error);
      show_notification("Failed to add your Todo", "error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <Dialog open={open} onClose={onClose}>
      {isLoadingTodos ? (
        <TodoDialogSkeleton />
      ) : (
        <TodoForm
          title="Add New Todo"
          isLoading={isLoading}
          formik={formik}
          onClose={onClose}
        />
      )}

    </Dialog>
  );
}

export default AddTodoDialog;
