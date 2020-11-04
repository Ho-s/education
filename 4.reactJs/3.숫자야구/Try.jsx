// const React=require('react');
// const{ PureComponent }=React;

// class Try extends PureComponent{
//     render(){
//         const {tryInfo}=this.props
//         return(
//             <li>
//                 <div>{tryInfo.try}</div>
//                 <div>{tryInfo.result}</div>
//             </li>
//         )
//     }
// }

const React=require('react');
const {memo}=React
const Try=memo(({tryInfo})=>{           //const Try=(props)=>{~~<div>{props.tryInfo.try}</div>~~~} 구조분해를 props칸에 넣을 수 있다.
    //tryInfo.try="blabla" props의 객체는 자식에서 못바꾸고 부모에게서만 바꿀 수 있다. 이 코드는 안되는 코드
    // const[result,setResult]=React.useState(tryInfo.result)  //그래서 이것처럼 state를 불러와서 바꿔
    // const onClick=()=>{
    //     setResult('1')
    // }
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
})

module.exports=Try