import { TodoType } from '../../types';
import TodoInsert from './TodoInsert';
import TodoContainer from './TodoContainer';
import { useTodoWithReactQuery } from '../../hooks';
import useTodo from '../../hooks/useTodo';

export default function TodoList() {
    // const [todos, handleInsert, handleToggle, handleUpdate, handleDelete] = useTodoWithReactQuery();
    const {todos,  handleInsert, handleToggle, handleUpdate, handleDelete} = useTodo();

    return (
        <div>
            <TodoInsert handleInsert={handleInsert}></TodoInsert>
            {todos?.length === 0 ? <p>할 일이 없습니다.</p> : <ul data-testid="todo-list">
                {todos.map((todo: TodoType, index: number) => (
                    <TodoContainer
                        key={index}
                        todo={todo}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                        handleToggle={handleToggle}
                    />
                ))}
            </ul>}
        </div >
    );
}
