import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useGetAllTodosQuery } from "../../redux/api/todoApi";
import Todo from "../Todo";
import TodoListSkeleton from "./TodoListSkeleton";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
`;
function TodoList() {
  const [cookies] = useCookies(["logged_in"]);

  const { isLoading, isError, error, data } = useGetAllTodosQuery(
    cookies?.logged_in?.id
  );

  useEffect(() => {
    if (isError) {
      toast.error("failed to load todos");
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Container>
      {isLoading ? (
        <TodoListSkeleton />
      ) : (
        <>
          <span>Total:{data?.length}</span>
          {data?.map((todo) => (
            <Todo todo={todo} key={`todo-${todo.id}`} />
          ))}
        </>
      )}
    </Container>
  );
}

export default TodoList;
