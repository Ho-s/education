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

    const com=(win,lose,draw)=>{
        return ()=>{
            clearInterval(intervalId)
            if(coord===rspCoord.win){
                score+=1
            }else if(coord===rspCoord.lose){
                score-=1
            }else if(coord===rspCoord.draw){
            }
            accScore=score
            scoreTag.textContent=accScore
            setTimeout(() => {
                intervalId=intervalMaker()
            }, 1000);
        }
    }

    document.querySelector("#rock").addEventListener("click",com("scissors","paper","rock"))

    document.querySelector("#scissors").addEventListener("click",com("paper","rock","scissors"))

    document.querySelector("#paper").addEventListener("click",com("rock","scissors","paper"))
}

init()