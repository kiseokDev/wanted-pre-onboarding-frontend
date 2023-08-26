import {ActionType, AddTodoAction, DeleteTodoAction, InitTodoAction, TodoType, ToggleTodoAction, UpdateTodoAction} from "../../types";

const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const INIT_TODO = "INIT_TODO";

export function todoReducer(state: TodoType[], action: ActionType): TodoType[] {
  switch (action.type) {
    case "UPDATE_TODO":
      return state.map((todo) => (todo.id === action.todo.id ? {...todo, todo: action.todo.todo} : todo));
    case "TOGGLE_TODO":
      return state.map((todo) => (todo.id === action.id ? {...todo, isCompleted: !todo.isCompleted} : todo));
    case "ADD_TODO":
      return [...state, action.todo];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "INIT_TODO":
      return action.todos;
    default:
      return state;
  }
}

export function addTodo(todo: TodoType): AddTodoAction {
  return {
    type: ADD_TODO,
    todo,
  };
}
export function toggleTodo(id: number): ToggleTodoAction {
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

export function updateTodo(todo: TodoType): UpdateTodoAction {
  return {
    type: UPDATE_TODO,
    todo,
  };
}

export function initTodo(todos: TodoType[]): InitTodoAction {
  return {
    type: INIT_TODO,
    todos,
  };
}
