import React, { useEffect, useReducer, useState } from 'react'
import { addTodo, deleteTodo, todoReducer, toggleTodo } from '../../features';
import { TodoAPI } from '../../api';
import { TodoType } from '../../types';
import TodoInsert from './TodoInsert';
import TodoItem from './TodoItem';

export default function TodoContainer() {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [isLoaded, setIsLoaded] = useState(false);
    const todoAPI = new TodoAPI();

    useEffect(() => {
        (async () => {
            try {
                const response = await todoAPI.getAllTodosApi(); // API 호출
                dispatch({ type: 'RESET', todos: response.data });
                setIsLoaded(true);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    // todos가 아직 정의되지 않았다면 로딩중임을 표시
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const onInsert = (todo: TodoType) => {
        dispatch(addTodo(todo));
    };

    const onToggle = (id: number) => {
        dispatch(toggleTodo(id));
    };
    const onDelete = (id: number) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div>
            <TodoInsert onInsert={onInsert} />

            <ul>
                {todos.map((todo: TodoType, index) => (
                    <TodoItem key={index} todo={todo} onToggle={onToggle} onDelete={onDelete} />
                ))}
            </ul>
        </div >
    );
}
