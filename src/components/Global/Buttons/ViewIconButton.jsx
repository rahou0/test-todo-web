import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";

function ViewIconButton({ onHandleClick }) {
  return (
    <>
      <IconButton onClick={onHandleClick} size="small">
        <VisibilityIcon color="primary" fontSize="small" />
      </IconButton>
    </>
  );
}

export default ViewIconButton;
