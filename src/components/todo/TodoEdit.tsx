import { useEffect, useRef, useState } from "react";
import { TodoAPI } from "../../api";
import { TodoType } from "../../types";

interface Props {
    todo: TodoType;
    handleCanel: () => void;
    handleUpdate: (editText: string, todo: TodoType, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) => void;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>

}
export default function TodoEdit({ todo, handleCanel, handleUpdate, setIsEditing }: Props) {
    const [editText, setEditText] = useState(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(event.target.value);
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleUpdate(editText, todo, setIsEditing)
        }
    }
    return (
        <>
            <input
                ref={inputRef}
                data-testid="modify-input"
                className="p-2 rounded-md border border-gray-300 flex-grow mr-2" type="text" value={editText}
                onKeyDown={handleKeyPress}
                onChange={handleChange} />
            <button
                data-testid="submit-button"
                className="bg-green-500 text-white p-2 rounded-md"
                onClick={() => handleUpdate(editText, todo, setIsEditing)}>제출
            </button>
            <button
                data-testid="cancel-button"
                className="bg-red-500 text-white p-2 rounded-md ml-2"
                onClick={handleCanel}>취소
            </button>
        </>
    );
}