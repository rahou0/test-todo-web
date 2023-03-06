import { Typography } from "@mui/material";
import React from "react";
import image from "../../assets/empty_list.svg";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const ImageContainer = styled.img`
  max-width: 400px;
  width: 100%;
`;
function EmptyTodoList() {
  return (
    <Container>
      <ImageContainer src={image} alt="empty list" />
      <Typography variant="h4" sx={{ color: "#fff" }}>
        No Tasks
      </Typography>
    </Container>
  );
}

export default EmptyTodoList;
