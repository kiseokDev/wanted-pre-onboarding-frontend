import { useState } from "react";
import { TodoAPI } from "../../api";
import { TodoType } from "../../types";

interface IAppProps {
    todo: TodoType;
    handleCanel: () => void;
    handleUpdate: (editText: string, todo: TodoType, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) => void;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>

}
export default function TodoEdit({ todo, handleCanel, handleUpdate, setIsEditing }: IAppProps) {
    const [editText, setEditText] = useState(todo.todo);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(event.target.value);
    }




    return (
        <>
            <input className="p-2 rounded-md border border-gray-300 flex-grow mr-2" type="text" value={editText} onChange={handleChange} />
            <button className="bg-green-500 text-white p-2 rounded-md" onClick={() => handleUpdate(editText, todo, setIsEditing)}>제출</button>
            <button className="bg-red-500 text-white p-2 rounded-md ml-2" onClick={handleCanel}>취소</button>
        </>
    );
}