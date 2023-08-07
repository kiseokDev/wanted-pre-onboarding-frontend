import {useReducer} from "react";
import {addTodo, deleteTodo, todoReducer, toggleTodo, updateTodo, initTodo} from "../features";
import {TodoType} from "../types";

type UseReducerHookType = [
  todos: TodoType[],
  onInit: (todos: TodoType[]) => void,
  onInsert: (todo: TodoType) => void,
  onToggle: (id: number) => void,
  onDelete: (id: number) => void,
  onUpdate: (todo: TodoType) => void
];

export default function useReducerHook(): UseReducerHookType {
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
