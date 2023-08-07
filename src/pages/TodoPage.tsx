import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TodoItem } from '../components';
import { TodoType } from '../types';
import { TodoAPI } from '../api';


const TodoPage = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const todoAPI = new TodoAPI();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await todoAPI.getAllTodosApi(); // API 호출
                setTodos(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTodos();
    }, []);

    const handleAddClick = async () => {
        if (newTodo.trim() === '') return; // Empty input handling
        try {
            const response = await todoAPI.createTodoApi({ todo: newTodo });

            if (response.status === 201) {
                setNewTodo('')
                setTodos([...todos, response.data]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(todos.length)
    return (
        <div>
            {/* <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="새로운 할 일 입력" data-testid="new-todo-input" />
            <button onClick={handleAddClick} data-testid="new-todo-add-button">추가</button>
            <ul>
                {todos.map((todo: TodoType, index) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </ul> */}
        </div>
    );
};

export default TodoPage;
