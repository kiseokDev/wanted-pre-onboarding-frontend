import { TodoType } from "../../types";

export enum ActionTypes {
  ADD_TODO = 'ADD_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  INIT_TODO = 'INIT_TODO',
}

export type ActionType = 
| { type: ActionTypes.TOGGLE_TODO; payload: number }
| { type: ActionTypes.ADD_TODO; payload: TodoType }
| { type: ActionTypes.DELETE_TODO; payload: number }
| { type: ActionTypes.INIT_TODO; payload: TodoType[] }
| { type: ActionTypes.UPDATE_TODO; payload: TodoType };

export function todoReducer(state: TodoType[], action: ActionType): TodoType[] {
  switch (action.type) {
    case ActionTypes.UPDATE_TODO:
      return state.map((todo) => (todo.id === action.payload.id ? {...todo, todo: action.payload.todo} : todo));
    case ActionTypes.TOGGLE_TODO:
      return state.map((todo) => (todo.id === action.payload ? {...todo, isCompleted: !todo.isCompleted} : todo));
    case ActionTypes.ADD_TODO:
      return [...state, action.payload];
    case ActionTypes.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case ActionTypes.INIT_TODO:
      return action.payload;
    default:
      return state;
  }
}

function createAction<K extends ActionTypes>(type: K) {
  return function <T>(payload: T) {
    return {
      type,
      payload
    };
  };
}

export const addTodoAction = createAction(ActionTypes.ADD_TODO)<TodoType>;
export const toggleTodoAction = createAction(ActionTypes.TOGGLE_TODO)<TodoType["id"]>;
export const deleteTodoAction = createAction(ActionTypes.DELETE_TODO)<TodoType["id"]>;
export const updateTodoAction = createAction(ActionTypes.UPDATE_TODO)<TodoType>;
export const initTodoAction = createAction(ActionTypes.INIT_TODO)<TodoType[]>;
