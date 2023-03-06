import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import React from "react";

function DeleteIconButton({ onHandleClick }) {
  return (
    <>
      <IconButton onClick={onHandleClick}>
        <DeleteIcon color="error" />
      </IconButton>
    </>
  );
}

export default DeleteIconButton;
