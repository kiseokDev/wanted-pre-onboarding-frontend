import { useState } from "react";
import { TodoAPI } from "../../api";
import { TodoType } from "../../types";

interface IAppProps {
    todo: TodoType;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}


export default function TodoItem({ todo, onDelete, onToggle }: IAppProps) {
    const api = new TodoAPI();
    const handleToggle = async () => {
        const response = await api.updateTodoApi(todo.id, { todo: todo.todo, isCompleted: !todo.isCompleted });
        if (response.status === 200) {
            onToggle(todo.id);
            // setIsChecked(!isChecked);
        }

    }

    const handleDelete = async () => {
        const response = await api.deleteTodoApi(todo.id);
        if (response.status === 204) {
            onDelete(todo.id);
        }
    }
    return (
        <li>
            <label>
                {/* <input type="checkbox" checked={todo.isCompleted} onChange={() => console.log("check")} /> */}
                <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={handleToggle}
                />
                <span>{todo.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button data-testid="delete-button" onClick={handleDelete}>삭제</button>
        </li>
    )
}
