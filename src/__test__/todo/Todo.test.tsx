import { fireEvent, getAllByText, render, screen, waitFor, within } from "@testing-library/react";
import { TestApp } from "../TestApp";
import { testMockApiDefaultOption } from "../auth/util";
import { act } from "react-dom/test-utils";
import nock from "nock";


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

    it("/todo경로에 접속하면 TodoInsert Component가 렌더링 된다", () => {
        const { getByTestId } = render(<TestApp path="/todo" />);
        const todoInput = getByTestId("new-todo-input");
        const todoAddButton = getByTestId("new-todo-add-button");
        expect(todoInput).toBeInTheDocument();
        expect(todoAddButton).toBeInTheDocument();
    });

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

    it("TODO의 체크박스를 통해 완료 여부를 수정할 수 있다.", async () => {
        const { getByTestId, getAllByTestId } = render(<TestApp path="/todo" />);
        // given
        const todoCheckbox = await waitFor(() => getAllByTestId("todo-checkbox")[0] as HTMLInputElement);
        // when
        const initialCheckedStatus = todoCheckbox.checked;
        // then
        if (!initialCheckedStatus) {
            fireEvent.click(todoCheckbox);

            await waitFor(() => {
                expect(todoCheckbox).toBeChecked();
            });

            fireEvent.click(todoCheckbox);

            await waitFor(() => {
                expect(todoCheckbox).not.toBeChecked();
            });

        } else {
            fireEvent.click(todoCheckbox);

            await waitFor(() => {
                expect(todoCheckbox).not.toBeChecked();
            });

            fireEvent.click(todoCheckbox);

            await waitFor(() => {
                expect(todoCheckbox).toBeChecked();
            });
        }
    });

});