const React=require('react');
const{ useState,useRef }=React;

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

const RSP =()=>{

    const [result,setResult]=useState('')
    const [score,setScore]=useState(rspCoords.바위)
    const [imgCoord,setImgCoord]=useState('0')
    const interval=useRef();

    useEffect(()=>{ //componentDidMount, componentDidUpdate 역할 (1대1대응은 아님)
        interval.current=setInterval(changeHand,100)
        return()=>{//componentWillUnmount 역할
            clearInterval(interval.current)
        }    
    },[imgCoord])//바꾸고 싶은 state, 이 배열이 바뀔 때 마다 useEffect가 계속 실행 된다. componentdidupdate역할

    const changeHand=()=>{
        if(imgCoord===rspCoords.바위){
            setImgCoord:rspCoords.가위
        }else if(imgCoord===rspCoords.가위){
            setImgCoord:rspCoords.보
        }else if(imgCoord===rspCoords.보){
            setImgCoord:rspCoords.바위
        }
    }

    const onClickBtn=(choice)=> ()=>{ 
        clearInterval(interval.current)
        const myScore=scroes[choice]
        const cpuScore=scroes[computerChoice(imgCoord)]
        const diff = myScore - cpuScore
        if(diff===0){
            setResult:'비겼습니다.'
        }else if([-1,2].includes(diff)){
            setResult:'졌습니다.'
            setScore((prevScore)=>prevScore-1)        
        }else{
            setResult:'이겼습니다.'
            setScore((prevScore)=>prevScore+1)      
        }
        interval.current=setInterval(changeHand,100)  
    }

    return(
        <>
            <div id='computer' style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id='rock' className='btn' onClick={onClickBtn('바위')}>바위</button>
                <button id='scissor' className='btn' onClick={onClickBtn('가위')}>가위</button>
                <button id='paper' className='btn' onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    )
    
}
module.exports=RSP