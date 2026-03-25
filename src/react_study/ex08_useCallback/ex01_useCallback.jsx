import { useCallback, useState, memo } from "react";

function Child({ onClick }) {
    console.log('Child 렌더링');
    return (
        <div>
            <button onClick={onClick}>+ 1</button>
        </div>
    )
}

const MemoChild = memo(Child);

export default function UseCallbackEx() {
    const [count, setCount] = useState(0);
    const [label, setLabel] = useState("라벨");

    const habldeAdd = useCallback(() => {
        setCount(c => c + 1)
    }, [])
    return (
        <div>
            <h3>카운트: {count}</h3>
            <p>라벨: {label}</p>
            <Child onClick={habldeAdd} />
            <button onClick={() => setLabel(prev => prev + "!")}>
                라벨 변경
            </button>
        </div>
    )
}
