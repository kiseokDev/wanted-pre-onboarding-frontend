import {useQuery, useMutation, useQueryClient} from "react-query";
import {TodoAPI} from "../api";
import {TodoType} from "../types";

export default function useTodoWithReactQuery(): [TodoType[], typeof handleInsert, typeof handleToggle, typeof handleUpdate, typeof handleDelete] {
  const api = new TodoAPI();
  const queryClient = useQueryClient();

  // Fetching todos
  const {data: todos = []} = useQuery("todos", () => api.getAllTodosApi().then((res) => res.data));
  // Inserting new todo
  const insertTodoMutation = useMutation<TodoType, unknown, string>((newTodo: string) => api.createTodoApi({todo: newTodo}).then((res) => res.data), {
    onSuccess: (data: TodoType) => {
      queryClient.setQueryData("todos", (oldData: TodoType[] = []) => [...oldData, data]);
    },
  });
  // Toggling todo completion
  const toggleTodoMutation = useMutation((todo: TodoType) => api.updateTodoApi(todo.id, {todo: todo.todo, isCompleted: !todo.isCompleted}), {
    onSuccess: (response, variables) => {
      const updatedTodo = response.data; // Extracting the actual data from AxiosResponse
      queryClient.setQueryData("todos", (oldData: TodoType[] = []) => oldData.map((item) => (item.id === variables.id ? updatedTodo : item)));
    },
  });
  // Updating todo
  const updateTodoMutation = useMutation(
    ({editText, todo}: {editText: string; todo: TodoType}) => api.updateTodoApi(todo.id, {todo: editText, isCompleted: todo.isCompleted}),
    {
      onSuccess: (response) => {
        const updatedTodo = response.data; // Extract the actual data from AxiosResponse
        queryClient.setQueryData("todos", (oldData: TodoType[] = []) => oldData.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)));
      },
    }
  );
  // Deleting todo
  const deleteTodoMutation = useMutation((id: number) => api.deleteTodoApi(id), {
    onSuccess: (_, variables) => {
      queryClient.setQueryData("todos", (oldData: TodoType[] = []) => oldData.filter((item) => item.id !== variables));
    },
  });

  const handleInsert = async (newTodo: string, setNewTodo: React.Dispatch<React.SetStateAction<string>>) => {
    if (newTodo.trim() === "") return;
    await insertTodoMutation.mutateAsync(newTodo);
    setNewTodo("");
  };

  const handleToggle = async (todo: TodoType) => {
    await toggleTodoMutation.mutateAsync(todo);
  };

  const handleUpdate = async (editText: string, todo: TodoType, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) => {
    await updateTodoMutation.mutateAsync({editText, todo});
    setIsEditing(false);
  };

  const handleDelete = async (todo: TodoType) => {
    await deleteTodoMutation.mutateAsync(todo.id);
  };
  return [todos, handleInsert, handleToggle, handleUpdate, handleDelete];
}
