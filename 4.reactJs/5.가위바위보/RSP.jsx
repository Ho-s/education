const React=require('react');
const{ Component }=React;

//클래스의 경우 : cunstructor=> render=> ref=> componentDidMount
//=>(setState/props 바뀔 때=>shouldComponentUpdate(true)=>render=>componentDidUpdate)
//부모가 나를 없앨 때=>componentWillUnmount=>소멸

const rspCoords={
    바위:'0',
    가위:'-142px',
    보:'-284px'
}

const scroes={
    바위:1,
    가위:0,
    보:-1
}

const computerChoice=(imgCoord)=>{
    return Object.entries(rspCoords).find(function(v){
        return v[1]===imgCoord
    })[0]
}

class RSP extends Component{

    state={
        result:'',
        score:rspCoords.바위,
        imgCoord:'0'
    }

    interval;

    changeHand=()=>{
        const {imgCoord}=this.state //이 함수를 setInterval 바깥에 놓으면 클로저 문제가 발생한다.
        if(imgCoord===rspCoords.바위){
            this.setState({
                imgCoord:rspCoords.가위
            })
        }else if(imgCoord===rspCoords.가위){
            this.setState({
                imgCoord:rspCoords.보
            })
        }else if(imgCoord===rspCoords.보){
            this.setState({
                imgCoord:rspCoords.바위
            })
        }
    }
    componentDidMount(){//처음 렌더가 실행될때 실행되는 함수 비동기 요청을 여기에 많이 한다.
        this.interval=setInterval(this.changeHand,100)
    }

    componentDidUpdate(){ //리렌더링 할 때마다 리렌더링 후 실행

    }

    componentWillUnmount(){//컴포넌트가 제거되기 직전에componentDidMount제거를 실행 비동기 요청 정리를 많이 한다.
        clearInterval(this.interval)
    }

    onClickBtn=(choice)=> ()=>{ //onClick={()=>this.onClickBtn('가위')}를  onClick={this.onClickBtn('바위')} 로  변형하기 위한 모습 모습
        const {imgCoord}=this.state
        clearInterval(this.interval)
        const myScore=scroes[choice]
        const cpuScore=scroes[computerChoice(imgCoord)]
        const diff = myScore - cpuScore
        if(diff===0){
            this.setState({
                result:'비겼습니다.'
            })
        }else if([-1,2].includes(diff)){
            this.setState((prevState)=>{
                return{
                    result:'졌습니다.',
                    score:prevState.score-1
                }
            })
        }else{
            this.setState((prevState)=>{
                return{
                    result:'이겼습니다.',
                    score:prevState.score+1
                }
            })
        }
        this.interval=setInterval(this.changeHand,100)  
    }

    render(){
        const {result, score, imgCoord}=this.state;
        return(
            <>
                <div id='computer' style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id='rock' className='btn' onClick={this.onClickBtn('바위')}>바위</button>
                    <button id='scissor' className='btn' onClick={this.onClickBtn('가위')}>가위</button>
                    <button id='paper' className='btn' onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}
module.exports=RSP