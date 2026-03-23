/*
 * 1. 상태(State) 관리
 *    - seconds      : 현재 경과 시간 (0.01초 단위 숫자)
 *    - isRunning    : 타이머 실행 여부 (true=시작, false=정지)
 *    - laps         : 기록된 랩 타임 배열 (누적 보존)
 *
 * 2. useEffect + setInterval (타이머 핵심)
 *    - isRunning이 true가 될 때마다 useEffect 재실행
 *    - setInterval을 10ms(0.01초) 간격으로 실행
 *      → prev + 0.01을 더해 seconds 갱신
 *    - isRunning이 false가 되면 cleanup 함수(clearInterval)로 타이머 정지
 *    - 의존성 배열 [isRunning]: isRunning이 바뀔 때만 effect 재실행
 *
 * 3. 기록(Lap) 버튼
 *    - isRunning === true 일 때만 클릭 가능 (정지 중엔 disabled)
 *    - 클릭 시 현재 seconds 값을 laps 배열에 추가 (불변성 유지: [...prev, seconds])
 *    - 화면에 누적 목록으로 표시
 *
 * 4. 초기화(Reset) 버튼
 *    - isRunning === false 일 때만 클릭 가능 (실행 중엔 disabled)
 *    - seconds → 0, laps → [] 로 초기화
 *
 * 5. 표시 형식
 *    - seconds.toFixed(2) 로 소수점 둘째 자리까지 표시
 */

import { useEffect, useState } from "react";

export default function TimerTwo() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        if (isRunning) {
            // 0.01초(10ms) 간격으로 seconds를 0.01씩 증가
            const id = setInterval(() => setSeconds(prev => prev + 0.01), 10);
            return () => {
                clearInterval(id);
            }
        }
    }, [isRunning]);

    const handleLap = () => {
        setLaps(prev => [...prev, seconds]);
    };

    const handleReset = () => {
        setSeconds(0);
        setLaps([]);
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.bgCircle1} />
            <div style={styles.bgCircle2} />

            <div style={styles.card}>
                <p style={styles.label}>STOPWATCH</p>
                <div style={styles.display}>
                    <span style={styles.timeText}>{seconds.toFixed(2)}</span>
                    <span style={styles.unit}>초</span>
                </div>

                <div style={styles.btnRow}>
                    <button
                        style={{ ...styles.btn, ...styles.btnPrimary }}
                        onClick={() => setIsRunning(prev => !prev)}
                    >
                        {isRunning ? "⏸ 정지" : "▶ 시작"}
                    </button>

                    {/* 기록: 시간이 흐르는 중(isRunning=true)에만 활성화 */}
                    <button
                        style={{
                            ...styles.btn,
                            ...styles.btnLap,
                            ...(!isRunning ? styles.btnDisabled : {}),
                        }}
                        onClick={handleLap}
                        disabled={!isRunning}
                    >
                        🏁 기록
                    </button>

                    {/* 초기화: 정지 상태(isRunning=false)에서만 활성화 */}
                    <button
                        style={{
                            ...styles.btn,
                            ...styles.btnReset,
                            ...(isRunning ? styles.btnDisabled : {}),
                        }}
                        onClick={handleReset}
                        disabled={isRunning}
                    >
                        ↺ 초기화
                    </button>
                </div>

                {/* 랩 기록 */}
                {laps.length > 0 && (
                    <div style={styles.lapList}>
                        <p style={styles.lapTitle}>📋 기록</p>
                        <div style={styles.lapScroll}>
                            {laps.map((lap, i) => (
                                <div key={i} style={styles.lapItem}>
                                    <span style={styles.lapIndex}>#{i + 1}</span>
                                    <span style={styles.lapTime}>{lap.toFixed(2)}초</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d0d14",
        fontFamily: "'Courier New', monospace",
        position: "relative",
        overflow: "hidden",
    },
    bgCircle1: {
        position: "absolute",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, #1a1a3e 0%, transparent 70%)",
        top: -80,
        right: -80,
    },
    bgCircle2: {
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, #0e2a1f 0%, transparent 70%)",
        bottom: -60,
        left: -60,
    },
    card: {
        position: "relative",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 24,
        padding: "40px 44px",
        minWidth: 340,
        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        textAlign: "center",
    },
    label: {
        color: "rgba(255,255,255,0.3)",
        fontSize: 11,
        letterSpacing: 6,
        margin: "0 0 20px",
        textTransform: "uppercase",
    },
    display: {
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: "20px 28px",
        marginBottom: 28,
        display: "inline-flex",
        alignItems: "baseline",
        gap: 6,
    },
    timeText: {
        fontSize: 62,
        fontWeight: 700,
        color: "#e8f5e9",
        letterSpacing: -1,
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1,
    },
    unit: {
        fontSize: 18,
        color: "rgba(255,255,255,0.4)",
    },
    btnRow: {
        display: "flex",
        gap: 10,
        justifyContent: "center",
        flexWrap: "wrap",
    },
    btn: {
        border: "none",
        borderRadius: 10,
        padding: "12px 20px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        transition: "opacity 0.2s, transform 0.1s",
        letterSpacing: 0.5,
    },
    btnPrimary: {
        background: "linear-gradient(135deg, #00c853, #009688)",
        color: "#fff",
        minWidth: 110,
    },
    btnLap: {
        background: "linear-gradient(135deg, #1565c0, #0288d1)",
        color: "#fff",
        minWidth: 90,
    },
    btnReset: {
        background: "linear-gradient(135deg, #b71c1c, #c62828)",
        color: "#fff",
        minWidth: 90,
    },
    btnDisabled: {
        opacity: 0.3,
        cursor: "not-allowed",
    },
    lapList: {
        marginTop: 28,
        textAlign: "left",
    },
    lapTitle: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 12,
        letterSpacing: 3,
        marginBottom: 10,
        textTransform: "uppercase",
    },
    lapScroll: {
        maxHeight: 180,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },
    lapItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 8,
        padding: "8px 14px",
        border: "1px solid rgba(255,255,255,0.06)",
    },
    lapIndex: {
        color: "rgba(255,255,255,0.3)",
        fontSize: 12,
        letterSpacing: 1,
    },
    lapTime: {
        color: "#80cbc4",
        fontSize: 16,
        fontWeight: 700,
        fontVariantNumeric: "tabular-nums",
    },
};
