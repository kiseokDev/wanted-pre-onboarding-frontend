import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '../components';
import { TodoType } from '../types';


const TodoPage = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('jwt'); // 로컬 스토리지에서 토큰 가져오기
                const response = await axios.get('/todos', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTodos(response.data); // 받아온 todos 데이터를 상태에 저장
            } catch (error) {
                console.error(error);
                // 오류 처리 (예: 알림 표시)
            }
        };

        fetchTodos();
    }, []);

    return (
        <div>
            <ul>
                {todos.map((todo: TodoType, index) => (
                    <Todo key={index} todo={todo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoPage;
