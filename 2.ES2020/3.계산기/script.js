function init(){
    const input = document.querySelector("#input")
    let result = document.querySelector("#result")
    let temp; //나중에 변할 값은 let으로 한다.//
    let operator;

    document.querySelector("#plus").addEventListener("click",()=>{
        if(input.value){
            temp= input.value
            operator='+'
            input.value = ""
        } else{
            alert("첫 번째 값 입력")
        }
    })

    document.querySelector("#minus").addEventListener("click",()=>{
        if(input.value){
            temp= input.value
            operator='-'
            input.value = ""
        } else{
            alert("첫 번째 값 입력")
        }
    })

    document.querySelector("#divide").addEventListener("click",()=>{
        if(input.value){
            temp= input.value
            operator='/'
            input.value = ""
        } else{
            alert("첫 번째 값 입력")
        }
    })
 
    document.querySelector("#multiply").addEventListener("click",()=>{
        if(input.value){
            temp= input.value
            operator='x'
            input.value = ""
        } else{
            alert("첫 번째 값 입력")
        }
    })

    document.querySelector("#equal").addEventListener("click",()=>{
        console.log(temp,operator,input.value)
        if(temp){
            if(operator){
                if(input.value){
                    if(operator==="+"){
                        result.value = Number(temp) + Number(input.value) //형변환//
                        //type of sth 하면 타입 알아볼 수 있다.//
                    } else if(operator==="-"){
                        result.value = temp - input.value   
                    } else if(operator==="/"){
                        result.value = temp / input.value
                    } else if(operator==="x"){
                        result.value = temp * input.value
                    }
                    temp=result.value //아래쪽에 중복되는 것이 있다면 아래쪽으로 뺴줘//
                }else{
                    alert("두 번째 값 입력")
                }
            } else{
                alert("연산자 입력")
            }
        }else{
            alert("첫 번째 값 입력")
        }
    })

    document.querySelector("#reset").addEventListener("click",()=>{
        temp=null;
        operator=null; //초기화 null or undefined//
        result.value=""
        input.value = ""
    })
}

init();