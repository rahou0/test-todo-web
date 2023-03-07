import { Checkbox } from "@mui/material";
import React from "react";
import { useUpdateTodoMutation } from "../../../redux/api/todoApi";
import BackDrop from "../../Global/BackDrop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
function TodoStatus({ todo }) {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const handleChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let payload = { completed: !todo.completed };
    const data = { payload, id: todo.id };
    updateTodo(data);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };
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

export default TodoStatus;
