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
        <>
            <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="새로운 할 일 입력" data-testid="new-todo-input" />
            <button onClick={handleAddClick} data-testid="new-todo-add-button">추가</button>
        </>
    )
}
