/*
 * [전체 구조]
 * 단일 React 함수형 컴포넌트(App)로 구성되며,
 * useState / useEffect / useRef 훅을 사용하여 상태를 관리합니다.
 *
 * [상태(State) 설명]
 * - todos        : 할 일 배열. 각 항목은 { id, text, done } 형태
 * - inputVal     : 입력창(input)의 현재 텍스트 값
 * - isExpanded   : 확대/축소 토글 상태 (true = 확대됨, false = 기본)
 *
 * [localStorage 연동]
 * - 최초 렌더(mount) 시 useEffect로 localStorage에서 todos를 불러와 초기값으로 설정
 * - todos 상태가 변경될 때마다 useEffect가 실행되어 localStorage에 자동 저장
 * - isExpanded는 localStorage로 관리하지 않으므로 항상 false(기본/축소)로 시작
 *
 * [할 일 추가]
 * - addTodo(): inputVal의 length가 5 미만이면 alert 후 중단
 * - 조건 통과 시 새 todo 객체를 todos 배열에 추가하고 input 초기화
 * - 새 항목의 done은 false(진행 중)으로 초기화
 *
 * [상태 전환]
 * - toggleDone(id): 해당 id의 todo를 찾아 done 값을 반전(true↔false)
 * - done이 false이면 "진행 중" 컬럼, true이면 "완료" 컬럼에 렌더링
 *
 * [삭제]
 * - deleteTodo(id): 해당 id를 제외한 새 배열로 todos 교체
 *
 * [확대/축소 토글]
 * - isExpanded가 false일 때: 제목 25px, 할일 글자 18px (기본)
 * - isExpanded가 true일 때 : 제목 30px, 할일 글자 23px (5px 추가)
 * - 버튼 텍스트: false → "확대" / true → "축소"
 *
 * [렌더링]
 * - todos 배열을 filter로 나눠 진행 중 / 완료 두 컬럼에 각각 출력
 */

import { useState, useEffect } from "react";

const STORAGE_KEY = "todolist_items";

export default function App() {
  // ── 상태 정의 ──────────────────────────────────────────────
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [inputVal, setInputVal] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // 최초 렌더: 축소(기본) 상태

  // ── localStorage 자동 저장 ────────────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // ── 글자 크기 계산 ────────────────────────────────────────
  const titleSize = isExpanded ? 30 : 25;   // 확대 시 +5px
  const itemSize  = isExpanded ? 23 : 18;   // 확대 시 +5px

  // ── 할 일 추가 ────────────────────────────────────────────
  const addTodo = () => {
    if (inputVal.length < 5) {
      alert("5글자 이상 입력해야 합니다.");
      return;
    }
    const newTodo = { id: Date.now(), text: inputVal, done: false };
    setTodos(prev => [...prev, newTodo]);
    setInputVal("");
  };

  // ── Enter 키 지원 ─────────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  // ── 완료 ↔ 진행중 전환 ────────────────────────────────────
  const toggleDone = (id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  // ── 삭제 ──────────────────────────────────────────────────
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // ── 분류 ──────────────────────────────────────────────────
  const inProgress = todos.filter(t => !t.done);
  const completed  = todos.filter(t => t.done);

  // ── 할 일 카드 렌더 ───────────────────────────────────────
  const TodoCard = ({ todo }) => (
    <div style={styles.card}>
      <span style={{ ...styles.cardText, fontSize: itemSize }}>
        {todo.text}
      </span>
      <div style={styles.cardActions}>
        <button
          style={{
            ...styles.btn,
            ...(todo.done ? styles.btnInProgress : styles.btnDone),
          }}
          onClick={() => toggleDone(todo.id)}
        >
          {todo.done ? "진행 중으로" : "완료 처리"}
        </button>
        <button
          style={{ ...styles.btn, ...styles.btnDelete }}
          onClick={() => deleteTodo(todo.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.root}>

      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.container}>
        
        <h1 style={{ ...styles.title, fontSize: titleSize }}>
          📝 To Do List
        </h1>

        {/* 입력 영역 */}
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            type="text"
            placeholder="할 일을 입력하세요 (5글자 이상)"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button style={{ ...styles.btn, ...styles.btnAdd }} onClick={addTodo}>
            추가
          </button>
          <button
            style={{ ...styles.btn, ...styles.btnToggle }}
            onClick={() => setIsExpanded(prev => !prev)}
          >
            {isExpanded ? "축소" : "확대"}
          </button>
        </div>

        <div style={styles.columns}>
          {/* 진행 중 컬럼 */}
          <div style={styles.column}>
            <div style={{ ...styles.columnHeader, ...styles.headerInProgress }}>
              🔥 진행 중
              <span style={styles.badge}>{inProgress.length}</span>
            </div>
            <div style={styles.columnBody}>
              {inProgress.length === 0 ? (
                <p style={styles.empty}>할 일이 없습니다!</p>
              ) : (
                inProgress.map(t => <TodoCard key={t.id} todo={t} />)
              )}
            </div>
          </div>

          {/* 완료 컬럼 */}
          <div style={styles.column}>
            <div style={{ ...styles.columnHeader, ...styles.headerDone }}>
              ✅ 완료
              <span style={styles.badge}>{completed.length}</span>
            </div>
            <div style={styles.columnBody}>
              {completed.length === 0 ? (
                <p style={styles.empty}>완료된 항목이 없습니다.</p>
              ) : (
                completed.map(t => <TodoCard key={t.id} todo={t} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    fontFamily: "'Noto Sans KR', 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "40px 20px",
    boxSizing: "border-box",
  },
  bgCircle1: {
    position: "fixed",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
    top: -100,
    right: -100,
    pointerEvents: "none",
  },
  bgCircle2: {
    position: "fixed",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
    bottom: -80,
    left: -80,
    pointerEvents: "none",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  title: {
    color: "#e2e8f0",
    fontWeight: 800,
    letterSpacing: "-0.5px",
    marginBottom: 24,
    textShadow: "0 2px 20px rgba(99,102,241,0.5)",
    transition: "font-size 0.3s ease",
  },
  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 36,
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: 200,
    padding: "12px 18px",
    borderRadius: 12,
    border: "1.5px solid rgba(99,102,241,0.7)",
    background: "rgba(255,255,255,0.13)",
    color: "#e2e8f0",
    fontSize: 15,
    outline: "none",
    backdropFilter: "blur(8px)",
    transition: "border 0.2s",
  },
  btn: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "none",
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.18s ease",
    whiteSpace: "nowrap",
  },
  btnAdd: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    boxShadow: "0 4px 14px rgba(99,102,241,0.45)",
  },
  btnToggle: {
    background: "rgba(255,255,255,0.08)",
    color: "#c4b5fd",
    border: "1.5px solid rgba(196,181,253,0.3)",
  },
  btnDone: {
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    fontSize: 13,
    padding: "7px 13px",
    boxShadow: "0 2px 8px rgba(16,185,129,0.4)",
  },
  btnInProgress: {
    background: "linear-gradient(135deg, #f59e0b, #d97706)",
    color: "#fff",
    fontSize: 13,
    padding: "7px 13px",
    boxShadow: "0 2px 8px rgba(245,158,11,0.4)",
  },
  btnDelete: {
    background: "rgba(239,68,68,0.15)",
    color: "#f87171",
    border: "1px solid rgba(239,68,68,0.3)",
    fontSize: 13,
    padding: "7px 13px",
  },
  columns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
  },
  column: {
    borderRadius: 16,
    overflow: "hidden",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  columnHeader: {
    padding: "14px 20px",
    fontWeight: 800,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  headerInProgress: {
    background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))",
    color: "#a5b4fc",
    borderBottom: "1px solid rgba(99,102,241,0.2)",
  },
  headerDone: {
    background: "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.15))",
    color: "#6ee7b7",
    borderBottom: "1px solid rgba(16,185,129,0.2)",
  },
  badge: {
    background: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: "2px 9px",
    fontSize: 13,
    fontWeight: 700,
    marginLeft: "auto",
  },
  columnBody: {
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minHeight: 80,
  },
  card: {
    background: "rgba(255,255,255,0.06)",
    borderRadius: 10,
    padding: "12px 14px",
    border: "1px solid rgba(255,255,255,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  cardText: {
    color: "#e2e8f0",
    lineHeight: 1.5,
    wordBreak: "break-all",
    transition: "font-size 0.3s ease",
  },
  cardActions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  empty: {
    color: "rgba(255,255,255,0.25)",
    fontSize: 14,
    textAlign: "center",
    padding: "20px 0",
    fontStyle: "italic",
  },
};
