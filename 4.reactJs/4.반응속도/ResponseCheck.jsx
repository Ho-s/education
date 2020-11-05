const { timeout } = require('async');
const React=require('react');
const{ PureComponent }=React;

// const ResponseCheck = () =>{
    
//     const timeOut=useRef(null)
//     const startTime=useRef()
//     const endTime=useRef() //useref는 화면은 바뀌지만 렌더링이 되지 않는 것을 한다.

//     timeOut.current=setTimeout()
// } 훅스로 바꿀 때 timeout이런거는 useref를 사용한다.

class ResponseCheck extends PureComponent{
    state={
        state:'waiting',
        message:'클릭해서 시작하세요',
        result:[]
    }

    timeOut;
    startTime;
    endTime
    
    onClickScreen = () =>{
        const {state, message, result} =this.state
        if(state==='waiting'){
            this.setState({
                state:'ready',
                message:'초록색이 되면 클릭하세요.'
            })
        this.timeOut = setTimeout(()=>{
                this.setState({
                    state:'now',
                    message:'지금 클릭'
                })
                this.startTime= new Date()
            }, Math.floor(Math.random()*2000)+1000) //1초~3초 랜덤
        }else if(state==='ready'){
            clearTimeout(this.timeOut)
            this.setState({
                state:'waiting',
                message:'너무 성급하시군요! 초록색이 된 후에 클릭하세요'
            })
        }else if(state==='now'){
            this.endTime=new Date()
            this.setState((prevState)=>{
                return {
                    state:'waiting',
                    message:'클릭해서 시작하세요',
                    result:[...prevState.result, this.endTime-this.startTime]
                }
            })
            console.log(this.endTime-this.startTime)
        }
    }

    onReset=()=>{
        clearTimeout(this.timeOut)
        this.setState({
            state:'waiting',
            message:'클릭해서 시작하세요',
            result:[]
        })
    }

    renderAverage = ()=>{
        const {result}=this.state
        return result.length===0 
        ? null 
        :<>
            <div>평균시간 :{result.reduce((a,c)=>a+c)/result.length}ms</div>
            <button onClick={this.onReset}>리셋</button>
        </>
        /* {this.state.result.length!==0  &&
        <div>평균시간 :{this.state. result.reduce((a,c)=>a+c)/this.state.result.length}ms</div>} */
    }

    render() {
        const {state, message}=this.state
        return (
            <>
                <div id='screen' className={state} onClick={this.onClickScreen}>{message}</div>
                {this.renderAverage()}
            </>
        )
    }
}
module.exports=ResponseCheck