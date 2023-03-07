import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import React from "react";

function EditIconButton({ onHandleClick }) {
  return (
    <>
      <IconButton onClick={onHandleClick} size="small">
        <EditIcon color="secondary" fontSize="small" />
      </IconButton>
    </>
  );
}

export default EditIconButton;
