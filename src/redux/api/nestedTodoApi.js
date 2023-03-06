import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndpoints } from "../../config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const nestedTodoApi = createApi({
  reducerPath: "nestedTodoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiEndpoints.baseUrl}`,
  }),
  tagTypes: ["NestedTodos"],
  endpoints: (builder) => ({
    createNestedTodo: builder.mutation({
      query(todo) {
        return {
          url: `${apiEndpoints.nestedTodo.createTodo}`,
          method: "POST",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "NestedTodos", id: "LIST" }],
      transformResponse: (result) => result.data,
    }),
    updateNestedTodo: builder.mutation({
      query(data) {
        const { payload, id } = data;
        return {
          url: `${apiEndpoints.nestedTodo.updateTodo}/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "NestedTodos", id },
              { type: "NestedTodos", id: "LIST" },
            ]
          : [{ type: "NestedTodos", id: "LIST" }],
      transformResponse: (response) => response,
    }),
    getAllNestedTodos: builder.query({
      query(todoId) {
        return {
          url: `${apiEndpoints.nestedTodo.getAllTodos}?todoId=${todoId}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "NestedTodos",
                id,
              })),
              { type: "NestedTodos", id: "LIST" },
            ]
          : [{ type: "NestedTodos", id: "LIST" }],
      transformResponse: (results) => results,
    }),
    deleteNestedTodo: builder.mutation({
      query(id) {
        return {
          url: `${apiEndpoints.nestedTodo.deleteTodo}/${id}`,
          method: "Delete",
        };
      },
      invalidatesTags: [{ type: "NestedTodos", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateNestedTodoMutation,
  useDeleteNestedTodoMutation,
  useUpdateNestedTodoMutation,
  useGetAllNestedTodosQuery,
} = nestedTodoApi;
