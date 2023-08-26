import { render, fireEvent, act, waitFor, Matcher, MatcherOptions } from "@testing-library/react";
import { correctEmail, incorrectEmail, setupApiForSignIn } from "./util";
import { TestApp } from "../TestApp";
import nock from "nock";

let getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement


beforeEach(() => {
    const result = render(
        <TestApp path='/signin' />
    );
    getByTestId = result.getByTestId;
});


describe("로그인 테스트", () => {
    beforeEach(() => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        nock.cleanAll();
        nock.restore();
    });
    it("이메일에 '@'가 포함되지 않으면 로그인 버튼이 비활성화된다", () => {
        // Given
        const emailInput = getByTestId("email-input");
        const signinButton = getByTestId("signin-button");

        // When
        fireEvent.change(emailInput, { target: { value: incorrectEmail } });

        // Then
        expect(signinButton).toBeDisabled();
    });

    it("비밀번호가 8자 미만이면 로그인 버튼이 비활성화된다", () => {
        // Given
        const passwordInput = getByTestId("password-input");
        const signinButton = getByTestId("signin-button");

        // When
        fireEvent.change(passwordInput, { target: { value: "short" } });

        // Then
        expect(signinButton).toBeDisabled();
    });

    it("로그인에 실패하면 에러메시지 alert를 보여준다", async () => {
        // Given
        setupApiForSignIn(incorrectEmail.email, incorrectEmail.password, 404); // error here
        const emailInput = getByTestId("email-input");
        const passwordInput = getByTestId("password-input");
        const signinButton = getByTestId("signin-button");

        // When
        fireEvent.change(emailInput, { target: { value: incorrectEmail.email } });
        fireEvent.change(passwordInput, { target: { value: incorrectEmail.password } });

        await act(async () => {
            fireEvent.click(signinButton);
        });

        // Then
        await waitFor(() => {
            expect(window.alert).toBeCalledWith("이메일 혹은 비밀번호 오류")
        });
    })

    it("로그인에 성공하면 토큰을 로컬스토리지에 저장한후 todo 페이지로 이동한다", async () => {
        Storage.prototype.getItem = jest.fn(() => "token");

        // Given
        setupApiForSignIn(correctEmail.email, correctEmail.password, 200);
        const emailInput = getByTestId("email-input");
        const passwordInput = getByTestId("password-input");
        const signinButton = getByTestId("signin-button");

        // When
        fireEvent.change(emailInput, { target: { value: correctEmail.email } });
        fireEvent.change(passwordInput, { target: { value: correctEmail.password } });

        await act(async () => {
            fireEvent.click(signinButton);
        });

        // Then
        await waitFor(() => {
            expect(localStorage.getItem("access_token")).toEqual("token");
        });
        await waitFor(() => {
            expect(getByTestId("new-todo-input")).toBeInTheDocument();
        });
    });
});

