import {useReducer} from "react";
import {addTodo, deleteTodo, todoReducer, toggleTodo, updateTodo, initTodo} from "../features";
import {TodoType, UseTodoReducerHookType} from "../types";

export default function useReducerHook(): UseTodoReducerHookType {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const onInit = (todos: TodoType[]) => {
    dispatch(initTodo(todos));
  };

  const onInsert = (todo: TodoType) => {
    dispatch(addTodo(todo));
  };

  const onToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const onDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const onUpdate = (todo: TodoType) => {
    dispatch(updateTodo(todo));
  };

  return [todos, onInit, onInsert, onToggle, onDelete, onUpdate];
}
