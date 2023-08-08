import axios, {AxiosInstance, AxiosError} from "axios";
import API from "./url";

export function createAPI(): AxiosInstance {
  const instance = axios.create({
    baseURL: API.SERVER_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error: AxiosError) {
      console.log("Error", error.message);
      return Promise.reject(error);
    }
  );

  return instance;
}
