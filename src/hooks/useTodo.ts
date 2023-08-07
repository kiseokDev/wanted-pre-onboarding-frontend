// hooks/useTodo.ts
import {useState} from "react";
import {TodoType} from "../types";
import {TodoAPI} from "../api";

export default function useTodo(todo: TodoType, onToggle: (id: number) => void, onUpdate: (todo: TodoType) => void, onDelete: (id: number) => void) {
  const [isEditing, setIsEditing] = useState(false);
  const api = new TodoAPI();

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleToggle = async () => {
    const response = await api.updateTodoApi(todo.id, {todo: todo.todo, isCompleted: !todo.isCompleted});
    if (response.status === 200) {
      onToggle(response.data.id);
    }
  };

  const handleUpdate = async (editText: string) => {
    const response = await api.updateTodoApi(todo.id, {todo: editText, isCompleted: todo.isCompleted});
    if (response.status === 200) {
      onUpdate(response.data);
      setIsEditing(false);
    }
  };
  const handleDelete = async () => {
    const response = await api.deleteTodoApi(todo.id);
    if (response.status === 204) {
      onDelete(todo.id);
    }
  };

  return {
    isEditing,
    handleDelete,
    handleEdit,
    handleCancel,
    handleToggle,
    handleUpdate,
  };
}
