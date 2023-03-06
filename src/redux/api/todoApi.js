import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndpoints } from "../../config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiEndpoints.baseUrl}`,
  }),
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
      query(data) {
        const { payload, id } = data;
        return {
          url: `${apiEndpoints.todo.updateTodo}/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
      //   console.log(typeof id === "string");
      //   const patchResult = dispatch(
      //     todoApi.util.updateQueryData("getAllTodos", "205", (todos) => {
      //       console.log("helllo");
      //       return todos.map((todo) => {
      //         if (todo.id !== id) return todo;
      //         todo.pos = patch.pos;
      //       });
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Todos", id },
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
      transformResponse: (response) => response,
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
    deleteTodo: builder.mutation({
      query(id) {
        return {
          url: `${apiEndpoints.todo.deleteTodo}/${id}`,
          method: "Delete",
        };
      },
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
