function init(){
    document.querySelector('#computer').style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`

    let coord='0'
    const rspCoord = {
        rock: '0',
        scissors: '-142px',
        paper: '-284px',
    }//객체 사용법

    const intervalMaker=()=>{
        return setInterval(() => {
            if(coord===rspCoord.rock){
                coord=rspCoord.scissors
            }else if(coord===rspCoord.scissors){
                coord=rspCoord.paper
            }else if(coord===rspCoord.paper){
                coord=rspCoord.rock
            }
            document.querySelector('#computer').style.background=`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${coord} 0`
        }, 50);
    }//함수는 기본적으로 undefined 상태이기 때문에 함수를 정의할때 맨 앞에 자기 자신을 리턴으로 받는다.

    let intervalId=intervalMaker();

    const scoreTag=document.querySelector("#score")
    let accScore=Number(scoreTag.textContent)
    let score=0

    document.querySelector("#rock").addEventListener("click",()=>{
        clearInterval(intervalId)
        if(coord===rspCoord.scissors){
            score+=1
        }else if(coord===rspCoord.paper){
            score-=1
        }else if(coord===rspCoord.rock){
        }
        accScore=score
        scoreTag.textContent=accScore
        setTimeout(() => {
            intervalId=intervalMaker()
        }, 1000); 
    })

    document.querySelector("#scissors").addEventListener("click",()=>{
        clearInterval(intervalId)
        if(coord===rspCoord.paper){
            score+=1
        }else if(coord===rspCoord.rock){
            score-=1
        }else if(coord===rspCoord.scissors){
        }
        accScore=score
        scoreTag.textContent=accScore
        setTimeout(() => {
            intervalId=intervalMaker()
        }, 1000); 
    })

    document.querySelector("#paper").addEventListener("click",()=>{
        clearInterval(intervalId)
        if(coord===rspCoord.rock){
            score+=1
        }else if(coord===rspCoord.scissors){
            score-=1
        }else if(coord===rspCoord.paper){
        }
        accScore=score
        scoreTag.textContent=accScore
        setTimeout(() => {
            intervalId=intervalMaker()
        }, 1000); 
    })
}

init()