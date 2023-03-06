import { Button } from "@mui/material";
import React from "react";
import image from "../../assets/add_tasks.svg";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.img`
  max-width: 200px;
  width: 100%;
`;
function AddNewSubTodo({ handleClick }) {
  return (
    <Container>
      <ImageContainer src={image} alt="empty list" />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        {"Add New Nested Todo"}
      </Button>
    </Container>
  );
}

export default AddNewSubTodo;
