import {Matcher, MatcherOptions} from "@testing-library/react";
import nock from "nock";

export const testMockApiDefaultOption = (url: string) =>
  nock("http://localhost:8000")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    })
    .options(url)
    .reply(200);

export const setupApiForSignIn = (email: string, password: string, status: 404 | 200) => {
  if (status === 404) {
    testMockApiDefaultOption("/auth/signin")
      .post("/auth/signin", {email, password}) // this accurs error
      .reply(404, {
        statusCode: 404,
        message: "해당 사용자가 존재하지 않습니다.",
        error: "Not Found",
      });
  } else if (status === 200) {
    testMockApiDefaultOption("/auth/signin").post("/auth/signin", {email, password}).reply(200, {access_token: "token"});
  }
};

export const correctEmail = {
  email: "test1234@gmail.com",
  password: "12345678",
};

export const incorrectEmail = {
  email: "13213213@123123",
  password: "123123123",
};

export type GetByTestId = (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement;
