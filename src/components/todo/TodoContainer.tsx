import { useState } from "react";
import { TodoType } from "../../types";
import TodoEdit from "./TodoEdit";
import TodoItem from "./TodoItem";

interface IAppProps {
    todo: TodoType;

    handleToggle: (todo: TodoType) => void;
    handleUpdate: (editText: string, todo: TodoType, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) => void;
    handleDelete: (todo: TodoType) => void
}

export default function TodoContainer({ todo, handleUpdate, handleToggle, handleDelete }: IAppProps) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    return (
        <li className="flex justify-between items-center bg-gray-200 my-2 p-2 rounded-md">
            {isEditing ? (
                <TodoEdit
                    todo={todo}
                    handleCanel={handleCancel}
                    handleUpdate={handleUpdate}
                    setIsEditing={setIsEditing}

                />
            ) : (
                <TodoItem
                    todo={todo}
                    handleToggle={handleToggle}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            )}
        </li>
    );
}
