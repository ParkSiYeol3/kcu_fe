import { useReducer } from "react";

function myReducer(state, {type, payload}) {
  switch(type) {
    case "SET_NAME":
      return {...state, name:payload};
    case "SET_AGE":
      return {...state, age:payload};
    case "RESET":
      return {name:"", age:0};
    default:
      return state;
  }
}

export default function ReducerEx() {
  const [{name, age}, dispatch] = useReducer(myReducer, {name:"", age:0});
  return (
    <div>
      <h2>User Info</h2>
      <p>이름 : <strong>{name}</strong></p>
      <p>나이 : <strong>{age}</strong></p>
      <input
        type="text"
        placeholder="이름 입력"
        value={name}
        onChange={(e)=>{
          dispatch({type:"SET_NAME", payload: e.target.value})
        }}
      />
      <input 
        type="number" 
        placeholder="나이 입력"
        value={age}
        onChange={(e)=>{
          dispatch({type:"SET_AGE", payload:e.target.value})
        }}
      />
      <button onClick={()=>dispatch({type:"RESET"})}>초기화</button>
    </div>
  )
}