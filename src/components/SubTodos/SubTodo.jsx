import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import SubTodoStatus from "./SubTodoStatus";
import styled from "styled-components";
import EditIconButton from "../Global/Buttons/EditIconButton";
import DeleteIconButton from "../Global/Buttons/DeleteIconButton";
import DeleteNestedTodoDialog from "./DeleteNestedTodoDialog";
import EditNestedTodoDialog from "./EditNestedTodoDialog";
import NestedTodoDetailsDialog from "./NestedTodoDetailsDialog";

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
  cursor: pointer;
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
  max-width: calc(100% - 57px);
  box-sizing: border-box;
`;

const EndDate = styled(Typography)`
  min-width: 80px;
  text-decoration: ${({ iscompleted }) =>
    iscompleted ? "line-through" : "none"};
  margin-right: 20px !important;
  padding-top: 3px;
`;
const LeftContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  max-width: calc(100% - 190px);
`;
const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 185px;
  max-width: 185px;
  justify-content: flex-end;
  height: 100%;
  box-sizing: border-box;
`;
function SubTodo({ nestedTodo }) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

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
          <SubTodoStatus todo={nestedTodo} />
          <LeftInnerContainer>
            <Title
              sx={{ fontWeight: 600 }}
              iscompleted={nestedTodo.completed ? 1 : 0}
            >
              {nestedTodo?.title}
            </Title>
          </LeftInnerContainer>
        </LeftContainer>

        <ActionsContainer>
          {nestedTodo?.endDate && (
            <EndDate iscompleted={nestedTodo.completed ? 1 : 0}>
              {nestedTodo?.endDate}
            </EndDate>
          )}
          <EditIconButton onHandleClick={onOpenEditDialog} />
          <DeleteIconButton onHandleClick={onOpenDeleteDialog} />
        </ActionsContainer>
      </Container>
      {openDeleteDialog && (
        <DeleteNestedTodoDialog
          open={openDeleteDialog}
          onClose={onCloseDeleteDialog}
          nestedTodo={nestedTodo}
        />
      )}
      {openEditDialog && (
        <EditNestedTodoDialog
          open={openEditDialog}
          onClose={onCloseEditDialog}
          nestedTodo={nestedTodo}
        />
      )}

      {openDetailsDialog && (
        <NestedTodoDetailsDialog
          open={openDetailsDialog}
          onClose={onCloseDetailsDialog}
          nestedTodo={nestedTodo}
        />
      )}
    </>
  );
}

export default SubTodo;