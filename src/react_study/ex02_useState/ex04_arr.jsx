import { useState } from "react"

export default function UseStateArr() {
    const titleList = ['괴수 8호', '눈물의 여왕', '어바웃타임']
    const [thumbsup, setThumbsup] = useState([0, 0, 0])

    function addThumbsup(idx) {
    setThumbsup(thumbsup.map((cnt,i)=> {
      if (i === idx) {
        return cnt + 1
      }
      return cnt
    }))
  }

  return (
    <div style={{
        display:'flex', 
        flexDirection:'row', 
        padding:'20px', 
        justifyContent:'center'
        }}>
      {
        titleList.map((title,idx)=>(
          <div style={{
            height:100, 
            width:100,
            padding:10, 
            margin:10, 
            border:"1px solid"
          }}>
            <h3>{title}</h3>
            <button onClick={()=>addThumbsup(idx)}>  👍🏻 {thumbsup[idx]} </button>
          </div>
        ))
      }

    </div>
  )
}