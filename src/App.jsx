import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MyComponent2, { Child, Child2, MyComponent } from './react_study/ex01_basic/ex01_component'
import UseStateEx from './react_study/ex02_useState/ex01_basic'
import TitleList from './react_study/ex02_useState/ex03_map'
import FlexEx from './react_study/ex02_useState/ex05_flex'
import ObjectEx from './react_study/ex02_useState/ex06_object'
import UseStateArr from './react_study/ex02_useState/ex04_arr'
import Filter from './react_study/ex02_useState/ex07_filter'
import AddRemove from './react_study/ex04_useRef/ex01_useRef'
import Timer from './react_study/ex03_useEffect/ex02_Timer'
import TimerTwo from './react_study/ex03_useEffect/Timer_박시열'
import ToDoList from './react_study/ex03_useEffect/ToDoList_박시열'
import TestContext from './react_study/ex05_useContext/ex01_noContext'
import LangComp from './react_study/ex05_useContext/ex03_language'
import MyApp from './react_study/ex05_useContext/ex05_useContext'
import ReducerEx from './react_study/ex06_useReducer/ex02_useReducer'
import InfoList from './react_study/ex06_useReducer/ex04_destructuring'
import BookList from './react_study/ex06_useReducer/ex04_destructuring'
import ReducerCounter from './react_study/ex06_useReducer/ex05_counter'
import ExpensiveCalc from './react_study/ex07_useMemo/ex01_expensiveCalc'
import UseCallbackEx from './react_study/ex08_useCallback/ex01_useCallback'

function App() {
  const [title, setTitle] = useState("기본 제목")
  return(
    <>
      {/* <h1>{title}</h1>
      <div>
        <button onClick={()=>{
          {title === '기본 제목' ? (
            setTitle("3/18 React 기초")
          ) : (
            setTitle("기본 제목")
          )}
        }}
          style={{fontSize:"20px", color:'blue'}}
        >
          제목 변경
        </button>
        <div>
          {title === '3/18 React 기초' && <p>제목이 바뀌었습니다.</p>}
          {title === '기본 제목' && <p>초기 설정으로 바뀌었습니다.</p>}
        </div>
      </div>

      <MyComponent/>
      <MyComponent2/>
      <Child name='호랑이' childStyle={{color:'skyblue'}}/>
      <Child2 name='스파이더맨' childStyle={{
        fontSize:"25px", 
        color:"red", 
        border:"2px solid"
      }}/>

      <UseStateEx/>  
      <TitleList/>
      <UseStateArr/>
      <FlexEx/>
      <ObjectEx/>
      <Filter/>
      <AddRemove/>
      <Timer/>
      <TimerTwo/>
      <ToDoList/>
      <TestContext/>
      <LangComp/>
      <MyApp/>
      <ReducerEx/>
      <BookList/>
      <ReducerCounter/> 
      <ExpensiveCalc/>*/}
      <UseCallbackEx/>
    </>
  )
}

export default App
