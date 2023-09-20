export type TodoType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

export type ActionType =
  | {type: "TOGGLE_TODO"; id: number}
  | {type: "ADD_TODO"; todo: TodoType}
  | {type: "DELETE_TODO"; id: number}
  | {type: "INIT_TODO"; todos: TodoType[]}
  | {type: "UPDATE_TODO"; todo: TodoType};


export type UseTodoApiHandlerHookType = {
  todos: TodoType[],
  handleInsert: (newTodo: string, setNewTodo: React.Dispatch<React.SetStateAction<string>>) => void,
  handleToggle: (todo: TodoType) => void,
  handleUpdate: (editText: string, todo: TodoType, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) => void,
  handleDelete: (todo: TodoType) => void
};

