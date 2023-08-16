import { TodoType } from '../../types';
import TodoInsert from './TodoInsert';
import TodoContainer from './TodoContainer';
import { useApiHandlerHook } from '../../hooks';

export default function TodoList() {
    const [todos, useHandleInit, handleInsert, handleToggle, handleUpdate, handleDelete] = useApiHandlerHook();
    useHandleInit();
    return (
        <div>
            <TodoInsert handleInsert={handleInsert} ></TodoInsert>

            {todos?.length === 0 ? <p>할 일이 없습니다.</p> : <ul data-testid="todo-list">
                {todos.map((todo: TodoType, index) => (
                    <TodoContainer key={index} todo={todo} handleDelete={handleDelete} handleUpdate={handleUpdate} handleToggle={handleToggle} />
                ))}
            </ul>}
        </div >
    );
}
