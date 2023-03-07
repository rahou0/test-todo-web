import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { useGetAllTodosQuery } from "../../redux/api/todoApi";
import { show_notification } from "../../utils/notificationHelper";
import DragAndDropContainer from "./DragAndDropContainer";
import EmptyTodoList from "./EmptyTodoList";
import TodoListSkeleton from "./Skeletons/TodoListSkeleton";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
  margin-top: 50px;
`;
function TodoList() {
  const [cookies] = useCookies(["logged_in"]);

  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useGetAllTodosQuery(cookies?.logged_in?.id);

  useEffect(() => {
    if (isError) {
      show_notification("Failed to load todos", "error");
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
          {todos?.length > 0 ? (
            <DragAndDropContainer todos={todos} />
          ) : (
            <EmptyTodoList />
          )}
        </>
      )}
    </Container>
  );
}

export default TodoList;
