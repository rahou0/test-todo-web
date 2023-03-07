import { Checkbox } from "@mui/material";
import React, { useEffect } from "react";
import BackDrop from "../../Global/BackDrop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useUpdateNestedTodoMutation } from "../../../redux/api/nestedTodoApi";
import { show_notification } from "../../../utils/notificationHelper";
function SubTodoStatus({ todo }) {
  const [updateNestedTodo, { isLoading, isSuccess, isError, error }] =
    useUpdateNestedTodoMutation();
  const handleChange = (e) => {
    
    //prevent the Propagation to the parent
    e.stopPropagation();
    e.preventDefault();

    //update the todo complition status
    let payload = { completed: !todo.completed };
    const data = { payload, id: todo.id };
    updateNestedTodo(data);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    if (isSuccess) {
      show_notification("the NestedTodo is successfully updated");
    } else if (isError) {
      show_notification(
        "Failed to update the status of the NestedTodo",
        "error"
      );
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <>
      <Checkbox
        checked={todo?.completed}
        onChange={handleChange}
        onClick={handleClick}
        color="primary"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleOutlineIcon color="primary" />}
      />
      <BackDrop open={isLoading} />
    </>
  );
}

export default SubTodoStatus;
