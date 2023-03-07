import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import styled from "styled-components";

import SubTodoStatus from "./SubTodoStatus";

import EditIconButton from "../../Global/Buttons/EditIconButton";
import DeleteIconButton from "../../Global/Buttons/DeleteIconButton";
import ViewIconButton from "../../Global/Buttons/ViewIconButton";

import DeleteNestedTodoDialog from "../DialogModals/DeleteNestedTodoDialog";
import EditNestedTodoDialog from "../DialogModals/EditNestedTodoDialog";
import NestedTodoDetailsDialog from "../DialogModals/NestedTodoDetailsDialog";

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

const EndDate = styled(Typography)`
  min-width: 80px;
  text-decoration: ${({ iscompleted }) =>
    iscompleted ? "line-through" : "none"};
  margin-right: 10px !important;
  padding-top: 3px;
  @media (max-width: 576px) {
    padding: 3px;
    margin-right: 0px !important;
  }
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
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
  @media (max-width: 325px) {
    flex-direction: column;
    align-items: start;
  }
`;
const ActionsRightContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  @media (max-width: 325px) {
    width: 100%;
    justify-content: flex-end;
  }
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
          <ActionsRightContainer>
            <ViewIconButton onHandleClick={onOpenDetailsDialog} />
            <EditIconButton onHandleClick={onOpenEditDialog} />
            <DeleteIconButton onHandleClick={onOpenDeleteDialog} />
          </ActionsRightContainer>
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
