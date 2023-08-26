import React, {useEffect, useState} from "react";
import {TodoAPI} from "../api";
import useReducerHook from "./useReducerHook";
import {TodoType, UseTodoApiHandlerHookType} from "../types";

export default function useTodo(): UseTodoApiHandlerHookType {
  const [todos, onInit, onInsert, onToggle, onDelete, onUpdate] = useReducerHook();
  const api = new TodoAPI();

  const useHandleInit = () => {
    useEffect(() => {
      (async () => {
        try {
          const response = await api.getAllTodosApi(); // API 호출
          onInit(response.data);
        } catch (error) {
          console.error(error);
        }
      })();
    }, []);
  };

  const handleInsert = async (newTodo: string, setNewTodo: React.Dispatch<React.SetStateAction<string>>) => {
    if (newTodo.trim() === "") return; // Empty input handling
    try {
      const response = await api.createTodoApi({todo: newTodo});

      if (response.status === 201) {
        setNewTodo("");
        onInsert(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (todo: TodoType) => {
    const response = await api.updateTodoApi(todo.id, {todo: todo.todo, isCompleted: !todo.isCompleted});
    if (response.status === 200) {
      onToggle(response.data.id);
    }
  };

  const handleUpdate = async (editText: string, todo: TodoType, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) => {
    const response = await api.updateTodoApi(todo.id, {todo: editText, isCompleted: todo.isCompleted});
    if (response.status === 200) {
      onUpdate(response.data);
      setIsEditing(false);
    }
  };

  const handleDelete = async (todo: TodoType) => {
    const response = await api.deleteTodoApi(todo.id);
    if (response.status === 204) {
      onDelete(todo.id);
    }
  };

  return [todos, useHandleInit, handleInsert, handleToggle, handleUpdate, handleDelete];
}
