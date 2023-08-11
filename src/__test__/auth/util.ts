import {Matcher, MatcherOptions} from "@testing-library/react";
import nock from "nock";

export const testApiDefaultOption = nock("http://localhost:8000")
  .defaultReplyHeaders({
    "access-control-allow-origin": "*",
    "access-control-allow-credentials": "true",
  })
  .options("/auth/signin")
  .reply(
    200,
    {},
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }
  );

type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;
export const setupApiForSignIn = (email: string, password: string, status: StatusCode) => {
  // Handle OPTIONS (preflight) request
  testApiDefaultOption.options("/auth/signin").reply(
    200,
    {},
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, accept, content-type, authorization",
    }
  );

  if (status === 404) {
    // testApiDefaultOption.post("/auth/signin", {email, password}).reply(401, {
    testApiDefaultOption
      .post("/auth/signin", (body) => body.email && body.password)
      .reply(404, {
        statusCode: 404,
        message: "해당 사용자가 존재하지 않습니다.",
        error: "Not Found",
      });
  } else if (status === 200) {
    testApiDefaultOption.post("/auth/signin", (body) => body.email && body.password).reply(200, {access_token: "token"});
  }
};

export const correctEmail = {
  email: "correct@gmail.com",
  password: "12345678",
};

export const incorrectEmail = {
  email: "13213213@123123",
  password: "123123123",
};

export type GetByTestId = (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement;
