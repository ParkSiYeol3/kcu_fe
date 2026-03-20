import { useState } from "react";

export default function ObjectEx() {
    const [form, setForm] = useState({
        name:"",
        text:"",

        rating:""
    })

    const changeHandler = (e) => {
        // const newForm = {...form, [e.target.name]: e.target.value}
        // setForm(newForm)
        setForm(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    return (
        <>
            <h2>
                제목:
                <input type="text" name="name" value={form.name} onChange={changeHandler}
                    style={{
                        margin: '10px',
                        width: '80%',
                        height:'30px',
                        fontSize:'20px'
                    }}/>
            </h2>

            <h2>
                내용:
                <input type="text" name="text" value={form.text} onChange={changeHandler}
                    style={{
                        margin: '10px',
                        width: '80%',
                        height:'30px',
                        fontSize:'20px'
                    }}/>
            </h2>
            
            <select name="rating" value={form.rating} onChange={changeHandler} 
                style={{
                    width:'10%', 
                    margin:'10px auto'
                }}>
                    <option value="">평점 선택</option>
                    <option value="1">1점</option>
                    <option value="2">2점</option>
                    <option value="3">3점</option>
                    <option value="4">4점</option>
                    <option value="5">5점</option>
            </select>
      
      
            <h3>평점: {form.rating ? `${form.rating}점` : "(선택 안 함)"}</h3>        
            <h1>{form.name}</h1>
            <h2>{form.text}</h2>
        </>
    )
}