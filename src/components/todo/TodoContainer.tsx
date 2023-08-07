// import { useState } from "react";
// import { TodoAPI } from "../../api";
// import { TodoType } from "../../types";
// import TodoEdit from "./TodoEdit";
// import TodoItem from "./TodoItem";

// interface IAppProps {
//     todo: TodoType;
//     onDelete: (id: number) => void;
//     onToggle: (id: number) => void;
//     onUpdate: (todo: TodoType) => void;
// }

// export default function TodoContainer({ todo, onDelete, onToggle, onUpdate }: IAppProps) {
//     const api = new TodoAPI();
//     const [isEditing, setIsEditing] = useState(false);
//     const [editText, setEditText] = useState(todo.todo);

//     const handleToggle = async () => {
//         const response = await api.updateTodoApi(todo.id, { todo: todo.todo, isCompleted: !todo.isCompleted });
//         if (response.status === 200) {
//             onToggle(response.data.id);
//         }
//     }

//     const handleDelete = async () => {
//         const response = await api.deleteTodoApi(todo.id);
//         if (response.status === 204) {
//             onDelete(todo.id);
//         }
//     }

//     const handleEdit = () => {
//         setIsEditing(true);
//     }

//     const handleCancel = () => {
//         setIsEditing(false);
//         setEditText(todo.todo);
//     }

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setEditText(event.target.value);
//     }

//     const handleSubmit = async () => {
//         const response = await api.updateTodoApi(todo.id, { todo: editText, isCompleted: todo.isCompleted });
//         if (response.status === 200) {
//             onUpdate(response.data);
//             setIsEditing(false);
//         }
//     }

//     return (
//         <li className="flex justify-between items-center bg-gray-200 my-2 p-2 rounded-md">
//             {isEditing ? (
//                 <>
//                     <input className="p-2 rounded-md border border-gray-300 flex-grow mr-2" type="text" data-testid="modify-input" value={editText} onChange={handleChange} />
//                     <button className="bg-green-500 text-white p-2 rounded-md" data-testid="submit-button" onClick={handleSubmit}>제출</button>
//                     <button className="bg-red-500 text-white p-2 rounded-md ml-2" data-testid="cancel-button" onClick={handleCancel}>취소</button>
//                 </>
//                 // <TodoEdit></TodoEdit>
//             ) : (
//                 <>
//                     <label className="flex-grow">
//                         <input
//                             type="checkbox"
//                             checked={todo.isCompleted}
//                             onChange={handleToggle}
//                         />
//                         <span>{todo.todo}</span>
//                     </label>
//                     <button className="bg-blue-500 text-white p-2 rounded-md" data-testid="modify-button" onClick={handleEdit}>수정</button>
//                     <button className="bg-red-500 text-white p-2 rounded-md ml-2" data-testid="delete-button" onClick={handleDelete}>삭제</button>
//                 </>
//                 // <TodoItem></TodoItem>
//             )}
//         </li>
//     )
// }

import { useState } from "react";
import { TodoType } from "../../types";
import TodoEdit from "./TodoEdit";
import TodoItem from "./TodoItem";

interface IAppProps {
    todo: TodoType;

    handleToggle: (todo: TodoType) => void;
    handleUpdate: (editText: string, todo: TodoType, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) => void;
    handleDelete: (todo: TodoType) => void
}

export default function TodoContainer({ todo, handleUpdate, handleToggle, handleDelete }: IAppProps) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    return (
        <li className="flex justify-between items-center bg-gray-200 my-2 p-2 rounded-md">
            {isEditing ? (
                <TodoEdit
                    todo={todo}
                    handleCanel={handleCancel}
                    handleUpdate={handleUpdate}
                    setIsEditing={setIsEditing}

                />
            ) : (
                <TodoItem
                    todo={todo}
                    handleToggle={handleToggle}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            )}
        </li>
    );
}
