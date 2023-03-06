import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import React from "react";

function EditIconButton({ onHandleClick }) {
  return (
    <>
      <IconButton onClick={onHandleClick}>
        <EditIcon color="secondary" />
      </IconButton>
    </>
  );
}

export default EditIconButton;
