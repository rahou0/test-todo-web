import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndpoints } from "../../config";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: `${apiEndpoints.baseUrl}`,
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    createTodo: builder.mutation({
      query(todo) {
        return {
          url: `${apiEndpoints.todo.createTodo}`,
          method: "POST",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
      transformResponse: (result) => result.data,
    }),
    updateTodo: builder.mutation({
      query(id, todo) {
        return {
          url: `${apiEndpoints.todo.updateTodo}/${id}`,
          method: "PATCH",
          body: todo,
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Posts", id },
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    getAllTodos: builder.query({
      query(userId) {
        return {
          url: `${apiEndpoints.todo.getAllTodos}?userId=${userId}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Todos",
                id,
              })),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
      transformResponse: (results) => results.data,
    }),
    deleteTodo: builder.mutation({
      query(id) {
        return {
          url: `${apiEndpoints.todo.deleteTodo}/${id}`,
          method: "Delete",
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useGetAllTodosQuery,
} = todoApi;
