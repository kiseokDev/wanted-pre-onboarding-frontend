import { TodoType } from "../../types";

interface Props {
    todo: TodoType;
    handleEdit: () => void;
    handleToggle: (todo: TodoType) => void;
    handleDelete: (todo: TodoType) => void;
}

export default function TodoItem({ todo, handleDelete, handleEdit, handleToggle }: Props) {
    return (
        <>
            <label className="flex-grow">
                <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleToggle(todo)}
                />
                <span>{todo.todo}</span>
            </label>
            <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleEdit}>수정</button>
            <button className="bg-red-500 text-white p-2 rounded-md ml-2" onClick={() => handleDelete(todo)}>삭제</button>
        </>
    );
}