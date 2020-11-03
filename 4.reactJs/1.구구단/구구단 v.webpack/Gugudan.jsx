const React=require('react');
const {useState,useRef}=React; //구조분해 문법으로 React.useState=>useState만 쓸 수 있도록

const Gugudan = () => { 
    const [first,setFirst]=useState(Math.ceil(Math.random()*9))
    const [second,setSecond]=useState(Math.ceil(Math.random()*9))
    const [value,setValue]=useState('')
    const [result,setResult]=useState('')
    const inputRef=useRef(null)

    const onSubmit =(e)=>{
        e.preventDefault();
        inputRef.current.focus() 
        if(parseInt(value)===first*second){
                setResult(`${value}정답`)
                setFirst(Math.ceil(Math.random()*9))
                setSecond(Math.ceil(Math.random()*9))
                setValue('')
        }else{
            setResult(`${value}오답`)
            setValue('')
        }
    }

    const onChange=(e)=>{
        setValue(e.target.value)
    }
        // id는 그대로 쓸 수 있으나 class는 className, for은 htmlFor로 써야한다.
        //React.Fragment 생략 가능
    return (

        <> 
            <div>{first}X{second}=?</div> 
            <form onSubmit={onSubmit}>
                <input ref={inputRef} type="Number" value={value} onChange={onChange}></input>
                <button type="submit">
                입력
                </button>
            </form>
            <div>{result}</div>
        </>
    )
}
module.exports=Gugudan