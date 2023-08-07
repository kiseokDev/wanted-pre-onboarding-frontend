import React, { useState } from 'react'
import { TodoType } from '../../types'
import { TodoAPI } from '../../api';
type OnInsertType = (todo: TodoType) => void

export default function TodoInsert({ onInsert }: { onInsert: OnInsertType }) {
    const [newTodo, setNewTodo] = useState('');
    const todoAPI = new TodoAPI();
    const handleAddClick = async () => {
        if (newTodo.trim() === '') return; // Empty input handling
        try {
            const response = await todoAPI.createTodoApi({ todo: newTodo });

            if (response.status === 201) {
                setNewTodo('')
                onInsert(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="flex items-center bg-gray-200 p-2 rounded-md shadow-sm my-2">
            <input
                className="flex-grow p-2 rounded-md border border-gray-300 mr-2"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="새로운 할 일 입력"
                data-testid="new-todo-input"
            />
            <button
                className="bg-green-500 text-white p-2 rounded-md"
                onClick={handleAddClick}
                data-testid="new-todo-add-button"
            >
                추가
            </button>
        </div>
    )
}
