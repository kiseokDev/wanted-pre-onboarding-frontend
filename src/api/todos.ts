import {AxiosResponse} from "axios";
import {createAPI} from "./axios-instance";
import API from "./url";
import {TodoType} from "../types";

type CreateTodoPayload = {todo: string};
type UpdateTodoPayload = {todo: string; isCompleted: boolean};

export class TodoAPI {
  private api = createAPI();

  async createTodoApi(payload: CreateTodoPayload): Promise<AxiosResponse<TodoType>> {
    return this.api.post(API.TODO, payload);
  }

  async getAllTodosApi(): Promise<AxiosResponse<TodoType[]>> {
    return this.api.get(API.TODO);
  }

  async updateTodoApi(id: number, payload: UpdateTodoPayload): Promise<AxiosResponse<TodoType>> {
    return this.api.put(`${API.TODO}/${id}`, payload);
  }

  async deleteTodoApi(id: number): Promise<AxiosResponse> {
    return this.api.delete(`${API.TODO}/${id}`);
  }
}
