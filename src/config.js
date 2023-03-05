export const apiEndpoints = {
  baseUrl: "https://test-todo-api-production.up.railway.app",

  auth: {
    loginUser: "/authentification",
    registerUser: "/authentification",
  },
  todo: {
    createTodo: "/todos",
    deleteTodo: "/todos",
    updateTodo: "/todos",
    getAllTodos: "/todos",
  },
  nestedTodo: {},
};
