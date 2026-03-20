import { useEffect, useState } from "react";

export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRuuning] = useState(false);

    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => setSeconds(prev => prev + 1), 1000);
            console.log("Timer Start")
            return () => {
                clearInterval(id)
                console.log("Clean Up!!")
            }
        }
    }, [isRunning])

    return (
        <div>
            <h1>{seconds}초</h1>
            <button onClick={() => setIsRuuning(prev => !prev)}>
                {isRunning ? '정지' : '시작'}
            </button>
        </div>
    )
};