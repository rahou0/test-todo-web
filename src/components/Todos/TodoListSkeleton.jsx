import { Skeleton } from "@mui/material";
import React from "react";
import styled from "styled-components";
const Card = styled(Skeleton)`
  width: 100%;
  min-height: 63px;
  max-height: 63px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 15px;
  border-radius: 8px;
  justify-content: space-between;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
function TodoListSkeleton() {
  return (
    <Container>
      {[...Array(6)].map((_, index) => (
        <Card key={index} variant="rectangular" />
      ))}
    </Container>
  );
}

export default TodoListSkeleton;
