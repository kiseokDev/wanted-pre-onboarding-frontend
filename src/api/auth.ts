import {createAPI} from "./axios-instance";
import API from "./url";

type AuthPayload = {email: string; password: string};

export class AuthAPI {
  private api = createAPI();

  async signUpApi(payload: AuthPayload) {
    return this.api.post(`${API.AUTH}/signup`, payload);
  }

  async signInApi(payload: AuthPayload) {
    return this.api.post(`${API.AUTH}/signin`, payload);
  }
}
