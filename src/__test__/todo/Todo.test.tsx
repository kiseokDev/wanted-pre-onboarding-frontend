import { fireEvent, getAllByText, getByText, render, screen, waitFor, within } from "@testing-library/react";
import { TestApp } from "../TestApp";
import { testMockApiDefaultOption } from "../auth/util";
import { act } from "react-dom/test-utils";
import nock from "nock";
import { idText, isTryStatement } from "typescript";
import { isGeneratorFunction } from "util/types";
import { totalmem } from "os";
import exp from "constants";


describe("Todo 컴포넌트 테스트", () => {
    beforeEach(() => {
        Storage.prototype.getItem = jest.fn(() => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0QGdtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNjkxOTg3NzMxLCJleHAiOjE2OTI1OTI1MzF9.CE0tzzngOtXiRsdYLmpczDjs96R9MxbvkJPaXLyR9nc');

        testMockApiDefaultOption("/todos")
            .post('/todos', { todo: "새로운 TODO" })
            .reply(201, {
                "id": 1,
                "todo": "새로운 TODO",
                "isCompleted": false,
                "userId": 1
            });

    });
    afterEach(() => {
        nock.cleanAll();
        nock.restore();
    })

    //assignment5
    it("todo페이지에 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button이 있다", () => {
        const { getByTestId } = render(<TestApp path="/todo" />);
        const todoInput = getByTestId("new-todo-input");
        const todoAddButton = getByTestId("new-todo-add-button");
        expect(todoInput).toBeInTheDocument();
        expect(todoAddButton).toBeInTheDocument();
    });

    //assignment6-2
    it("추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가된다", async () => {
        const { getByTestId } = render(<TestApp path="/todo" />);

        // given 
        const todoInput = getByTestId("new-todo-input");
        const todoAddButton = getByTestId("new-todo-add-button");

        // when
        await act(async () => {
            fireEvent.change(todoInput, { target: { value: "새로운 TODO" } });
            fireEvent.click(todoAddButton);
        });

        // then
        await waitFor(() => {
            expect(screen.getAllByText('새로운 TODO')[0]).toBeInTheDocument();
        })
    })

    //assignment7
    it("TODO의 체크박스를 통해 완료 여부를 수정할 수 있다.", async () => {
        // Extract rerender method along with other utilities
        const { getAllByTestId, rerender } = render(<TestApp path="/todo" />);

        // given
        const todoCheckbox = await waitFor(() => getAllByTestId("todo-checkbox")[0] as HTMLInputElement);
        const initialCheckedStatus = todoCheckbox.checked;

        await act(async () => {
            fireEvent.click(todoCheckbox);
        });

        await waitFor(() => {
            expect(todoCheckbox.checked).toBe(!initialCheckedStatus);
        });
        // Act: Re-render the component using rerender method
        rerender(<TestApp path="/todo" />);

        //then 
        // Get the checkbox again after re-render
        const reRenderedCheckbox = await waitFor(() => getAllByTestId("todo-checkbox")[0] as HTMLInputElement);
        const initialReRenderedCheckedStatus = reRenderedCheckbox.checked;

        // // Assert: It should still be checked after re-render
        expect(initialReRenderedCheckedStatus).toBe(!initialCheckedStatus);
    });

    //assignment8
    it("TODO ITEM 수정버튼과 삭제버튼이 존재한다", async () => {
        // given
        const { getAllByTestId } = render(<TestApp path="/todo" />);

        // when
        const todoModifyButton = await waitFor(() => getAllByTestId("modify-button")[0] as HTMLInputElement);
        const todoDeleteButton = await waitFor(() => getAllByTestId("delete-button")[0] as HTMLInputElement);

        // then
        expect(todoModifyButton).toBeInTheDocument();
        expect(todoDeleteButton).toBeInTheDocument();
    });

    //assignment10
    it("TODO ITEM 수정버튼을 클릭하면 TODO ITEM의 내용을 수정할 수 있다", async () => {
        const { getAllByTestId, getByTestId } = render(<TestApp path="/todo" />);
        // given

        // when
        const todoModifyButton = await waitFor(() => getAllByTestId("modify-button")[0] as HTMLInputElement);
        await act(async () => {
            fireEvent.click(todoModifyButton);
        });

        expect(getByTestId("modify-input")).toBeInTheDocument();
        expect(getByTestId("submit-button")).toBeInTheDocument();
        expect(getByTestId("cancel-button")).toBeInTheDocument();
    });

    //assingment9
    it("TODO TIEM의 삭제버튼을 클릭하면 TODO ITEM이 삭제된다", async () => {
        const { getAllByTestId, getByText } = render(<TestApp path="/todo" />);
        // given
        const todoDeleteButtons = await waitFor(() => getAllByTestId("delete-button"));

        // when
        await act(async () => {
            // fireEvent.click(todoDeleteButton);
            todoDeleteButtons.forEach((todoDeleteButton) => {
                fireEvent.click(todoDeleteButton);
            });
        });

        // then
        await waitFor(() => {
            expect(getByText("할 일이 없습니다.")).toBeInTheDocument();
        });
    });

});
