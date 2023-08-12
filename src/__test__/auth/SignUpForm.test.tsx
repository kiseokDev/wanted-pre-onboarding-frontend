import { Matcher, MatcherOptions, fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter, MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignInPage, SignUpPage } from "../../pages";
import { AuthProvider } from "../../components";
import { AppRoutes } from "../../App";


describe("회원가입 실패 테스트", () => {
    let getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement
    beforeEach(() => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
        getByTestId = render(
            <AuthProvider>
                <MemoryRouter initialEntries={['/signup']}>
                    <AppRoutes />
                </MemoryRouter>
            </AuthProvider>
        ).getByTestId
    });
    // it("회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되엇을 시 /signin 페이지로 이동한다", async () => {
    it('회원가입 페이지에서 회원가입시 이미 존재하는 이메일이 있으면 에러 alert를 보여준다', async () => {

        // Given

        const signupButton = getByTestId("signup-button");

        // When
        const emailInput = getByTestId("email-input");
        const passwordInput = getByTestId("password-input");

        fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
        fireEvent.change(passwordInput, { target: { value: "12345678" } });

        await act(async () => {
            fireEvent.click(signupButton);
        });

        // Then
        await waitFor(() => {
            expect(window.alert).toBeCalledWith('동일한 이메일이 이미 존재합니다.');
        })
    });

    // it('회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 /signin 경로로 이동한다', async () => {
    //     // Given
    //     const signupButton = getByTestId("signup-button");

    //     // When
    //     const emailInput = getByTestId("email-input");
    //     const passwordInput = getByTestId("password-input");

    //     fireEvent.change(emailInput, { target: { value: "회원가입@6" } });
    //     fireEvent.change(passwordInput, { target: { value: "12345678" } });

    //     await act(async () => {
    //         fireEvent.click(signupButton);
    //     });

    //     // Then
    //     await waitFor(() => {
    //         expect(window.location.pathname).toBe('/signin');
    //     })
    // });
});