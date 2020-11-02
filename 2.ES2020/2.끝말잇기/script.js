const dic=[];

function init(){
    document.querySelector("#button").addEventListener("click",()=>{
        const word= document.querySelector("#firstWord").textContent;
        const input= document.querySelector("#input").value; //input값만 발류 나머지 텍컨//
        const a = word[word.length-1] //.length는 앞의 것의 길이를 알려줘//
        const b = input[0]; //첫글자 가져오는 것//
        if(dic.includes(input)){
            document.querySelector("#error").textContent = "이미 단어장에 있는 단어입니다."
            document.querySelector("#input").focus()
        }else{
            if(a===b){
                document.querySelector("#firstWord").textContent=input
                const c = document.querySelector("#error").textContent
                document.querySelector("#input").value='';
                document.querySelector("#input").focus()//인풋창 다시 깜빡거리게 하는거//
                document.querySelector("#error").textContent=""
                dic.push(input)
            }else{
                document.querySelector("#error").textContent = "땡입니다."
                document.querySelector("#input").focus()
            }
        }
    })
}

init();