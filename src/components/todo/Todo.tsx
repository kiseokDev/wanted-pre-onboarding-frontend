import { TodoType } from "../../types";

export default function Todo({ todo }: { todo: TodoType }) {

    return (
        <li>
            <label>
                <input type="checkbox" checked={todo.isCompleted} onChange={() => console.log("check")} />
                {/* <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => setIsCompleted(!todo.isCompleted)}
                /> */}
                <span>{todo.todo}</span>
            </label>
        </li>
    )
}
