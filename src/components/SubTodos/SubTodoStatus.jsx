import { Checkbox } from "@mui/material";
import React from "react";
import BackDrop from "../Global/BackDrop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useUpdateNestedTodoMutation } from "../../redux/api/nestedTodoApi";
function SubTodoStatus({ todo }) {
  const [updateNestedTodo, { isLoading }] = useUpdateNestedTodoMutation();
  const handleChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let payload = { completed: !todo.completed };
    const data = { payload, id: todo.id };
    updateNestedTodo(data);
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

export default SubTodoStatus;
