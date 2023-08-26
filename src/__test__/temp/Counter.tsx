import { useState } from 'react'

type CounterHook = { count: number, decreaseCount: () => void, increaseCount: () => void }

export function useCounter(): CounterHook {
    const [count, setCount] = useState(0)

    const decreaseCount = () => setCount(count - 1)
    const increaseCount = () => setCount(count + 1)

    return { count, decreaseCount, increaseCount }
}


export default function Counter() {
    const { count, decreaseCount, increaseCount } = useCounter()

    return (
        <div>
            <h1 data-testid="count-value">{count}</h1>
            <button data-testid="increase-button" onClick={increaseCount}>+</button>
            <button data-testid="decrease-button" onClick={decreaseCount}>-</button>
        </div>
    )
}

