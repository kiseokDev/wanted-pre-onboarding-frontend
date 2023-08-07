import {TodoType} from "../../types";

const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

type ActionType =
  | {type: "TOGGLE_TODO"; id: number}
  | {type: "ADD_TODO"; todo: TodoType}
  | {type: "DELETE_TODO"; id: number}
  | {type: "RESET"; todos: TodoType[]};

export function todoReducer(state: TodoType[], action: ActionType): TodoType[] {
  switch (action.type) {
    case "TOGGLE_TODO":
      // return state.find
      return state.map((todo) => (todo.id === action.id ? {...todo, isCompleted: !todo.isCompleted} : todo));
    case "ADD_TODO":
      return [...state, action.todo];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "RESET":
      return action.todos;
    default:
      return state;
  }
}

type AddTodoAction = {
  type: "ADD_TODO";
  todo: TodoType;
};
type ToggleTodoAction = {
  type: "TOGGLE_TODO";
  id: number;
};
type DeleteTodoAction = {
  type: "DELETE_TODO";
  id: number;
};

export function addTodo(todo: TodoType): AddTodoAction {
  return {
    type: ADD_TODO,
    todo,
  };
}
export function toggleTodo(id: number): ToggleTodoAction {
  console.log("toggle");
  return {
    type: TOGGLE_TODO,
    id,
  };
}
export function deleteTodo(id: number): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    id,
  };
}
