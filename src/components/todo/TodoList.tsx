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

            <ul>
                {todos.map((todo: TodoType, index) => (
                    <TodoContainer key={index} todo={todo} handleDelete={handleDelete} handleUpdate={handleUpdate} handleToggle={handleToggle} />
                ))}
            </ul>
        </div >
    );
}
