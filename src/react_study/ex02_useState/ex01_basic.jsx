import { useState } from "react";

export default function UseStateEx(){
    const [text, setText] = useState('입력하세요');
    const [color, setColor] = useState('');
    return(
        <>
            <h1>useState Basic</h1>
            <div>
                <button
                    onClick={()=> setColor('orange')}
                    style={{fontSize:'20px', color:'orange', fontWeight:'bold'}}
                >
                    주황색
                </button>
                <button
                    onClick={()=> setColor('green')}
                    style={{fontSize:'20px', color:'green', fontWeight:'bold'}}
                >
                    초록색
                </button>
            </div>
            
            <h2 style={{color}}>{text}</h2>
            <div>
                <input type="text" onChange={(e)=>{setText(e.target.value);}} />
            </div>
        </>
    )
}