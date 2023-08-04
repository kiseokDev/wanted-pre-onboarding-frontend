import { TodoType } from "../../types";

export default function Todo({ todo }: { todo: TodoType }) {

    return (
        <li>
            <label>
                <input type="checkbox" checked={todo.isCompleted} />
                <span>{todo.todo}</span>
            </label>
        </li>
    )
}
