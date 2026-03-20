import { useState } from "react";
import "./ex05_flex.css"

export default function FlexEx() {
  const [radius, setRadius] = useState(0)
  return (
    <>
      <div className="box" style={{borderRadius: `${radius}px` }}>
        <h2>기묘한 이야기</h2>
        <h2>이태원 클라쓰</h2>
        <h2>센과 치히로의 행방불명</h2>
      </div>
      <div className="buttonBox">
        <button onClick={()=>setRadius(radius+1)}>둥글게</button>
        <button onClick={()=>setRadius(0)}>초기화</button>
      </div>
    </>
  )
}