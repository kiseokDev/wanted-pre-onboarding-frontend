import React, { useEffect, useReducer, useState } from 'react'
import { addTodo, deleteTodo, todoReducer, toggleTodo, updateTodo } from '../../features';
import { TodoAPI } from '../../api';
import { TodoType } from '../../types';
import TodoInsert from './TodoInsert';
import TodoItem from './TodoItem';
import TodoContainer from './TodoContainer';
import useReducerHook from '../../hooks/useReducerHook';

export default function TodoList() {
    const todoAPI = new TodoAPI();
    const [todos, onInit, onInsert, onToggle, onDelete, onUpdate] = useReducerHook()
    // const [todos, dispatch] = useReducer(todoReducer, []);
    // const onInsert = (todo: TodoType) => {
    //     dispatch(addTodo(todo));
    // };

    // const onToggle = (id: number) => {
    //     dispatch(toggleTodo(id));
    // };
    // const onDelete = (id: number) => {
    //     dispatch(deleteTodo(id));
    // };
    // const onUpdate = (todo: TodoType) => {
    //     dispatch(updateTodo(todo));
    // }

    useEffect(() => {
        (async () => {
            try {
                const response = await todoAPI.getAllTodosApi(); // API 호출
                onInit(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    // todos가 아직 정의되지 않았다면 로딩중임을 표시


    return (
        <div>
            <TodoInsert onInsert={onInsert} />

            <ul>
                {todos.map((todo: TodoType, index) => (
                    <TodoContainer key={index} todo={todo} onUpdate={onUpdate} onToggle={onToggle} onDelete={onDelete} />
                ))}
            </ul>
        </div >
    );
}
