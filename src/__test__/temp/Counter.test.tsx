import { act, render, renderHook } from "@testing-library/react";
import Counter, { useCounter } from "./Counter";
import { GetByTestId } from "./auth/util";

describe("Counter 커스텀훅 테스트", () => {
    let result: { current: ReturnType<typeof useCounter> };

    beforeEach(() => {
        result = renderHook(() => useCounter()).result;
    });

    it('카운트의 초기값이 0인지 확인', () => {
        const countValue = result.current.count;
        expect(countValue).toBe(0);
    });

    it('increaseCount 함수 호출 시 카운트가 1 증가하는지', () => {
        act(() => {
            result.current.increaseCount();
        });
        const countValue = result.current.count;
        expect(countValue).toBe(1);
    });

    it('decreaseCount 함수 호출 시 카운트가 1 감소하는지', () => {
        act(() => {
            result.current.decreaseCount();
        });
        const countValue = result.current.count;
        expect(countValue).toBe(-1);
    });
});


describe("Counter 컴포넌트 테스트", () => {
    let getByTestId: GetByTestId;

    beforeEach(() => {
        const rendered = render(<Counter />);
        getByTestId = rendered.getByTestId;
    });

    it('초기 카운트 값이 0인지 확인', () => {
        const countValue = getByTestId('count-value');
        expect(countValue).toHaveTextContent('0');
    });

    it('증가 버튼 클릭 시 카운트가 1 증가하는지', () => {
        const increaseButton = getByTestId('increase-button');
        act(() => {
            // fireEvent.click(increaseButton);
            increaseButton.click();
        });
        const countValue = getByTestId('count-value');
        expect(countValue).toHaveTextContent('1');
    });

    it('감소 버튼 클릭 시 카운트가 1 감소하는지', () => {
        const decreaseButton = getByTestId('decrease-button');
        act(() => {
            decreaseButton.click();
        });
        const countValue = getByTestId('count-value');
        expect(countValue).toHaveTextContent('-1');
    });
});
