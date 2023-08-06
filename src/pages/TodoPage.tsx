import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '../components';
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
                setTodos(response.data); // 받아온 todos 데이터를 상태에 저장
            } catch (error) {
                console.error(error);
                // 오류 처리 (예: 알림 표시)
            }
        };

        fetchTodos();
    }, []);


    const handleInputChange = (e: any) => {
        setNewTodo(e.target.value);
    };

    const handleAddClick = async () => {
        if (newTodo.trim() === '') return; // Empty input handling

        const token = localStorage.getItem('access_token'); // Assuming JWT is stored in local storage

        try {
            // const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/todos`, { todo: newTodo }, {
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json',
            //     },
            // });
            const response = await todoAPI.createTodoApi({ todo: newTodo });

            if (response.status === 201) {
                // setTodos([...todos, response.data]);
                console.log(response.data)  //
                setNewTodo('');
            }
        } catch (error) {
            console.error(error);
            // Handle the error (e.g., show an error message)
        }
    };


    return (
        <div>
            <input value={newTodo} onChange={handleInputChange} placeholder="새로운 할 일 입력" data-testid="new-todo-input" />
            <button onClick={handleAddClick} data-testid="new-todo-add-button">추가</button>
            <ul>
                {todos.map((todo: TodoType, index) => (
                    <Todo key={index} todo={todo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoPage;
