import { useState } from "react";
import { TodoAPI } from "../../api";
import { TodoType } from "../../types";

interface IAppProps {
    todo: TodoType;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}


export default function TodoItem({ todo, onDelete, onToggle }: IAppProps) {
    const [isChecked, setIsChecked] = useState(todo.isCompleted);
    const api = new TodoAPI();
    const handleToggle = async () => {
        const resposnt = await api.updateTodoApi(todo.id, { todo: todo.todo, isCompleted: !todo.isCompleted });
        if (resposnt.status === 200) {
            onToggle(todo.id);
            setIsChecked(!isChecked);
        }

    }

    return (
        <li>
            <label>
                {/* <input type="checkbox" checked={todo.isCompleted} onChange={() => console.log("check")} /> */}
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <span>{todo.todo}</span>
            </label>
        </li>
    )
}
