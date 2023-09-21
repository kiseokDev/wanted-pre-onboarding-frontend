import {useCallback, useReducer} from "react";
import { todoReducer, addTodoAction, deleteTodoAction,toggleTodoAction, updateTodoAction, initTodoAction} from "../features";
import {TodoType} from "../types";

 type UseTodoReducerHookType = [
  todos: TodoType[],
  onInit: (todos: TodoType[]) => void,
  onInsert: (todo: TodoType) => void,
  onToggle: (id: number) => void,
  onDelete: (id: number) => void,
  onUpdate: (todo: TodoType) => void
];

export default function useCustomReducer(): UseTodoReducerHookType {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const onInit = useCallback((todos: TodoType[]) => {
    dispatch(initTodoAction(todos));
  },[]);

  const onInsert = (todo: TodoType) => {
    dispatch(addTodoAction(todo));
  };

  const onToggle = (id: number) => {
    dispatch(toggleTodoAction(id));
  };

  const onDelete = (id: number) => {
    dispatch(deleteTodoAction(id));
  };

  const onUpdate = (todo: TodoType) => {
    dispatch(updateTodoAction(todo));
  };

  return [todos, onInit, onInsert, onToggle, onDelete, onUpdate];
}
