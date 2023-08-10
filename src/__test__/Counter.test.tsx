import { act, fireEvent, render, renderHook } from "@testing-library/react";
import Counter, { useCounter } from "./Counter";
import { GetByTestId } from "./auth/util";

describe("Counter Component test", () => {
    let getByTestId: GetByTestId;

    beforeEach(() => {
        const rendered = render(<Counter />);
        getByTestId = rendered.getByTestId;
    });

    it('should render counter', () => {
        const countValue = getByTestId('count-value');
        expect(countValue).toHaveTextContent('0');
    });

    it('should increase count', () => {
        const increaseButton = getByTestId('increase-button');
        act(() => {
            increaseButton.click();
        });
        const countValue = getByTestId('count-value');
        expect(countValue).toHaveTextContent('1');
    });

    it('should decrease count', () => {
        const decreaseButton = getByTestId('decrease-button');
        act(() => {
            decreaseButton.click();
        });
        const countValue = getByTestId('count-value');
        expect(countValue).toHaveTextContent('-1');
    });
});

describe("Counter Hook test", () => {
    let result: { current: ReturnType<typeof useCounter> };

    beforeEach(() => {
        result = renderHook(() => useCounter()).result;
    });

    it('should render counter', () => {
        const countValue = result.current.count;
        expect(countValue).toBe(0);
    });

    it('should increase count', () => {
        act(() => {
            result.current.increaseCount();
        });
        const countValue = result.current.count;
        expect(countValue).toBe(1);
    });

    it('should decrease count', () => {
        act(() => {
            result.current.decreaseCount();
        });
        const countValue = result.current.count;
        expect(countValue).toBe(-1);
    });
});
