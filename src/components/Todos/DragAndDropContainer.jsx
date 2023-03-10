import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Todo from "./Todo";
import BackDrop from "../Global/BackDrop";
import { useUpdateTodoMutation } from "../../redux/api/todoApi";

const DragItem = styled.div``;

function DragAndDropContainer({ todos }) {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const onDragEnd = (result) => {
    // if the user drops the todo card outside of a droppable destination
    if (!result.destination) return;

    // if the user didnt change the position of the todo card
    if (result.destination.index === result.source.index) return;

    // If the user drop in a different postion then reorder the todo list
    const newItems = Array.from(todos);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    // update each todo position based on thier index
    newItems.forEach((item, index) => {
      let payload = { payload: { pos: index + 1 }, id: item.id };
      updateTodo(payload);
    });
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos?.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided, snapshot) => (
                    <DragItem
                      ref={provided.innerRef}
                      snapshot={snapshot}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Todo todo={todo} key={`todo-${todo.id}`} />
                    </DragItem>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <BackDrop open={isLoading} />
    </div>
  );
}

export default DragAndDropContainer;
