import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Skeleton,
  DialogTitle,
} from "@mui/material";
import React from "react";

function TodoDialogSkeleton() {
  return (
    <>
      <DialogTitle>
        <Skeleton width="40%" variant="rectangular" sx={{ borderRadius: 1 }} />
      </DialogTitle>

      <DialogContent>
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Skeleton
          width={71}
          height={24.5}
          variant="rectangular"
          sx={{ mr: 1, borderRadius: 1 }}
        />

        <Skeleton
          width={64}
          height={36.5}
          variant="rectangular"
          sx={{ borderRadius: 1 }}
        />
      </DialogActions>
    </>
  );
}

export default TodoDialogSkeleton;
