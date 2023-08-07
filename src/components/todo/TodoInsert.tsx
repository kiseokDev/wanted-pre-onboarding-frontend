import React, { useState } from 'react'
type OnInsertType = (newTodo: string, setNewTodo: React.Dispatch<React.SetStateAction<string>>) => void;

export default function TodoInsert({ handleInsert }: { handleInsert: OnInsertType }) {
    const [newTodo, setNewTodo] = useState('');

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleInsert(newTodo, setNewTodo);
        }
    }

    return (
        <div className="flex items-center bg-gray-200 p-2 rounded-md shadow-sm my-2">
            <input
                className="flex-grow p-2 rounded-md border border-gray-300 mr-2"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="새로운 할 일 입력"
                data-testid="new-todo-input"
                autoComplete="off"
                spellCheck="false"
            />
            <button
                className="bg-green-500 text-white p-2 rounded-md"
                onClick={() => handleInsert(newTodo, setNewTodo)}
                data-testid="new-todo-add-button"
            >
                추가
            </button>
        </div>
    )
}
