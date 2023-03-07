import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndpoints } from "../../config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiEndpoints.baseUrl}`,
  }),
  //add todos tag to all incoming todos data
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    // add new todo request
    createTodo: builder.mutation({
      query(todo) {
        return {
          url: `${apiEndpoints.todo.createTodo}`,
          method: "POST",
          body: todo,
        };
      },
      // move the cashed tags to invalidate to fetch the new todo list
      invalidatesTags: [{ type: "Todos", id: "LIST" }],

      transformResponse: (result) => result.data,
    }),
    // update todo request
    updateTodo: builder.mutation({
      query(data) {
        const { payload, id } = data;
        return {
          url: `${apiEndpoints.todo.updateTodo}/${id}`,
          method: "PATCH",
          body: payload,
        };
      },

      // move the cashed tag of the updated todo to invalidate tags list to fetch the updated todo list
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Todos", id },
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
      transformResponse: (response) => response,
    }),
    // fetch all user todos
    getAllTodos: builder.query({
      query(userId) {
        return {
          url: `${apiEndpoints.todo.getAllTodos}?userId=${userId}`,
        };
      },
      //assign a tag and id to the retrived todos for cashing
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
      transformResponse: (results) => {
        //sort the todos based position
        let sortedTodos = results?.sort((a, b) =>
          a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0
        );
        //convert id to string for drag and drop;
        return sortedTodos.map((item) => {
          return { ...item, id: item.id?.toString() };
        });
      },
    }),
    // delete todo request
    deleteTodo: builder.mutation({
      query(id) {
        return {
          url: `${apiEndpoints.todo.deleteTodo}/${id}`,
          method: "Delete",
        };
      },
      // move the cashed tag of the deleted todo to invalidate tags list to fetch the updated todo list
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useGetAllTodosQuery,
} = todoApi;
