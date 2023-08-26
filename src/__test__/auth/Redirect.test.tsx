//Assignment 4
// 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
// 로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 시켜주세요
// 로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 시켜주세요

import { render, waitFor } from "@testing-library/react";
import { TestApp } from "../TestApp";


describe("로그인 여부에 따른 리다이렉트 처리 테스트", () => {
    it('로컬 스토리지에 토큰이 있는 상태로 /signin 페이지에 접속하면 /todo 경로로 리다이렉트 한다', async () => {
        Storage.prototype.getItem = jest.fn(() => 'mocked_token_value');

        const { getByTestId } = render(
            <TestApp path='/signin' />
        );

        // 경로가 /todo로 바뀌었는지 확인
        await waitFor(() => {
            // `data-testid` 값을 이용하여 해당 요소가 존재하는지 확인합니다.
            expect(getByTestId("new-todo-input")).toBeInTheDocument();
            expect(getByTestId("new-todo-add-button")).toBeInTheDocument();
        });
    });
    it('로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 한다', async () => {

        Storage.prototype.getItem = jest.fn(() => null);
        const { getByTestId } = render(
            <TestApp path='/todo' />
        )

        // 경로가 /todo로 바뀌었는지 확인
        await waitFor(() => {
            // `data-testid` 값을 이용하여 해당 요소가 존재하는지 확인합니다.
            expect(getByTestId("signin-button")).toBeInTheDocument();
        });
    });
});
