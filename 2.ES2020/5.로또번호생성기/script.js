function init(){
    const candidate=Array(45).fill().map((v,i)=>{return i+1})
    //map(v는 어떤 값이고, i는 어떤 자리의 수)=>뒤에는 중괄호에 return이 바로나오는 경우
    //return과 중괄호를 같이 뺄 수 있다. map((v,i)=>i)처럼)

    let shuffle=[]
    for(n=0;n<=44;n++){
        const index=Math.floor((Math.random())*(45-n))
        shuffle.push(candidate[index])
        candidate.splice(index,1)
        //랜덤하게 섞고 나서 앞에서부터 뽑을 거야 (피셔방식)//
    }
    const winBalls=shuffle.slice(0,6).sort((p,c) => {
        return p-c//앞에것과 뒤에것 두 개씩 비교하는 것인데, 그 수가 음수면 
        //자리를 바꾸지 않고 양수면 두 개의 자리를 바꿔 결국에는 제일 작은 수가
        //맨 앞으로 오게 된다. 오름차순.
    })//처음부터 6번째까지 가져오는거//
    const bonusball=shuffle[6]//보너스는 7번째거
    
    function colorize(number, tag){
        if(number<=10){
            tag.style.backgroundColor='red'
            tag.style.color="white"
        }else if(number<=20){
            tag.style.backgroundColor='orange'
        }else if(number<=30){
            tag.style.backgroundColor='yellow'
        }else if(number<=40){
            tag.style.backgroundColor='blue'
            tag.style.color="white"
        }else{
            tag.style.backgroundColor='green'
            tag.style.color="white"
        }
    } //function 활용//

    const result=document.querySelector("#result")
    for(let i=0; i<6; i++){
        const balls=document.createElement("div")
        balls.className='ball'
        colorize(winBalls[i],balls)
        balls.textContent = (winBalls[i])
        result.appendChild(balls)
    }

    const bonus=document.querySelector("#bonus")
    const Bball=document.createElement("div")
    Bball.className='ball'
    colorize(bonusball,Bball)
    Bball.textContent = (bonusball)
    bonus.appendChild(Bball)
}
init()