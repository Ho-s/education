function init(){
    const result=document.querySelector("#logs")
    const input=document.querySelector("#input")
    const logs=document.querySelector("#logs")

    let answer=String(Math.floor(Math.random()*900)+100)
    while(answer[0]===answer[1]|answer[0]===answer[2]|answer[1]===answer[2]){
        answer=String(Math.floor(Math.random()*900)+100)
    }

    let count=0
    document.querySelector("button").addEventListener("click",()=>{
        let strike=0;
        let ball=0;
        if(input.value&&input.value.length===3){
            if(answer===input.value){
                logs.appendChild(document.createTextNode("HR"))
                logs.appendChild(document.createElement('br'))//줄바꿈//
            } else{
                let strike=0;
                let ball=0
                for(const [aIndex,number] of answer.split('').entries()){
                    for(const [Iindex,value] of input.value.split('').entries()){
                        if(Number(number)===Number(value)){
                            if(aIndex===Number(Iindex)){
                                strike+=1
                            }else{
                                ball+=1
                            }
                        }
                    }
                }
                logs.appendChild(document.createTextNode(`${input.value} ${strike}Strike ${ball}Ball `))
                logs.appendChild(document.createElement('br'))
                if(count===11){
                    logs.appendChild(document.createTextNode(`Game is over \n answer=${answer} `))
                    logs.appendChild(document.createElement('br'))
                }else{
                    count+=1
                }
            }
        }
    })
}

init()

// '' , 0 , NaN, false, undefined, null 얘네는 if문 안에 들어가면 false고 나머지는 true//
// ex) '3046' truthy value , 0 falsy value//