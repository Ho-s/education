const React=require('react');
// const{ Component }=React;
const {useState,useRef}=React

// class WordRelay extends Component{
//     constructor(props){
//         super(props)
//         this.state={
//             word:'주병호',
//             value:'',
//             result:''
//         }
//     }

//     onSubmit=(e)=>{
//         e.preventDefault();
//         this.hello.focus();
//         if(this.state.word[this.state.word.length-1]!==this.state.value[0]){
//             this.setState((prevState)=>{
//                 return{
//                     value:'',
//                     result:`틀렸습니다. 당신이 입력한 값=${prevState.value}`
//                 }
//             })
//         }else{
//             this.setState((prevState)=>{
//                 return{
//                     word:`${prevState.value}`,
//                     value:'',
//                     result:'정답입니다. 계속 이어가십시오.'
//                 }
//             })
//         }

//     }

//     onChange=(e)=>{
//         this.setState({value:e.target.value})
//     }

//     hello;
//     onHello=(c)=>{
//         this.hello=c;
//     }

//     render(){
//         return(
//             <>
//                 <div>{this.state.word}</div>
//                 <form onSubmit={this.onSubmit}>
//                     <input ref={this.onHello} type="text" value={this.state.value} onChange={this.onChange} maxLength="5"></input>
//                     <button type="submit">입력</button>
//                 </form>
//                 <div>{this.state.result}</div>
//             </>
//         )
//     }
// }
const WordRelay=()=>{
    const [word,setWord]=useState('바보')
    const [value,setValue]=useState('')
    const [result,setResult]=useState('')
    const inputRef=useRef(null)
    

    const onSubmit=(e)=>{
        e.preventDefault();
        inputRef.current.focus()
        if(word[word.length-1]!==value[0]){
            setValue(''),
            setResult(`틀렸습니다. 당신이 입력한 값=${value}`)
        }else{
            setWord(`${value}`),
            setValue(''),
            setResult('정답입니다. 계속 이어가십시오.')
            
        }

    }

    const onChange=(e)=>{
        setValue(e.target.value)
    }

    return(
        <>
            <div>{word}</div>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} type="text" value={value} onChange={onChange} maxLength="5"></input>
                <button type="submit">입력</button>
            </form>
            <div>{result}</div>
        </>
    )
}
module.exports=WordRelay