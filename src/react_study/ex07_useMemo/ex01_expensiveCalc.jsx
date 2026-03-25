import { useMemo, useState } from "react";

function slowSum(n) {
    console.log('느린 계산 실행');
    let s = 0;
    for (let i = 0; i < 80_000_000; ++i) {
        s = (s + i) % 1_000_000_007;
    }
    return s+n;
}

export default function ExpensiveCalc() {
    const [n, setN] = useState(0);
    const [label, setLabel] = useState("메모");

    // const value = slowSum(n); // 렌더링 될 때마다 무조건 실행됨
    const value = useMemo(() => {
        return slowSum(n);
    }, [n]);
    
    return (
        <div>
            <h3>value: {value}</h3>
            <h3>n: {n}</h3>
            <h3>label: {label}</h3>
            <button onClick={() => setN(prev => prev + 1)}>
                숫자 + 1
            </button>
            <button onClick={() => setLabel(prev => prev + "!")}>
                라벨 변경
            </button>
        </div>
    )
}