export const apiEndpoints = {
  //   baseUrl: "https://test-todo-api-production.up.railway.app",
  baseUrl: "https://test-todos-production.up.railway.app",
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
  nestedTodo: {
    createTodo: "/nestedTodos",
    deleteTodo: "/nestedTodos",
    updateTodo: "/nestedTodos",
    getAllTodos: "/nestedTodos",
  },
};
