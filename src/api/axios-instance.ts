import axios, {AxiosInstance, AxiosError} from "axios";
import API from "./url";

export function createAPI(): AxiosInstance {
  const instance = axios.create({
    baseURL: API.BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(
    //공통 에러 핸들링
    function (response) {
      return response;
    },
    function (error: AxiosError) {
      //   if (error.response) {
      //     switch (error.response.status) {
      //       case 401:
      //         console.log(error);
      //         // history.push("/401");
      //         break;
      //       case 404:
      //         console.log(error);
      //         // history.push("/404");
      //         break;
      //       default:
      //         console.log(error.response.data);
      //         console.log(error.response.status);
      //         console.log(error.response.headers);
      //     }
      //   } else if (error.request) {
      //     console.log(error.request);
      //   } else {
      console.log("Error", error.message);
      //   }

      return Promise.reject(error);
    }
  );

  return instance;
}
