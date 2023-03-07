import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import styled from "styled-components";

import TodoStatus from "./TodoStatus";

import EditTodoDialog from "../DialogModals/EditTodoDialog";
import TodoDetailsDialog from "../DialogModals/TodoDetailsDialog";
import DeleteTodoDialog from "../DialogModals/DeleteTodoDialog";

import ViewIconButton from "../../Global/Buttons/ViewIconButton";
import EditIconButton from "../../Global/Buttons/EditIconButton";
import DeleteIconButton from "../../Global/Buttons/DeleteIconButton";

import { useGetAllNestedTodosQuery } from "../../../redux/api/nestedTodoApi";

const Container = styled(Paper)`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 15px;
  box-shadow: 0px 8px 30px rgba(80, 85, 136, 0.06);
  border-radius: 8px;
  background-color: #fff;
  justify-content: space-between;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: start;
  }
`;
const Title = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: ${({ iscompleted }) =>
    iscompleted ? "line-through" : "none"};
  max-width: 100%;
`;
const LeftInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 42px);
  box-sizing: border-box;
`;
const SubTask = styled(Typography)`
  margin-top: 0px !important;
  @media (max-width: 576px) {
    display: none;
  }
`;

const MobileSubTask = styled(Typography)`
  display: none;
  @media (max-width: 576px) {
    display: block;
  }
`;
const EndDate = styled(Typography)`
  min-width: 80px;
  text-decoration: ${({ iscompleted }) =>
    iscompleted ? "line-through" : "none"};
  margin-right: 10px !important;
  padding-top: 3px;
  @media (max-width: 576px) {
    padding: 0px;
    margin-right: 0px !important;
  }
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  max-width: calc(100% - 190px);
  @media (max-width: 567px) {
    max-width: 100%;
    padding-right: 10px;
  }
`;
const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 185px;
  max-width: 185px;
  justify-content: flex-end;
  height: 100%;
  box-sizing: border-box;
  @media (max-width: 576px) {
    min-width: 100%;
    max-width: 100%;
    padding-left: 10px;
    justify-content: space-between;
  }
`;
const ActionsLeftContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const ActionsRightContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
function Todo({ todo }) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { data: nestedTodos } = useGetAllNestedTodosQuery(todo?.id);

  const onCloseEditDialog = () => setOpenEditDialog(false);
  const onOpenEditDialog = (e) => {
    e.stopPropagation();
    setOpenEditDialog(true);
  };

  const onCloseDeleteDialog = () => setOpenDeleteDialog(false);
  const onOpenDeleteDialog = (e) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  };

  const onCloseDetailsDialog = () => setOpenDetailsDialog(false);
  const onOpenDetailsDialog = () => setOpenDetailsDialog(true);

  return (
    <>
      <Container sx={{ borderRadius: 3 }} onClick={onOpenDetailsDialog}>
        <LeftContainer>
          <TodoStatus todo={todo} />
          <LeftInnerContainer>
            <Title
              sx={{ fontWeight: 600 }}
              iscompleted={todo.completed ? 1 : 0}
            >
              {todo?.title ?? ""}
            </Title>
            {nestedTodos?.length > 0 && (
              <SubTask sx={{ fontSize: "0.8rem" }}>
                {
                  nestedTodos?.filter((nestedTodo) => nestedTodo.completed)
                    .length
                }
                /{nestedTodos?.length}
              </SubTask>
            )}
          </LeftInnerContainer>
        </LeftContainer>

        <ActionsContainer>
          <ActionsLeftContainer>
            {nestedTodos?.length > 0 && (
              <MobileSubTask sx={{ mr: 1 }}>
                {
                  nestedTodos?.filter((nestedTodo) => nestedTodo.completed)
                    .length
                }
                /{nestedTodos?.length}
              </MobileSubTask>
            )}
            {todo?.endDate && (
              <EndDate iscompleted={todo.completed ? 1 : 0}>
                {todo?.endDate}
              </EndDate>
            )}
          </ActionsLeftContainer>

          <ActionsRightContainer>
            <ViewIconButton onHandleClick={onOpenDetailsDialog} />
            <EditIconButton onHandleClick={onOpenEditDialog} />
            <DeleteIconButton onHandleClick={onOpenDeleteDialog} />
          </ActionsRightContainer>
        </ActionsContainer>
      </Container>
      {openDeleteDialog && (
        <DeleteTodoDialog
          open={openDeleteDialog}
          onClose={onCloseDeleteDialog}
          todo={todo}
        />
      )}
      {openEditDialog && (
        <EditTodoDialog
          open={openEditDialog}
          onClose={onCloseEditDialog}
          todo={todo}
        />
      )}
      {openDetailsDialog && (
        <TodoDetailsDialog
          open={openDetailsDialog}
          onClose={onCloseDetailsDialog}
          todo={todo}
          nestedTodos={nestedTodos}
        />
      )}
    </>
  );
}

export default Todo;
