import { render, fireEvent, act, waitFor, Matcher, MatcherOptions } from "@testing-library/react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { SignInPage, TodoPage } from "../../pages";
import { correctEmail, incorrectEmail, setupApiForSignIn } from "./util";
import { createMemoryHistory } from 'history';

let getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement
const history = createMemoryHistory({ initialEntries: ['/signin'] });


beforeEach(() => {
    const result = render(
        <Router navigator={history} location={history.location}>
            <Routes>
                <Route path="/" element={<Navigate to="/signin" />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/todo" element={<TodoPage />} />
            </Routes>
        </Router>
    );
    getByTestId = result.getByTestId;
});


describe("로그인 테스트", () => {
    beforeEach(() => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        (console.error as jest.Mock).mockRestore();
    });
    it("이메일에 '@'가 포함되지 않으면 로그인 버튼이 비활성화된다", () => {
        // Given
        const emailInput = getByTestId("email-input");
        const signinButton = getByTestId("signin-button");

        // When
        fireEvent.change(emailInput, { target: { value: "incorrectEmail.com" } });

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
        fireEvent.change(emailInput, { target: { value: "incorrect@Email.email" } });
        fireEvent.change(passwordInput, { target: { value: incorrectEmail.email } });

        await act(async () => {
            fireEvent.click(signinButton);
        });

        // Then
        await waitFor(() => expect(window.alert).toHaveBeenCalledWith("이메일 혹은 비밀번호 오류"));
    })

    it("로그인에 성공하면 토큰을 로컬스토리지에 저장한후 todo 페이지로 이동한다", async () => {
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
        await waitFor(() => expect(localStorage.getItem("access_token")).toEqual("token"));
        expect(history.location.pathname).toBe('/todo');
    });

});
